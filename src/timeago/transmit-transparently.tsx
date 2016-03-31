import * as React from 'react'

export interface PropsInterface {
    children:React.ReactElement<any>
    classNames?:string
    style?:Object
}

export interface StateInterface {
    others:Object
}

export default function immutableRenderDecorator(Target:any) {
    class Transmit extends React.Component<PropsInterface, StateInterface> {
        static defaultProps:PropsInterface
        public state:StateInterface

        constructor(props:any) {
            super(props)
            this.state = {
                others: null
            }
        }

        componentWillMount() {
            // 与子组件 defaultProps
            //
            // console.log(Target.defaultProps, this.props)
        }

        public render():React.ReactElement<any> {
            //const newProps:any = Object.assign({}, this.props)
            //newProps.others = this.state.others
            return React.createElement(Target, this.props, this.props.children)
        }
    }

    const func:any = (Target:any) => {
        return new Transmit(Target)
    }

    return func
}