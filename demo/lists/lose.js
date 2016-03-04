import React from 'react'
import Timeago from 'fit-timeago'

let date = new Date()
date.setHours(date.getHours() + 48)

export default class Demo extends React.Component {
    render() {
        return (
            <Timeago date={date}/>
        )
    }
}