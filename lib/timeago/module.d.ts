export declare class Label {
    ago: string;
    fromNow: string;
    second: string;
    minute: string;
    hour: string;
    day: string;
    week: string;
    month: string;
    year: string;
}
export declare module TimeagoModule {
    class Props {
        date: any;
        live: boolean;
        component: string;
        loseTime: number;
        loseFormat: string;
        minPeriod: number;
        maxPeriod: number;
        useChinese: boolean;
        label: Label;
        formatter: (value: number, unit: string, suffix: string, then: any) => string;
    }
    interface State {
    }
}
