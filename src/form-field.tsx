import React, { cloneElement, isValidElement, useCallback, useContext, useState } from 'react'

import { FormStoreContext } from './form-store-context'
import { useFieldChange } from './use-field-change'
import { FormOptions, FormOptionsContext } from './form-options-context'
import { getPropValueName, getValueFromEvent } from './utils'
import { FormRule } from './form-store'
import classnames from 'classnames';
import { AopFactory } from './utils/function-aop'

export interface FormFieldProps extends FormOptions {
  className?: string
  label?: string
  name?: string
  valueProp?: string | ((type: any) => string)
  valueGetter?: (...args: any[]) => any
  suffix?: React.ReactNode
  children?: React.ReactNode
  rules?: FormRule[]
}

const prefixCls = 'rh-form-field';

export function FormField(props: FormFieldProps) {
  const {
    className,
    label,
    name,
    valueProp = 'value',
    valueGetter = getValueFromEvent,
    suffix,
    children,
    rules,
    ...restProps
  } = props

  const store = useContext(FormStoreContext)
  const options = useContext(FormOptionsContext)
  const [value, setValue] = useState(name && store ? store.getFieldValue(name) : undefined)
  const [error, setError] = useState(name && store ? store.getFieldError(name) : undefined)

  // onChange监听
  const onChange = useCallback(
    (...args: any[]) => {
      const values = store!.getFieldValue();
      const value = valueGetter(...args);
      const error = store!.getFieldError(name!);
      // 设置值
      name && store && store.setFieldValue(name, value)
      // 执行onFormChange事件
      name && options?.onFormChange && options?.onFormChange({ name: name, value: value, values: values, error: error })
    },
    [name, store, valueGetter]
  )

  const aopOnchange = new AopFactory(onChange);

  useFieldChange({
    store,
    name,
    rules,
    // 监听FormStore中的value变化
    onChange: () => {
      const value = store!.getFieldValue(name!);
      setValue(value);
    },
    // 监听错误变化
    onError: () => {
      const error = store!.getFieldError(name!);
      setError(error);
    }
  })

  const { inline, compact, required, labelWidth, labelAlign, gutter, errorClassName = 'error' } = {
    ...options,
    ...restProps
  }

  let child: any = children

  if (name && store && isValidElement(child)) {
    const valueKey = getPropValueName(valueProp, child && child.type)
    const childProps = child?.props as any;
    // 对onChange方法进行aop包装，在后面添加子元素自身的onChange事件
    const childOnChange = childProps?.onChange;
    const aopAfterFn = aopOnchange.addAfter(childOnChange)

    let childClassName = childProps.className || '';
    if (error) childClassName += ' ' + errorClassName

    const newChildProps = { className: childClassName, [valueKey]: value, onChange: aopAfterFn }
    child = cloneElement(child, newChildProps)
  }

  const cls = classnames(
    classes.field,
    inline ? classes.inline : '',
    compact ? classes.compact : '',
    required ? classes.required : '',
    error ? classes.error : '',
    className ? className : ''
  )

  const headerStyle = {
    width: labelWidth,
    marginRight: gutter,
    textAlign: labelAlign
  }

  return (
    <div className={cls}>
      {label !== undefined && (
        <div className={classes.header} style={headerStyle}>
          {label}
        </div>
      )}
      <div className={classes.container}>
        <div className={classes.control}>{child}</div>
        <div className={classes.message}>{error}</div>
      </div>
      {suffix !== undefined && <div className={classes.footer}>{suffix}</div>}
    </div>
  )
}

const classes = {
  field: prefixCls,
  inline: `${prefixCls}--inline`,
  compact: `${prefixCls}--compact`,
  required: `${prefixCls}--required`,
  error: `${prefixCls}--error`,

  header: `${prefixCls}__header`,
  container: `${prefixCls}__container`,
  control: `${prefixCls}__control`,
  message: `${prefixCls}__message`,
  footer: `${prefixCls}__footer`
}
