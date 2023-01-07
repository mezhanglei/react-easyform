/// <reference types="react" />
import { FormRule } from './validator';
export declare type TriggerType = string;
export interface ItemCoreProps {
    name?: string | number;
    parent?: string;
    index?: number;
    trigger?: TriggerType | TriggerType[];
    validateTrigger?: TriggerType | TriggerType[];
    valueProp?: string | ((type: any) => string);
    valueGetter?: ((...args: any[]) => any);
    valueSetter?: ((value: any) => any);
    rules?: FormRule[];
    initialValue?: any;
    errorClassName?: string;
    onFieldsChange?: (obj: {
        parent: string;
        name?: string;
        value: any;
    }, values?: unknown) => void;
    onValuesChange?: (obj: {
        parent?: string;
        name?: string;
        value: any;
    }, values?: unknown) => void;
    children?: any;
}
export declare const ItemCore: {
    (props: ItemCoreProps): JSX.Element;
    displayName: string;
};
