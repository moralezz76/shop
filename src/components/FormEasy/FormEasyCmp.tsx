/* eslint-disable react-hooks/exhaustive-deps */
import classnames from 'classnames';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import * as yup from 'yup';
import { DropZone, SelectAsync as Select, Textarea, TextBox } from '.';
import loading from '../../assets/svg/loading.svg';
import { removeModalAction } from '../../redux/global/actions';
import { Randy } from '../../utils/constants';
import t from '../../utils/i18n';
import './FormEasyCmp.scss';

const FormEasyCmp = (props: any) => {
  const {
    fields,
    initialValues = {},
    className,
    children,
    onSubmit,
    validateSubmit = async (v: any, cb: (v: any) => void) => cb(v),
    onFieldChange,
    submitButton,
    closeModal,
    removeModal,
  } = props;

  const [data_token, setRandy] = useState(0);
  const [formMessage, setFormMessage] = useState<any>(null);

  useEffect(() => {
    setRandy(Randy());
  }, []);

  let myForm: any = null;

  const test: any = {
    // this global test allow find '|validation' in value to show error
    name: 'validationTest',
    test: function (value: any): any {
      if (typeof value === 'string') {
        const { path, createError }: any = this;
        const [v, error] = value.split('|validation');
        return error ? createError({ path, message: t(error, 'validation', v) }) : this;
      }
      return this;
    },
  };

  const set = (new_values: any) => {
    const { setFieldValue, setFieldTouched } = myForm;
    Object.keys(new_values).forEach(fiels_name => {
      setFieldValue(fiels_name, new_values[fiels_name]);
      setFieldTouched(fiels_name, true);
    });
  };

  const handleFieldChange = (name: any, value: any) => {
    onFieldChange && onFieldChange({ name, value, set });
  };

  const typeCmp: any = {
    file: {
      component: DropZone,
    },
    text: {},
    hidden: {},
    textarea: {
      component: Textarea,
    },
    number: {
      postValidation: (v: any) => {
        return !isNaN(v) ? true : 'Number';
      },
    },
    email: {
      validation: {
        email: [t('Email', 'validation')],
      },
    },
    password: {},
    password2: {
      type: 'password',
    },
    select: {
      component: Select,
    },
    multiselect: {
      component: Select,
      isMulti: true,
    },
  };

  const getValidationSchema = () => {
    const { values } = myForm;

    const _v = Object.keys(fields).reduce((ret: any, keyName: any) => {
      const fObject = fields[keyName];
      if (React.isValidElement(fObject)) return ret;

      const { type, validation = {} } = fObject;

      let { validation: defValidation = {} } = typeCmp[type];
      let { isRequired = false } = fObject;
      isRequired = typeof isRequired === 'function' ? isRequired(values) : isRequired;

      const tmp_valid = { ...validation };
      if (isRequired) tmp_valid['required'] = true;

      const info = Object.keys(tmp_valid).reduce((ret: any, item: any) => {
        const value = tmp_valid[item];
        const text = t(item, 'validation');
        const value_arr = value === true ? [text] : [value, text];
        return { ...ret, [item]: value_arr };
      }, defValidation);

      const iniYup = yup.string().test(test);

      const module = Object.keys(info).reduce((ret: any, key: string) => {
        const param = info[key];
        if (typeof param === 'object' && param.test) {
          return ret.test(param);
        }
        const params = param === true ? [] : param;
        if (param && ret[key]) return ret[key](...params);
        else {
          console.log(`${key} is not a validation`);
          return ret;
        }
      }, iniYup);

      return { ...ret, [keyName]: module };
    }, {});

    return yup.object().shape(_v);
  };

  // eval is if a funct
  const injectFields = (new_values: any, params: any) => {
    const ret = Object.keys(params).reduce((ret: any, key: string) => {
      const v = params[key];
      const _v = typeof v === 'function' ? v(new_values) : v;
      return { ...ret, ...(_v && { [key]: _v }) };
    }, {});

    return ret;
  };

  const allFieldsObj = (new_values: any) => {
    return Object.keys(fields).reduce((ret: any, key: any) => {
      const fObject = fields[key];
      if (React.isValidElement(fObject)) {
        return {
          ...ret,
          [key]: React.cloneElement<any>(fObject, { values: new_values }),
        };
      }

      const { type: ftype, keypress } = fields[key];

      const { component = TextBox, type = ftype }: any = typeCmp[ftype];
      let {
        isHidden = false,
        isRequired = false,
        isDisabled = false,
        className = '',
        ...rest
      } = fields[key];

      return {
        ...ret,
        [key]: (
          <Field
            key={key}
            name={key}
            component={component}
            type={type}
            onFieldChange={handleFieldChange}
            onKeyPress={keypress}
            {...injectFields(new_values, { isDisabled, isRequired, isHidden, className })}
            {...rest}
          />
        ),
      };
    }, {});
  };

  const handleSubmit = async (new_values: any) => {
    const { setFieldTouched, setFieldError } = myForm;
    let valid = true;
    Object.keys(fields).forEach((v: any) => {
      const { type } = fields[v];
      const { postValidation } = typeCmp[type];
      if (postValidation) {
        const result = postValidation(new_values[v]);
        if (result !== true) {
          setFieldTouched(v, true, false);
          setFieldError(v, result);
          valid = false;
        }
      }
    });

    if (valid) {
      setFormMessage('');
      await validateSubmit(new_values, async (validate_values: any) => {
        onSubmit &&
          (await onSubmit({ ...validate_values, data_token }, (msg: any) => {
            const { error } = msg || {};
            error ? setFormMessage(error) : removeModal();
          }));
      });
    }
  };

  if (Object.keys(initialValues).length === 0) return null;

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {form => {
        const { isSubmitting, values } = form;

        myForm = form;
        const allChild = allFieldsObj(values);
        return (
          <Form className={classnames(className, 'form-easy')}>
            {isSubmitting && (
              <div className="waiting">
                <div>
                  <img src={loading} alt="loading" />
                </div>
              </div>
            )}
            {typeof children === 'function'
              ? children(allChild)
              : Object.keys(allChild).map((item: any) => allChild[item])}
            {formMessage && <div className="label label-error">{formMessage}</div>}
            {(submitButton || closeModal) && (
              <div className="button-container">
                {submitButton && (
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {t(submitButton || '', 'button')}
                  </button>
                )}
                {closeModal && (
                  <span
                    className={classnames('btn btn-default', { disabled: isSubmitting })}
                    onClick={removeModal}
                  >
                    {t(closeModal || '', 'button')}
                  </span>
                )}
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      removeModal: removeModalAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(FormEasyCmp);
//export default FormEasyCmp;
