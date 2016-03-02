"use strict";
const os = require('os');

module.exports = () => {
    let networkInterfaces = os.networkInterfaces();
    return Object.keys(networkInterfaces)
        .map(key => networkInterfaces[key])
        .reduce((p, c) => p.concat(c))
        .filter(i => i.family === 'IPv4' && !i.internal)
        .map(networkInterface => {
            let address = networkInterface.address.split(/\./g);
            let netmask = networkInterface.netmask.split(/\./g);

            return netmask
                .map((byte, i) => byte !== '0' ? address[i] : '255')
                .reduce((p, c) => p + '.' + c);
        });
};