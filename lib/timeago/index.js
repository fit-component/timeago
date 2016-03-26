/// <reference path="../../../../../typings/tsd.d.ts" />
"use strict";

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var __extends = undefined && undefined.__extends || function (d, b) {
    for (var p in b) {
        if (b.hasOwnProperty(p)) d[p] = b[p];
    }function __() {
        this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var moment = require('moment');
var Module = require('./module');
var Timeago = function (_super) {
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
        var then = new Date(this.props.date).valueOf();
        var now = Date.now();
        var seconds = Math.round(Math.abs(now - then) / 1000);
        if (seconds < 60) {
            period = 1000;
        } else if (seconds < 60 * 60) {
            period = 1000 * 60;
        } else if (seconds < 60 * 60 * 24) {
            period = 1000 * 60 * 60;
        } else {
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
        var _a = this.props,
            component = _a.component,
            date = _a.date,
            loseTime = _a.loseTime,
            loseFormat = _a.loseFormat,
            label = _a.label,
            formatter = _a.formatter;
        var then = new Date(date).valueOf();
        var now = Date.now();
        if (now - then >= loseTime) {
            var fullDate = moment(date);
            var formatString = fullDate.format(loseFormat);
            return React.createElement(component, null, formatString);
        } else {
            var seconds = Math.round(Math.abs(now - then) / 1000);
            var suffix = then < now ? label.ago : label.fromNow;
            var value = void 0,
                unit = void 0;
            if (seconds < 60) {
                value = Math.round(seconds);
                unit = label.second;
            } else if (seconds < 60 * 60) {
                value = Math.round(seconds / 60);
                unit = label.minute;
            } else if (seconds < 60 * 60 * 24) {
                value = Math.round(seconds / (60 * 60));
                unit = label.hour;
            } else if (seconds < 60 * 60 * 24 * 7) {
                value = Math.round(seconds / (60 * 60 * 24));
                unit = label.day;
            } else if (seconds < 60 * 60 * 24 * 30) {
                value = Math.round(seconds / (60 * 60 * 24 * 7));
                unit = label.week;
            } else if (seconds < 60 * 60 * 24 * 365) {
                value = Math.round(seconds / (60 * 60 * 24 * 30));
                unit = label.month;
            } else {
                value = Math.round(seconds / (60 * 60 * 24 * 365));
                unit = label.year;
            }
            var fullDate = moment(date);
            var newProps = _extends({}, null, {
                title: fullDate.format(loseFormat)
            });
            return React.createElement(component, newProps, formatter(value, unit, suffix, then));
        }
    };
    Timeago.defaultProps = new Module.TimeagoModule.Props();
    return Timeago;
}(React.Component);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Timeago;