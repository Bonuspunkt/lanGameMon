'use strict';
const React = require('react');

class GameServers extends React.Component {
    render() {
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
                    { this.props.gameServers.map(this.renderGameServer) }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" style={{ textAlign: 'right' }}>
                            last updated: { this.props.lastUpdated.toJSON() }
                        </td>
                    </tr>
                </tfoot>
            </table>
        );
    }

    renderGameServer(gameServer) {
        return (
            <tr key={ `${gameServer.address}:${gameServer.port}` }>
                <td>{gameServer.game}</td>
                <td>{gameServer.name}</td>
                <td>{gameServer.map}</td>
                <td>{gameServer.players}/{gameServer.maxPlayers}</td>
                <td>{gameServer.address}:{gameServer.port}</td>
            </tr>
        );
    }
}

module.exports = GameServers;