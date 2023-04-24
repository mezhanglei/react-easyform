import React, { CSSProperties } from 'react';
import { FormStore } from './form-store';
import { ItemCoreProps } from './item-core';
import { ItemProps } from './components/item';
import "./icons/index.js";
interface CreateFormProps extends React.HTMLAttributes<HTMLElement> {
    tagName?: keyof React.ReactHTML;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    onReset?: (e: React.FormEvent<HTMLFormElement>) => void;
}
export declare type FormProps<S = FormStore, T = ItemProps> = T & ItemCoreProps & {
    className?: string;
    store?: S;
    style?: CSSProperties;
    children?: any;
    values?: any;
    initialValues?: any;
    onMount?: () => void;
} & CreateFormProps;
export declare function Form(props: FormProps): JSX.Element;
export declare namespace Form {
    var Item: React.ForwardRefExoticComponent<ItemProps & ItemCoreProps & {
        className?: string | undefined;
        children?: React.ReactNode;
        style?: React.CSSProperties | undefined;
        component?: any;
    } & React.RefAttributes<any>>;
    var List: React.ForwardRefExoticComponent<ItemProps & import("./list-core").ListCoreProps & {
        className?: string | undefined;
        children?: React.ReactNode;
        style?: React.CSSProperties | undefined;
        component?: any;
        ignore?: boolean | undefined;
    } & React.RefAttributes<any>>;
}
export {};
