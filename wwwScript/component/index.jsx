'use strict';
const React = require('react');
const GameServers = require('./gameServers');

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
                    <meta http-equiv="refresh" content="60" />
                </noscript>
                <h1 contentEditable={true} id="location">http://{this.props.hostname}/</h1>
                <h1>Server Monitor</h1>
                <div id="servers">
                    <GameServers
                        gameServers={this.props.gameServers}
                        lastUpdated={ new Date() } />
                </div>

                <h1>get the games</h1>
                <article>
                    <h2>QW</h2>
                    <div>
                        <h3>offical</h3>
                        <a href="http://store.steampowered.com/app/2310/">buy</a>
                        <a href="https://sourceforge.net/projects/nquake/">nQuake</a>

                        <h3>local mirror</h3>
                        <a href="/download/nQuake.zip">prebuild bundle</a>
                    </div>
                </article>

                <article>
                    <h2>Q3A</h2>
                    <div>
                        <h3>offical</h3>
                        <a href="http://store.steampowered.com/app/2200/">buy</a>
                        <a href="https://ioquake3.org/get-it/">ioQuake</a>
                        (
                        <a href="http://playmorepromode.org/">CPMA</a>
                        +
                        <a href="http://cpma.abusing.me/maps/">more maps</a>
                        /
                        <a href="http://www.moddb.com/mods/quake-3-rally/downloads/quake-3-rally-v132">Q3Rally 1.32</a>
                        +
                        <a href="http://www.moddb.com/mods/quake-3-rally/downloads/q3rally-v133-patch">Q3Rally 1.33 Patch</a>
                        )
                        <h3>local mirror</h3>
                        <a href="/download/quake3arena.zip">prebuild bundle</a>
                    </div>
                </article>

                <article>
                    <h2>TMNF</h2>
                    <div>
                        <h3>official</h3>
                        <a href="http://store.steampowered.com/app/11020/">steam</a>
                        <a href="http://trackmaniaforever.com/nations/">official download</a>
                        <h3>local mirror</h3>
                        <a href="/download/tmnationsforever_setup.exe">download</a>
                        <h3>notes</h3>
                        <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=448953593">
                            FIX Win8/10 Issues
                        </a>
                    </div>
                </article>

                <article>
                    <h2>Teeworlds</h2>
                    <div>
                        <h3>offical</h3>
                        <a href="http://store.steampowered.com/app/380840">steam</a>
                        <a href="https://www.teeworlds.com/?page=downloads">download</a>
                        <h3>local mirror</h3>
                        <a href="/download/teeworlds-0.6.3-win32.zip">download</a>
                    </div>
                </article>

                <script src="script.js"></script>
            </body>
            </html>
        );
    }
}

module.exports = Index;