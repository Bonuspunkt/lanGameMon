"use strict";

// NOTE: getStatus would also return player names&scores
const getInfo = new Buffer([0xFF, 0xFF, 0xFF, 0xFF, 0x67, 0x65, 0x74, 0x69, 0x6E, 0x66, 0x6F, 0x00]);
const infoResponse = new Buffer([0xff, 0xff, 0xff, 0xff, 0x69, 0x6e, 0x66, 0x6f, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65]);

const ports = [27960, 27961, 27962, 27963];

module.exports = {
    search(socket) {
        ports.forEach(
            port => socket.send(getInfo, 0, getInfo.length, port, '255.255.255.255')
        );
    },

    handle(buffer, host) {

        for (let i = 0; i < infoResponse.length; i++) {
            if (buffer[i] !== infoResponse[i]) { return false; }
        }

        let responseString = buffer.toString('utf-8', infoResponse.length);
        let responseSplit = responseString.split(/\\/g);

        let result = {
        };
        for (let i = 1; i < responseSplit.length; i += 2) {
            result[responseSplit[i]] = responseSplit[i+1];
        }
        return {
            game: 'q3a',
            steamAppId: 2200,
            address: host.address,
            port: host.port,
            name: result.hostname,
            map: result.mapname,
            players: Number(result.clients),
            maxPlayers: Number(result.sv_maxclients),
            _raw: result
        };
    }
};
