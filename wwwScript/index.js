'use strict';

require('babel-polyfill');
require('./index.styl');

// hook up info boxes
const h2s = Array.from(document.querySelectorAll('h2'));
h2s.map(h2 => h2.nextElementSibling).forEach(body => body.style.display = 'none');
h2s.map(h2 => h2.addEventListener('click', function() {
    const div = h2.nextElementSibling;
    div.style.display = div.style.display == 'none' ? 'block' : 'none';
}));



const React = require('react');
const ReactDOM = require('react-dom');
const GameServers = require('./component/gameServers')

const webSocketAddress = window.location.href.replace(/^http/, 'ws');

const initWebSocketConnection = () => {
    const webSocket = new WebSocket(webSocketAddress);
    webSocket.addEventListener('message', e => {
        const data = JSON.parse(e.data)

        if (data.gameServers) {
            const gameServers = data.gameServers;

            ReactDOM.render(
                <GameServers
                    gameServers={ data.gameServers }
                    lastUpdated={ new Date() } />,
                document.getElementById('servers')
            );
        }
    });
    webSocket.addEventListener('close', () => setTimeout(initWebSocketConnection, 5e3));
    webSocket.addEventListener('error', () => webSocket.close());
}
initWebSocketConnection()
