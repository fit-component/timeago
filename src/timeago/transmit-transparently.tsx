import * as React from 'react'

export class Props {
    children:React.ReactElement<any>
}

export class State {

}

export default class Timeago extends React.Component<Props, State> {
    static defaultProps:Props = new Props()
    public state:State = new State()

    constructor(props:any) {
        super(props)
    }

    public render():React.ReactElement<any> {
        return (
            <div>{this.props.children}</div>
        )
    }
}