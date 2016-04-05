import * as React from 'react'
import Timeago from '../../src'

export default class Demo extends React.Component<any,any> {
    render() {
        return (
            <Timeago date={new Date()}/>
        )
    }
}