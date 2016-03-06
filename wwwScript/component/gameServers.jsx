'use strict';

const React = require('react');
const GameServer = require('./gameServer')

const GameServers = (props) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>game</th>
                    <th>name</th>
                    <th>map</th>
                    <th>players</th>
                    <th>address</th>
                </tr>
            </thead>
            <tbody>
                { props.gameServers.map(GameServer) }
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="5" style={{ textAlign: 'right' }}>
                        last updated: { props.lastUpdated.toJSON() }
                    </td>
                </tr>
            </tfoot>
        </table>
    );
}

module.exports = GameServers;