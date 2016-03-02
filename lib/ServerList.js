"use strict";
const dgram = require('dgram');
const EventEmitter = require('events');

const getBroadcastIps = require('./getBroadcastIps');

const q3a = require('./protocols/q3a');
const qw = require('./protocols/qw');
const teeworlds = require('./protocols/teeworlds');
const trackmania = require('./protocols/trackmania');


class ServerList extends EventEmitter {

    constructor(config) {
        super();

        config = config || {};
        this._socket = config.socket || dgram.createSocket('udp4');
        this._socket.on('message', this._handleMessage.bind(this));
        this._broadcastAddress = config.broadcastAddress || getBroadcastIps();
        this._updateInterval = config._updateInterval || 15e3;
        this._protocols = config.protocols || [qw, q3a, teeworlds, trackmania];

        this._interval = 0;
    }

    _handleMessage(data, host) {
        this._protocols
            .map(protocol => protocol.handle(data, host))
            .filter(result => result)
            .forEach(result => this.emit('update', result));
    }

    start() {
        this._runUpdate();
        this._interval = setInterval(() => this._runUpdate(), this._updateInterval);

        return this;
    }

    _runUpdate() {
        this._protocols.forEach(protocol => {
            protocol.search(this._socket, this._broadcastAddress);
        });
    }

    stop() {
        clearInterval(this._interval);

        return this;
    }

}

module.exports = ServerList;