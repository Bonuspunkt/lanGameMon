"use strict";

// gie3.
const info = new Buffer([0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x67, 0x69, 0x65, 0x33, 0x04]);
const start = new Buffer([0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff, 0x69, 0x6e, 0x66, 0x33, 0x34, 0x00]);

const ports = [8303, 8304, 8305, 8306];

module.exports = {
    search(socket, broadcastAddresses) {
        ports.forEach(
            port =>socket.send(info, 0, info.length, port, '255.255.255.255')
        );
    },

    handle(buffer, host) {

        for (let i = 0; i < start.length; i++) {
            if (buffer[i] !== start[i]) { return false; }
        }

        let responseString = buffer.toString('utf-8', start.length);
        let responseSplit = responseString.split(/\x00/g);

        return {
            game: 'teeworlds',
            address: host.address,
            port: host.port,
            name: responseSplit[1],
            map: responseSplit[2],
            players: Number(responseSplit[5]),
            maxPlayers: Number(responseSplit[6]),

            _raw: {
                version: responseSplit[0],
                gametype: responseSplit[3],
            }
            /*
            players: responseSplit
                .filter((_, i) => i > 8)
                .reduce((p, c, i) => {
                    var index = Math.floor(i / 5);
                    p[index] = p[index] || [];
                    p[index].push(c);
                    return p;
                }, [])
                .map(values => {
                    return {
                        name: values[0],
                        score: Number(values[3])
                    };
                })
                .filter(player => player.name)
                .sort((a, b) => b.score - a.score)
            */
        };
    }
};
