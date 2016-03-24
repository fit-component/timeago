"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var moment = require('moment');

var Timeago = function (_React$Component) {
    _inherits(Timeago, _React$Component);

    function Timeago(props) {
        _classCallCheck(this, Timeago);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Timeago).call(this, props));

        _this.state = {};
        return _this;
    }

    _createClass(Timeago, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            this._isMounted = true;
            this.timeoutId = 0;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.live) {
                this.tick(true);
            }
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(nextProps) {
            if (this.props.live !== nextProps.live || this.props.date !== nextProps.date) {
                if (!this.props.live && this.timeoutId) {
                    clearTimeout(this.timeoutId);
                    this.timeoutId = undefined;
                }
                this.tick();
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = undefined;
            }
        }
    }, {
        key: 'tick',
        value: function tick(refresh) {
            var _this2 = this;

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
                    _this2.tick();
                }, period);
            }
            if (!refresh) {
                this.forceUpdate();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var component = _props.component;
            var date = _props.date;
            var loseTime = _props.loseTime;
            var loseFormat = _props.loseFormat;
            var label = _props.label;
            var formatter = _props.formatter;

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
                var _fullDate = moment(date);
                var newProps = _extends({}, null, {
                    title: _fullDate.format(loseFormat)
                });
                return React.createElement(component, newProps, formatter(value, unit, suffix, then));
            }
        }
    }]);

    return Timeago;
}(React.Component);

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Timeago;
Timeago.defaultProps = {
    date: '',
    live: true,
    component: 'span',
    loseTime: Infinity,
    loseFormat: 'YYYY-MM-DD HH:mm:ss',
    minPeriod: 0,
    maxPeriod: Infinity,
    useChinese: false,
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
    formatter: function formatter(value, unit, suffix) {
        if (value !== 1) {
            unit += 's';
        }
        return value + ' ' + unit + ' ' + suffix;
    }
};