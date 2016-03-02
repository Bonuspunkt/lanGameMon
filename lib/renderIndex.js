'use strict';
require('node-jsx-babel').install();

const Index = require('./layout/index');
const ReactDOMServer = require('react-dom/server');
const React = require('react');

module.exports = (options) => {
    return '<!DOCTYPE html>\n' +
        ReactDOMServer.renderToStaticMarkup(
            React.createElement(Index, options)
        );
};