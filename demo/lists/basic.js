import React from 'react'
import Timeago from 'fit-timeago'

export default class Demo extends React.Component {
    render() {
        return (
            <Timeago date={new Date()}/>
        )
    }
}