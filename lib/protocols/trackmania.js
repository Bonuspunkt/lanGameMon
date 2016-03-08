'use strict';
const dgram = require('dgram');
const gbxremote = require('gbxremote');

const stripCodes = str => str.replace(/\$[0-9a-fA-F]{3}|\$[^\$]/g, '').replace(/\$\$/, '$');

const query = new Buffer([
                                        0x82, 0x00, 0x39, 0xFD, 0x3A, 0x2B, 0x09, 0x00, 0x00, 0x00,
    0x54, 0x6D, 0x46, 0x6F, 0x72, 0x65, 0x76, 0x65, 0x72, 0x03, 0x00, 0x00, 0x00, 0x31, 0x30, 0x30,
    0x45, 0x54, 0x06, 0x00
]);


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
                    steamAppId: 11020,
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


const ports = [2350, 2351, 2352, 2353, 2354, 2355, 2356, 2357, 2358, 2359];
const xmlRpcPort = 5000;

module.exports = {

    search(socket, broadcastAddresses) {
        ports.forEach(port => socket.send(query, 0, query.length, port, '255.255.255.255'));
    },

    handle(buffer, host) {
        if (buffer[0] !== 0x82 || buffer[1] !== 0x01) {
            return false;
        }

        // TMNF now starts a TCP connection - i have no idea how to reconstruct the data
        // send / received, so we fall back to xmlrpc which defaults on port 5000.
        var client = gbxremote.createClient({ host: host.address, port: xmlRpcPort });

        return Promise.all([
            client.query('GetCurrentRanking', [500, 0]),
            client.query('GetServerOptions'),
            client.query('GetCurrentChallengeInfo')
        ]).then(res => {
            const currentRanking = res[0];
            const serverOptions = res[1];
            const currentChallengeInfo = res[2];

            let data = {
                game: 'tmnf',
                steamAppId: 11020,
                address: client.port.host,
                port: 2350,
                name: stripCodes( serverOptions.Name ),
                map: stripCodes( currentChallengeInfo.Name ),
                players: currentRanking.length,
                maxPlayers: serverOptions.CurrentMaxPlayers,
            };

            return data;
        });
    }
};
