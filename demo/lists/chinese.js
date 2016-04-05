"use strict";
const React = require('react');
const src_1 = require('../../src');
const chinese = {
    ago: '之前',
    fromNow: '从现在开始',
    second: '秒',
    minute: '分钟',
    hour: '小时',
    day: '天',
    week: '周',
    month: '月',
    year: '年'
};
const formatter = (value, unit, suffix) => {
    return value + ' ' + unit + ' ' + suffix;
};
class Demo extends React.Component {
    render() {
        return (React.createElement(src_1.default, {date: new Date(), label: chinese, formatter: formatter}));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Demo;
