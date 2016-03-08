/*
const dgram = require('dgram');

const message = new Buffer([
                   0x36, 0x70, 0xF0, 0xE2, 0xE2, 0x09, 0x88, 0x1F, 0x27, 0x77,
 0x26, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00])



var socket = dgram.createSocket('udp4');
socket.on('message', function(buffer, host) {
    console.log(host);
    console.log(buffer);
    console.log(buffer.toString())
    console.log(buffer.toString('ucs2'))
})
socket.send(message, 0, message.length, 50000, '192.168.5.255');
*/

const dgram = require('dgram');
var socket = dgram.createSocket('udp4');

var data0 = new Buffer([192,168,5,255]);
socket.send(data0, 0, data0.length, 6666, '192.168.5.255');
