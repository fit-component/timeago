"use strict";
const React = require('react');
const moment = require('moment');
console.log(123);
class Timeago extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentWillMount() {
        this._isMounted = true;
        this.timeoutId = 0;
    }
    componentDidMount() {
        if (this.props.live) {
            this.tick(true);
        }
    }
    componentDidUpdate(nextProps) {
        if (this.props.live !== nextProps.live || this.props.date !== nextProps.date) {
            if (!this.props.live && this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = undefined;
            }
            this.tick();
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = undefined;
        }
    }
    tick(refresh) {
        if (!this._isMounted || !this.props.live) {
            return;
        }
        let period = 1000;
        let then = (new Date(this.props.date)).valueOf();
        let now = Date.now();
        let seconds = Math.round(Math.abs(now - then) / 1000);
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
            this.timeoutId = setTimeout(() => {
                this.tick();
            }, period);
        }
        if (!refresh) {
            this.forceUpdate();
        }
    }
    render() {
        let { component, date, loseTime, loseFormat, label, formatter } = this.props;
        let then = (new Date(date)).valueOf();
        let now = Date.now();
        if (now - then >= loseTime) {
            let fullDate = moment(date);
            let formatString = fullDate.format(loseFormat);
            return React.createElement(component, null, formatString);
        }
        else {
            let seconds = Math.round(Math.abs(now - then) / 1000);
            let suffix = then < now ? label.ago : label.fromNow;
            let value, unit;
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
            let fullDate = moment(date);
            let newProps = Object.assign({}, null, {
                title: fullDate.format(loseFormat)
            });
            return React.createElement(component, newProps, formatter(value, unit, suffix, then));
        }
    }
}
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
    formatter: (value, unit, suffix) => {
        if (value !== 1) {
            unit += 's';
        }
        return value + ' ' + unit + ' ' + suffix;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQVksS0FBSyxXQUFNLE9BQ3ZCLENBQUMsQ0FENkI7QUFDOUIsTUFBWSxNQUFNLFdBQU0sUUFFeEIsQ0FBQyxDQUYrQjtBQUVoQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBRWhCLHNCQUFxQyxLQUFLLENBQUMsU0FBUztJQUtoRCxZQUFZLEtBQVM7UUFDakIsTUFBTSxLQUFLLENBQUMsQ0FBQTtRQUNaLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFUyxrQkFBa0I7UUFDeEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUE7UUFDdEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUE7SUFDdEIsQ0FBQztJQUVTLGlCQUFpQjtRQUN2QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQixDQUFDO0lBQ0wsQ0FBQztJQUVTLGtCQUFrQixDQUFDLFNBQWE7UUFDdEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO2dCQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtZQUM5QixDQUFDO1lBQ0QsSUFBSSxDQUFD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