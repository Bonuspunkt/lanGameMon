#!/usr/bin/env node
'use strict';

// start http server
const http = require('http');
const path = require('path');
const url = require('url');
const send = require('send');

const wsHelper = require('./lib/wsHelper');
const renderIndex = require('./lib/renderIndex');
const wwwRoot = path.resolve(__dirname, 'wwwRoot');

let gameServers = [];

const server = http.createServer();
server.on('request', (req, res) => {
    if (req.url === '/') {
        res.writeHead(200, {
            'content-type': 'text/html',
            'cache-control': 'public, max-age=15'
        });
        res.end(
            renderIndex({
                hostname: req.headers.host,
                gameServers: gameServers
            })
        );
        return;
    }
    send(req, url.parse(req.url).pathname, {
        root: wwwRoot,
        maxAge: '1m'
    }).pipe(res);
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

    let wsInterval = setInterval(updateClient, 30e3);
});

server.listen(8080, '127.0.0.1');
console.log('webserver running at http://127.0.0.1:8080/');

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

    gameServers = gameServers
        .filter(g => g.lastUpdate + 60e3 > Date.now())
        .sort((a, b) => {
            if (a.players > b.players)
                return -1;
            if (a.players < b.players)
                return 1;
            return a.name.localeCompare(b.name);
        });
});
serverList.start();
