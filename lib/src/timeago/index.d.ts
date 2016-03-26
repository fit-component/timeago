/// <reference path="../../../../../typings/tsd.d.ts" />
import * as React from 'react';
import * as Module from './module';
export default class Timeago extends React.Component<Module.TimeagoModule.Props, Module.TimeagoModule.State> {
    _isMounted: boolean;
    timeoutId: number;
    static defaultProps: Module.TimeagoModule.Props;
    constructor(props: any);
    protected componentWillMount(): void;
    protected componentDidMount(): void;
    protected componentDidUpdate(nextProps: Module.TimeagoModule.Props): void;
    protected componentWillUnmount(): void;
    private tick(refresh?);
    render(): React.ReactElement<any>;
}
