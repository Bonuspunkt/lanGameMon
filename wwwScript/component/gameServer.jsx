'use strict';
const React = require('react');

const GameServer = (props) => {
    return (
        <tr key={ `${props.address}:${props.port}` }>
            <td>{props.game}</td>
            <td>{props.name}</td>
            <td>{props.map}</td>
            <td>{props.players}/{props.maxPlayers}</td>
            <td>{props.address}:{props.port}</td>
        </tr>
    );
}

module.exports = GameServer;