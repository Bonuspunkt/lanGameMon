'use strict';
const query = new Buffer([0x80, 0x00, 0x00, 0x00, 0x00]);
const ports = [10777];

module.exports = {
    search(socket) {
        ports.forEach(
            port => socket.send(query, 0, query.length, port, '255.255.255.255')
        )
    },
    handle(buffer, host) {
        let index = 5;

        for (index = 0; index < query.length; index++) {
            if (query[index] !== buffer[index]) { return false; }
        }


        const readString = () => {
            const length = buffer[index];
            index++
            const result = buffer.toString('utf8', index, index + length);
            index += length;
            return result;
        }

        const serverId = buffer.readInt32LE(index);
        index += 4;

        const ip = readString();

        const port = buffer.readInt32LE(index);
        index += 4;

        const queryPort = buffer.readInt32LE(index);
        index += 4;

        const name = readString();

        const map = readString();

        const gameType = readString();

        const players = buffer.readInt32LE(index);
        index += 4;

        const maxPlayers = buffer.readInt32LE(index);

        return {
            game: 'ut2004',
            steamAppId: 13230,
            address: host.address,
            port: port,
            name: name,
            map: map,
            players: players,
            maxPlayers: maxPlayers
        };
    }
}