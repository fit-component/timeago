"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var moment = require('moment');
var module = require('./module');
var _ = require('lodash');
var src_1 = require('../../../transmit-transparently/src');
var Timeago = (function (_super) {
    __extends(Timeago, _super);
    function Timeago(props) {
        _super.call(this, props);
        this.state = new module.State();
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
        var _others = src_1.others(new module.Props(), this.props);
        var then = (new Date(this.props.date)).valueOf();
        var now = Date.now();
        if (now - then >= this.props.loseTime) {
            var fullDate = moment(this.props.date);
            var formatString = fullDate.format(this.props.loseFormat);
            return React.createElement(this.props.component, _others, formatString);
        }
        else {
            var seconds = Math.round(Math.abs(now - then) / 1000);
            var suffix = then < now ? this.props.label.ago : this.props.label.fromNow;
            var value = void 0, unit = void 0;
            if (seconds < 60) {
                value = Math.round(seconds);
                unit = this.props.label.second;
            }
            else if (seconds < 60 * 60) {
                value = Math.round(seconds / 60);
                unit = this.props.label.minute;
            }
            else if (seconds < 60 * 60 * 24) {
                value = Math.round(seconds / (60 * 60));
                unit = this.props.label.hour;
            }
            else if (seconds < 60 * 60 * 24 * 7) {
                value = Math.round(seconds / (60 * 60 * 24));
                unit = this.props.label.day;
            }
            else if (seconds < 60 * 60 * 24 * 30) {
                value = Math.round(seconds / (60 * 60 * 24 * 7));
                unit = this.props.label.week;
            }
            else if (seconds < 60 * 60 * 24 * 365) {
                value = Math.round(seconds / (60 * 60 * 24 * 30));
                unit = this.props.label.month;
            }
            else {
                value = Math.round(seconds / (60 * 60 * 24 * 365));
                unit = this.props.label.year;
            }
            var fullDate = moment(this.props.date);
            var newProps = _.assign({}, _others, {
                title: fullDate.format(this.props.loseFormat)
            });
            return React.createElement(this.props.component, newProps, this.props.formatter(value, unit, suffix, then));
        }
    };
    Timeago.defaultProps = new module.Props();
    return Timeago;
}(React.Component));
exports.__esModule = true;
exports["default"] = Timeago;
