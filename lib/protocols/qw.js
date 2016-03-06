"use strict";

const status = new Buffer([0xFF, 0xFF, 0xFF, 0xFF, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73, 0x00]);
const responseStart = new Buffer([0xff, 0xff, 0xff, 0xff, 0x6e])

var ports = [27500, 27501, 27502, 27503];

module.exports = {
    search(socket, broadcastAddresses) {
        ports.forEach(
            port => socket.send(status, 0, status.length, port, '255.255.255.255')
        );
    },

    handle(buffer, host) {

        for (let i = 0; i < responseStart.length; i++) {
            if (buffer[i] !== responseStart[i]) { return false; }
        }

        let responseString = buffer.toString('utf-8', responseStart.length + 1);
        let responseSplit = responseString.split(/\n/g);

        let result = {
            GAME: 'qw',
            address: host.address,
            port: host.port
        };

        let serverInfo = responseSplit[0].split(/\\/g);
        for (let i = 0; i < serverInfo.length - 1; i += 2) {
            result[serverInfo[i]] = serverInfo[i+1];
        }
        let players = responseSplit.slice(1, responseSplit.length - 1);
        result.players = players.map(player => player.split(/ /g)).map(split => {
            return {
                id: split[0],
                score: split[1],
                time: split[2],
                ping: split[3],
                name: split[4].replace(/^"|"$/g, ''),
                skin: split[5].replace(/^"|"$/g, ''),
                color1: split[6],
                color2: split[7]
            };
        });

        return {
            game: 'qw',
            address: host.address,
            port: host.port,
            name: result.hostname,
            map: result.map,
            players: result.players.length,
            maxPlayers: Number(result.maxclients),
            _raw: result
        };
    }
}