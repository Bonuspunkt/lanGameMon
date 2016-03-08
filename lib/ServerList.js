'use strict';
const dgram = require('dgram');
const EventEmitter = require('events');

const q3a = require('./protocols/q3a');
const qw = require('./protocols/qw');
const teeworlds = require('./protocols/teeworlds');
const trackmania = require('./protocols/trackmania');
const ut2004 = require('./protocols/ut2004');
const valve = require('./protocols/valve');


class ServerList extends EventEmitter {

    constructor(config) {
        super();

        config = config || {};
        this._socket = config.socket || dgram.createSocket('udp4');
        this._socket.bind(() => {
            this._socket.setBroadcast(true);
            this._ready = true;

            this._runUpdate();
        });
        this._socket.on('message', this._handleMessage.bind(this));

        this._updateInterval = config.updateInterval || 15e3;
        this._protocols = config.protocols || [
            qw, q3a, teeworlds, trackmania, ut2004, valve
        ];

        this._ready = false;
        this._interval = 0;
    }

    _handleMessage(data, host) {
        this._protocols
            .map(protocol => protocol.handle(data, host))
            .filter(result => result)
            .forEach(result => {
                if (result instanceof Promise) {
                    return result.then(r => this.emit('update', r));
                }
                this.emit('update', result);
            });
    }

    start() {
        this._runUpdate();
        this._interval = setInterval(() => this._runUpdate(), this._updateInterval);

        return this;
    }

    _runUpdate() {
        if (!this._ready || !this._interval) { return; }

        this._protocols.forEach(protocol => {
            protocol.search(this._socket);
        });
    }

    stop() {
        clearInterval(this._interval);

        return this;
    }

}

module.exports = ServerList;
