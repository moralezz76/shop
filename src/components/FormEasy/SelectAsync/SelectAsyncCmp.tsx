import _ from 'lodash';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SelectAsync from 'react-select/async';
import { bindActionCreators, Dispatch } from 'redux';
import { requestAction } from '../../../redux/global/actions';
import FieldBase from '../FieldBase/FieldBaseCmp';
import './SelectAsyncCmp.scss';

const SelectAsyncCmp = (props: any) => {
  const {
    field: { name, value },
    form: { setFieldValue, isSubmitting },
    isDisabled,
    isMulti = false,
    options = [],
    onFieldChange,
    req,
    request,
    fixOptions = [],
    ...rest
  } = props;

  const [optionValues, setOptionValues] = useState({});
  const [loadedOptions, setLoadedOptions] = useState<any>([...options, ...fixOptions]);

  useEffect(() => {
    const array_values = `${value}`.split(',');
    const allO: any = [...options, ...loadedOptions];
    const _values = Object.keys(allO).reduce((ret: any, item: string) => {
      const { value: iValue } = allO[item];
      return { ...ret, ...(array_values.includes(`${iValue}`) && allO[item]) };
    }, {});

    if (req) {
      //console.log(value);
      //console.log(allO);
      console.log(loadedOptions);
    }
    setOptionValues(_values);
  }, [value]);

  let hwd: any = null;
  const setAsyncTimeout = async (cb: any, timeout = 0) =>
    new Promise((resolve: any) => {
      hwd = setTimeout(async () => {
        await cb();
        resolve();
      }, timeout);
    });

  const loadOptions = async (value: any, cb: any) => {
    if (req) {
      clearTimeout(hwd);
      await setAsyncTimeout(async () => {
        const onSuccess = async (new_opts: any) => {
          setLoadedOptions([...new_opts, ...fixOptions]);
          cb([...new_opts, ...fixOptions]);
        };

        await request(
          { name: req, fields: { value } },
          {
            onSuccess,
          },
          false
        );
      }, 500);
      return;
    }
    const o = value
      ? options.filter(({ label }: any) => label.toLowerCase().includes(value.toLowerCase()))
      : options;

    cb(o);
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
    setOptionValues(values);
  };

  return (
    <FieldBase {...props}>
      <SelectAsync
        disabled={isSubmitting || isDisabled}
        value={optionValues}
        options={options}
        defaultOptions={req ? loadedOptions : options}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        isMulti={isMulti}
        cacheOptions
        {...rest}
      />
    </FieldBase>
  );
};

//export default SelectAsyncCmp;

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      request: requestAction,
    },
    dispatch
  );
export default connect(null, mapDispatchToProps)(SelectAsyncCmp);
