'use strict';
const dgram = require('dgram');
const gbxremote = require('gbxremote');

const stripCodes = str => str.replace(/\$[0-9a-fA-F]{3}|\$[^\$]/g, '').replace(/\$\$/, '$');

// FIXME: lanGameMon is expected to run alone on a server,
// so using port 2350 will not conflict with a running TMN server

// HACK: work around the "tmnf does not have broadcast"
const start = new Buffer([0x00, 0xFF,0x00, 0xFF,0x00, 0xFF,0x00, 0xFF]);

const servers = [{ host: '192.168.5.93', port: 5000 }];

const hostSocket = dgram.createSocket('udp4');
hostSocket.bind(6969, '127.0.0.1');
hostSocket.on('message', (message, source) => {
    servers
        .map(server => gbxremote.createClient(server))
        .forEach(client => {

            Promise.all([
                client.query('GetCurrentRanking', [500, 0]),
                client.query('GetServerOptions'),
                client.query('GetCurrentChallengeInfo')
            ]).then(res => {
                const currentRanking = res[0];
                const serverOptions = res[1];
                const currentChallengeInfo = res[2];

                let data = {
                    game: 'tmnf',
                    address: client.port.host,
                    port: 2350,
                    name: stripCodes( serverOptions.Name ),
                    map: stripCodes( currentChallengeInfo.Name ),
                    players: currentRanking.length,
                    maxPlayers: serverOptions.CurrentMaxPlayers,
                };

                let dataToSend = Buffer.concat([start, new Buffer(JSON.stringify(data))]);

                hostSocket.send(dataToSend, 0, dataToSend.length, source.port, source.address);

                client.terminate();
            });
        });
});


module.exports = {

    search(socket, broadcastAddresses) {
        socket.send(start, 0, start.length, 6969, '127.0.0.1');
    },

    handle(buffer, host) {
        for (let i = 0; i < start.length; i++) {
            if (buffer[i] !== start[i]) { return false; }
        }

        let responseString = buffer.toString('utf-8', start.length);
        return JSON.parse(responseString);
    }
};