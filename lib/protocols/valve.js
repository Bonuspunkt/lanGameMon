'use strict';
const status = new Buffer([
    0xFF, 0xFF, 0xFF, 0xFF, 0x54, 0x53, 0x6F, 0x75, 0x72, 0x63, 0x65, 0x20, 0x45, 0x6E, 0x67, 0x69,
    0x6E, 0x65, 0x20, 0x51, 0x75, 0x65, 0x72, 0x79, 0x00
]);

const responseStart = new Buffer([
    0xFF, 0xFF, 0xFF, 0xFF, 0x49
]);

const ports = [
    27015, // valve default port
    27016, // v-- from steam server browser
    27017,
    27018,
    27019,
    27020,

    26900,
    26901,
    26902,
    26903,
    26904,
    26905,

    4242,

    27215, // ^-- ends here

    25797 // reflex default port
];

module.exports = {
    search(socket) {
        ports.forEach(
            port => socket.send(status, 0, status.length, port, '255.255.255.255')
        );
    },

    handle(buffer, host) {
        let port = host.port;

        let index = 0;
        let end;
        for (; index < responseStart.length; index++) {
            if (buffer[index] !== responseStart[index]) { return false; }


        }

        const protocol = buffer[index];
        index++;

        end = buffer.indexOf('\0', index);
        const name = buffer.toString('utf8', index, end);

        index = end + 1;
        end = buffer.indexOf('\0', index);
        const map = buffer.toString('utf8', index, end);

        index = end + 1;
        end = buffer.indexOf('\0', index);
        const folder = buffer.toString('utf8', index, end);

        index = end + 1;
        end = buffer.indexOf('\0', index);
        const game = buffer.toString('utf8', index, end);

        index = end + 1;
        let steamAppId = buffer.readInt16LE(index);
        end += 3;

        const players = buffer[end];
        end++;

        const maxPlayers = buffer[end];
        end++;

        const bots = buffer[end];
        end++;

        const serverType = buffer.toString('utf8', end, end + 1);
        end++

        const environment = buffer.toString('utf8', end, end + 1);
        end++;

        const visibility = buffer[end];
        end++;

        const vac = buffer[end];
        end++;

        // if ship byte Mode, byte Witnesses, byte Duration

        index = end;
        end = buffer.indexOf('\0', index);
        const version = buffer.toString('utf8', index, end);
        end++;

        const edf = buffer[end];
        end++

        if (edf & 0x80) {
            port = buffer.readUInt16LE(end);
            end += 2;
        }
        if (edf & 0x10) {
            let serverSteamId = buffer.readInt32LE(end);
            end += 4;
        }
        if (edf & 0x40) {
            let sourceTvPort = buffer.readInt16LE(end);
            end += 2;

            index = end + 1;
            end = buffer.indexOf('\0', index);
            let sourceTvName = buffer.toString('utf8', index, end);
        }
        if (edf & 0x20) {
            index = end + 1;
            end = buffer.indexOf('\0', index);
            let keywords = buffer.toString('utf8', index, end);
            end++;
        }
        if (edf & 0x01) {
            steamAppId = buffer.readInt32LE(end);
        }

        return {
            game: game.toLowerCase(),
            address: host.address,
            port: port,
            name: name,
            map: map,
            steamAppId: steamAppId,
            players: players,
            maxPlayers: maxPlayers
        };
    }
};
