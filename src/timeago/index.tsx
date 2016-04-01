/// <reference path="../../../../../typings/tsd.d.ts" />

import * as React from 'react'
import * as moment from 'moment'
import {Props, State} from './module'
import * as _ from 'lodash'
import TransmitTransparently from './transmit-transparently'

@TransmitTransparently
export default class Timeago extends React.Component<Props, State> {
    static defaultProps:Props = new Props()
    public state:State = new State()

    _isMounted:boolean
    timeoutId:number

    constructor(props:any) {
        super(props)
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

    protected componentDidUpdate(nextProps:Props):void {
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

    public render():React.ReactElement<any> {
        let {component, date, loseTime, loseFormat, label, formatter} = this.props

        let then = (new Date(date)).valueOf()
        let now = Date.now()

        if (now - then >= loseTime) { // 友好时间失效了
            let fullDate = moment(date)
            let formatString = fullDate.format(loseFormat)

            return React.createElement(component, this.props.others, formatString)
        } else {
            let seconds = Math.round(Math.abs(now - then) / 1000)
            let suffix = then < now ? label.ago : label.fromNow
            let value:number, unit:string

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
            let newProps = _.assign({}, this.props.others, {
                title: fullDate.format(loseFormat)
            })

            return React.createElement(component, newProps, formatter(value, unit, suffix, then))
        }
    }
}