"use strict";

// NOTE: getStatus would also return player names&scores
const getStatus = new Buffer([0xFF, 0xFF, 0xFF, 0xFF, 0x67, 0x65, 0x74, 0x53, 0x74, 0x61, 0x74, 0x75, 0x73, 0x00]);
const statusResponse = new Buffer([
                   0xFF, 0xFF, 0xFF, 0xFF, 0x73, 0x74, 0x61, 0x74, 0x75, 0x73,
 0x52, 0x65, 0x73, 0x70, 0x6F, 0x6E, 0x73, 0x65, 0x0A
]);

const ports = [28960, 28961, 28962, 28963];

module.exports = {
    search(socket) {
        ports.forEach(
            port => socket.send(getStatus, 0, getStatus.length, port, '255.255.255.255')
        );
    },

    handle(buffer, host) {

        for (let i = 0; i < statusResponse.length; i++) {
            if (buffer[i] !== statusResponse[i]) { return false; }
        }

        let responseString = buffer.toString('utf-8', statusResponse.length);
        let responseSplit = responseString.split(/\n/g)
        let serverInfo = responseSplit[0].split(/\\/g);

        let result = {
        };
        for (let i = 1; i < serverInfo.length; i += 2) {
            result[serverInfo[i]] = serverInfo[i+1];
        }
        console.log(result)
        return {
            game: result.gamename.toLowerCase(),
            steamAppId: 2630,
            address: host.address,
            port: host.port,
            name: result.sv_hostname || 'D:',
            map: result.mapname,
            players: responseSplit.length - 2,
            maxPlayers: Number(result.sv_maxclients),
            _raw: result
        };
    }
};
