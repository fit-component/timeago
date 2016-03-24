/// <reference path="../../../../../typings/tsd.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var moment = require('moment');
var Timeago = (function (_super) {
    __extends(Timeago, _super);
    function Timeago(props) {
        _super.call(this, props);
        this.state = {};
    }
    Timeago.prototype.componentWillMount = function () {
        this._isMounted = true;
        this.timeoutId = 0;
    };
    Timeago.prototype.componentDidMount = function () {
        if (this.props.live) {
            this.tick(true);
        }
    };
    Timeago.prototype.componentDidUpdate = function (nextProps) {
        if (this.props.live !== nextProps.live || this.props.date !== nextProps.date) {
            if (!this.props.live && this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = undefined;
            }
            this.tick();
        }
    };
    Timeago.prototype.componentWillUnmount = function () {
        this._isMounted = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    };
    Timeago.prototype.tick = function (refresh) {
        var _this = this;
        if (!this._isMounted || !this.props.live) {
            return;
        }
        var period = 1000;
        var then = (new Date(this.props.date)).valueOf();
        var now = Date.now();
        var seconds = Math.round(Math.abs(now - then) / 1000);
        if (seconds < 60) {
            period = 1000;
        }
        else if (seconds < 60 * 60) {
            period = 1000 * 60;
        }
        else if (seconds < 60 * 60 * 24) {
            period = 1000 * 60 * 60;
        }
        else {
            period = 0;
        }
        period = Math.min(Math.max(period, this.props.minPeriod), this.props.maxPeriod);
        if (!!period) {
            this.timeoutId = setTimeout(function () {
                _this.tick();
            }, period);
        }
        if (!refresh) {
            this.forceUpdate();
        }
    };
    Timeago.prototype.render = function () {
        var _a = this.props, component = _a.component, date = _a.date, loseTime = _a.loseTime, loseFormat = _a.loseFormat, label = _a.label, formatter = _a.formatter;
        var then = (new Date(date)).valueOf();
        var now = Date.now();
        if (now - then >= loseTime) {
            var fullDate = moment(date);
            var formatString = fullDate.format(loseFormat);
            return React.createElement(component, null, formatString);
        }
        else {
            var seconds = Math.round(Math.abs(now - then) / 1000);
            var suffix = then < now ? label.ago : label.fromNow;
            var value, unit;
            if (seconds < 60) {
                value = Math.round(seconds);
                unit = label.second;
            }
            else if (seconds < 60 * 60) {
                value = Math.round(seconds / 60);
                unit = label.minute;
            }
            else if (seconds < 60 * 60 * 24) {
                value = Math.round(seconds / (60 * 60));
                unit = label.hour;
            }
            else if (seconds < 60 * 60 * 24 * 7) {
                value = Math.round(seconds / (60 * 60 * 24));
                unit = label.day;
            }
            else if (seconds < 60 * 60 * 24 * 30) {
                value = Math.round(seconds / (60 * 60 * 24 * 7));
                unit = label.week;
            }
            else if (seconds < 60 * 60 * 24 * 365) {
                value = Math.round(seconds / (60 * 60 * 24 * 30));
                unit = label.month;
            }
            else {
                value = Math.round(seconds / (60 * 60 * 24 * 365));
                unit = label.year;
            }
            var fullDate = moment(date);
            var newProps = Object.assign({}, null, {
                title: fullDate.format(loseFormat)
            });
            return React.createElement(component, newProps, formatter(value, unit, suffix, then));
        }
    };
    return Timeago;
})(React.Component);
exports["default"] = Timeago;
Timeago.defaultProps = {
    // @desc 需要处理的时间,可以是一个date对象,UTC字符串或者是时间戳
    date: '',
    // @desc 是否跟随时间自动变化
    live: true,
    // @desc 外层dom标签
    component: 'span',
    // @desc 多久以后的时间会失效,失效指的是不再显示友好时间,直接显示 YYYY-MM-DD HH:mm:ss
    loseTime: Infinity,
    // @desc 失效时间的格式化类型
    loseFormat: 'YYYY-MM-DD HH:mm:ss',
    // @desc 组件在更新前等待的最少秒数
    minPeriod: 0,
    // @desc 每隔多久更新一次时间,默认无限大
    maxPeriod: Infinity,
    // @desc 启用中文支持
    useChinese: false,
    // @desc 定制各类提示语句
    label: {
        ago: 'ago',
        fromNow: 'from now',
        second: 'second',
        minute: 'minute',
        hour: 'hour',
        day: 'day',
        week: 'week',
        month: 'month',
        year: 'year'
    },
    // @desc 格式化
    formatter: function (value, unit, suffix) {
        if (value !== 1) {
            unit += 's';
        }
        return value + ' ' + unit + ' ' + suffix;
    }
};
