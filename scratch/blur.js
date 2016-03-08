// fiddle 2 blur

const dgram = require('dgram');

const message = new Buffer([
    0x0F, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x01, 0x00,
    0x00, 0x00, 0x17, 0xFE, 0x56, 0xFF, 0xED, 0xD9, 0x55, 0x37, 0x01, 0x00, 0x00, 0x00
])

var socket = dgram.createSocket('udp4');
socket.on('message', function(buffer, host) {
    console.log(buffer);
    console.log(host);
    console.log(buffer.toString('ucs2'))
})
console.log(message);
socket.send(message, 0, message.length, 50001, '192.168.5.255');
