'use strict';

// start http server
const http = require('http');
const path = require('path');
const url = require('url');
const send = require('send');

const wsHelper = require('./lib/wsHelper');

const wwwRoot = path.resolve(__dirname, 'wwwRoot');

let gameServers = [];

const server = http.createServer();
server.on('request', (req, res) => {
    send(req, url.parse(req.url).pathname, { root: wwwRoot }).pipe(res);
});
server.on('upgrade', (req, socket, head) => {
    if (req.url !== '/') {
        return wsHelper.close(socket);
    }

    let webSocket = wsHelper.accept(req, socket, head);
    let updateClient = () => {
        try {
            webSocket.send(JSON.stringify({
                gameServers: gameServers
            }));
        } catch (e) {
            clearInterval(wsInterval);
        }
    };

    let wsInterval = setInterval(updateClient, 60e3);
    updateClient();
});

server.listen(8080);

// start serverlist
const ServerList = require('./lib/ServerList');
let serverList = new ServerList();
serverList.on('update', server => {
    server.lastUpdate = Date.now();

    var gameServer = gameServers.find(g =>
        g.GAME === server.GAME &&
        g.address === server.address &&
        g.port === server.port);

    if (gameServer) {
        gameServers.splice(gameServers.indexOf(gameServer), 1);
    }
    gameServers.push(server);

    gameServers = gameServers.filter(g => g.lastUpdate + 60e3 > Date.now());

});
serverList.start();
