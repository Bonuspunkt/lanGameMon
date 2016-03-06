'use strict';
const React = require('react');

const GameServer = (props) => {

    let game = props.game;
    if (props.steamAppId) {
        const url = `http://store.steampowered.com/app/${props.steamAppId}/`;
        game = (<a href={ url }>{props.game}</a>);
    }

    return (
        <tr key={ `${props.address}:${props.port}` }>
            <td>{game}</td>
            <td>{props.name}</td>
            <td>{props.map}</td>
            <td>{props.players}/{props.maxPlayers}</td>
            <td>{props.address}:{props.port}</td>
        </tr>
    );
}

module.exports = GameServer;