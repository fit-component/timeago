import * as React from 'react'
import * as moment from 'moment'

export default class Timeago extends React.Component<Timeago.Props, Timeago.State> {
    _isMounted:boolean
    timeoutId:number
    static defaultProps:any

    constructor(props) {
        super(props)
        this.state = {}
    }

    protected componentWillMount():void {
        this._isMounted = true
        this.timeoutId = 0
    }

    protected componentDidMount():void {
        if (this.props.live) {
            this.tick(true)
        }
    }

    protected componentDidUpdate(nextProps):void {
        if (this.props.live !== nextProps.live || this.props.date !== nextProps.date) {
            if (!this.props.live && this.timeoutId) {
                clearTimeout(this.timeoutId)
                this.timeoutId = undefined
            }
            this.tick()
        }
    }

    protected componentWillUnmount():void {
        this._isMounted = false
        if (this.timeoutId) {
            clearTimeout(this.timeoutId)
            this.timeoutId = undefined
        }
    }

    private tick(refresh?:boolean):void {
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

    protected render():React.ReactElement<any> {
        let {component, date, loseTime, loseFormat, label, formatter} = this.props

        let then = (new Date(date)).valueOf()
        let now = Date.now()

        if (now - then >= loseTime) { // 友好时间失效了
            let fullDate = moment(date)
            let formatString = fullDate.format(loseFormat)

            return React.createElement(component, null, formatString)
        } else {
            let seconds = Math.round(Math.abs(now - then) / 1000)
            let suffix = then < now ? label.ago : label.fromNow
            let value, unit

            if (seconds < 60) {
                value = Math.round(seconds)
                unit = label.second
            } else if (seconds < 60 * 60) {
                value = Math.round(seconds / 60)
                unit = label.minute
            } else if (seconds < 60 * 60 * 24) {
                value = Math.round(seconds / (60 * 60))
                unit = label.hour
            } else if (seconds < 60 * 60 * 24 * 7) {
                value = Math.round(seconds / (60 * 60 * 24))
                unit = label.day
            } else if (seconds < 60 * 60 * 24 * 30) {
                value = Math.round(seconds / (60 * 60 * 24 * 7))
                unit = label.week
            } else if (seconds < 60 * 60 * 24 * 365) {
                value = Math.round(seconds / (60 * 60 * 24 * 30))
                unit = label.month
            } else {
                value = Math.round(seconds / (60 * 60 * 24 * 365))
                unit = label.year
            }

            let fullDate = moment(date)
            let newProps = Object.assign({}, null, {
                title: fullDate.format(loseFormat)
            })

            return React.createElement(component, newProps, formatter(value, unit, suffix, then))
        }
    }
}

module Timeago {
    export interface Props {
        live:boolean
        date:any
        minPeriod:number
        maxPeriod:number
    }

    export interface State {

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
    formatter: (value, unit, suffix)=> {
        if (value !== 1) {
            unit += 's'
        }
        return value + ' ' + unit + ' ' + suffix
    }
}