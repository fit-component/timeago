import React from 'react'
import moment from 'moment'

export default class Timeago extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        this._isMounted = true
        this.timeoutId = 0
    }

    componentDidMount() {
        if (this.props.live) {
            this.tick(true)
        }
    }

    componentDidUpdate(nextProps) {
        if (this.props.live !== nextProps.live || this.props.date !== nextProps.date) {
            if (!this.props.live && this.timeoutId) {
                clearTimeout(this.timeoutId)
                this.timeoutId = undefined
            }
            this.tick()
        }
    }

    componentWillUnmount() {
        this._isMounted = false
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = undefined
        }
    }

    tick(refresh) {
        if (!this._isMounted || !this.props.live) {
            return
        }

        let period = 1000

        let then = (new Date(this.props.date)).valueOf()
        let now = Date.now()
        let seconds = Math.round(Math.abs(now - then) / 1000)

        if (seconds < 60) {
            period = 1000
        } else if (seconds < 60 * 60) {
            period = 1000 * 60
        } else if (seconds < 60 * 60 * 24) {
            period = 1000 * 60 * 60
        } else {
            period = 0
        }

        period = Math.min(Math.max(period, this.props.minPeriod), this.props.maxPeriod)

        if (!!period) {
            this.timeoutId = setTimeout(()=> {
                this.tick()
            }, period)
        }

        if (!refresh) {
            this.forceUpdate()
        }
    }

    render() {
        let then = (new Date(this.props.date)).valueOf()
        let now = Date.now()

        console.log(then, now)

        let seconds = Math.round(Math.abs(now - then) / 1000)
        let suffix = then < now ? this.props.label.ago : this.props.label.fromNow
        let value, unit

        if (seconds < 60) {
            value = Math.round(seconds)
            unit = this.props.label.second
        } else if (seconds < 60 * 60) {
            value = Math.round(seconds / 60)
            unit = this.props.label.minute
        } else if (seconds < 60 * 60 * 24) {
            value = Math.round(seconds / (60 * 60))
            unit = this.props.label.hour
        } else if (seconds < 60 * 60 * 24 * 7) {
            value = Math.round(seconds / (60 * 60 * 24))
            unit = this.props.label.day
        } else if (seconds < 60 * 60 * 24 * 30) {
            value = Math.round(seconds / (60 * 60 * 24 * 7))
            unit = this.props.label.week
        } else if (seconds < 60 * 60 * 24 * 365) {
            value = Math.round(seconds / (60 * 60 * 24 * 30))
            unit = this.props.label.month
        } else {
            value = Math.round(seconds / (60 * 60 * 24 * 365))
            unit = this.props.label.year
        }

        let props = Object.assign({}, this.props)

        delete props.date
        delete props.formatter
        delete props.component

        let fullDate = moment(this.props.date)
        props.title = fullDate.format('YYYY-MM-DD HH:mm:ss')

        return React.createElement(this.props.component, props, this.props.formatter(value, unit, suffix, then))
    }
}

Timeago.defaultProps = {
    // @desc 需要处理的时间,可以是一个date对象,UTC字符串或者是时间戳
    date: '',

    // @desc 是否跟随时间自动变化
    live: true,

    // @desc 外层dom标签
    component: 'span',

    // @desc 多久以后的时间会失效,失效指的是不再显示友好时间,直接显示 YYYY-MM-DD HH:mm:ss
    loseTime: Infinity,

    // @desc 组件在更新前等待的最少秒数
    minPeriod: 0,

    // @desc 每隔多久更新一次时间,默认无限大
    maxPeriod: Infinity,

    // @desc 启用中文
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
    formatter: (value, unit, suffix)=> {
        if (value !== 1) {
            unit += 's'
        }
        return value + ' ' + unit + ' ' + suffix
    }
}