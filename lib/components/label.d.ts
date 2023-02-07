import React, { CSSProperties } from 'react';
export interface LabelBaseProps {
    colon?: boolean;
    required?: boolean;
    labelWidth?: CSSProperties['width'];
    labelAlign?: CSSProperties['textAlign'];
    labelStyle?: CSSProperties;
    gutter?: number;
    tooltip?: string;
}
export interface LabelProps extends LabelBaseProps {
    children: any;
    style?: CSSProperties;
    className?: string;
}
export declare const Label: React.ForwardRefExoticComponent<LabelProps & React.RefAttributes<unknown>>;
