const React = require('react');

const renderNotes = (props) => {
    return (
        <div>
            <h1>get the games</h1>
            <article>
                <h2>Blur</h2>
                <div>
                    <h3>official</h3>
                    <a>abandoned</a>
                </div>
            </article>

            <article>
                <h2>Grid</h2>
                <div>
                    <h3>official</h3>
                    <a href="http://store.steampowered.com/app/12750/">steam</a>
                </div>
            </article>

            <article>
                <h2>Q3A (Quake 3 Arana)</h2>
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
                </div>
            </article>

            <article>
                <h2>QW (QuakeWorld)</h2>
                <div>
                    <h3>offical</h3>
                    <a href="http://store.steampowered.com/app/2310/">buy</a>
                    <a href="https://sourceforge.net/projects/nquake/">nQuake</a>
                </div>
            </article>

            <article>
                <h2>Reflex</h2>
                <div>
                    <h3>official</h3>
                    <a href="http://store.steampowered.com/app/328070/">steam</a>
                </div>
            </article>

            <article>
                <h2>Teeworlds</h2>
                <div>
                    <h3>offical</h3>
                    <a href="http://store.steampowered.com/app/380840">steam</a>
                    <a href="https://www.teeworlds.com/?page=downloads">download</a>
                </div>
            </article>

            <article>
                <h2>TMNF (Trackmania Nations Forever)</h2>
                <div>
                    <h3>official</h3>
                    <a href="http://store.steampowered.com/app/11020/">steam</a>
                    <a href="http://trackmaniaforever.com/nations/">official download</a>
                    <h3>notes</h3>
                    <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=448953593">
                        FIX Win8/10 Issues
                    </a>
                </div>
            </article>
        </div>
    );
};

module.exports = renderNotes;
