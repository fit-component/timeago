"use strict";
const React = require('react');
const src_1 = require('../../src');
let weekAgo = new Date();
weekAgo.setHours(weekAgo.getHours() - 24 * 7);
let monthAgo = new Date();
monthAgo.setHours(monthAgo.getHours() - 24 * 30);
let yearAgo = new Date();
yearAgo.setHours(yearAgo.getHours() - 24 * 365);
class Demo extends React.Component {
    render() {
        return (React.createElement("div", null, 
            React.createElement(src_1.default, {date: weekAgo}), 
            React.createElement(src_1.default, {date: monthAgo, style: { marginLeft: 10 }}), 
            React.createElement(src_1.default, {date: yearAgo, loseTime: 1000 * 60 * 60 * 24 * 364, style: { marginLeft: 10 }})));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Demo;
