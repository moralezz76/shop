import _ from 'lodash';
import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import FieldBase from '../FieldBase/FieldBaseCmp';
import './SelectCmp.scss';

const SelectCmp = (props: any) => {
  const {
    field: { name, value },
    form: { setFieldValue, isSubmitting },
    isDisabled,
    isMulti = false,
    options = {},
    onFieldChange,
    ...rest
  } = props;

  const [optionValues, setOptionValues] = useState({});

  useEffect(() => {
    const array_values = `${value}`.split(',');
    const _values = Object.keys(options).reduce((ret: any, item: string) => {
      const { value: iValue } = options[item];
      return { ...ret, ...(array_values.includes(`${iValue}`) && options[item]) };
    }, {});
    setOptionValues(_values);
  }, [value]);

  const { Option, ValueContainer } = components;

  const SingleValue = (props: any) => {
    const {
      data: { label },
    } = props;

    return <ValueContainer {...props}>{label}</ValueContainer>;
  };

  const IconOption = (props: any) => {
    const {
      data: { label },
    } = props;

    return (
      <Option {...props} className="select-option">
        {label}
      </Option>
    );
  };

  const handleOnChange = (values: any) => {
    const arr_values = _.isArray(values) ? values : [values];
    const newValues = Object.keys(arr_values)
      .reduce((ret: any, item: any) => {
        const { value } = arr_values[item];
        return [...ret, value];
      }, [])
      .join(',');
    onFieldChange && onFieldChange(name, newValues);
    setFieldValue(name, newValues);
  };

  return (
    <FieldBase {...props}>
      <Select
        disabled={isSubmitting || isDisabled}
        value={optionValues}
        options={options}
        components={{ SingleValue, Option: IconOption }}
        onChange={handleOnChange}
        isMulti={isMulti}
        {...rest}
      />
    </FieldBase>
  );
};

export default SelectCmp;
