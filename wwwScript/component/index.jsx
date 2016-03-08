'use strict';
const React = require('react');
const GameServers = require('./gameServers');
const Notes = require('./notes');

class Index extends React.Component {
    // TODO: propTypes

    render() {
        return (
            <html>
            <head>
                <meta charSet="UTF-8" />
                <title>Server Monitor</title>
                <link rel="stylesheet" href="stylesheet.css" type="text/css" />
            </head>
            <body>
                <noscript>
                    <meta httpEquiv="refresh" content="60" />
                </noscript>
                <h1 contentEditable={true} id="location">http://{this.props.hostname}/</h1>
                <h1>Server Monitor</h1>
                <div id="servers">
                    <GameServers
                        gameServers={this.props.gameServers}
                        lastUpdated={ new Date() } />
                </div>

                <Notes />

                <script src="script.js"></script>
            </body>
            </html>
        );
    }
}

module.exports = Index;
