import * as React from 'react'
import Timeago from '../../src'

const chinese:any = {
    ago: '之前',
    fromNow: '从现在开始',
    second: '秒',
    minute: '分钟',
    hour: '小时',
    day: '天',
    week: '周',
    month: '月',
    year: '年'
}

const formatter = (value:number, unit:string, suffix:string)=> {
    return value + ' ' + unit + ' ' + suffix
}

export default class Demo extends React.Component<any,any> {
    render() {
        return (
            <Timeago date={new Date()}
                     label={chinese}
                     formatter={formatter}/>
        )
    }
}