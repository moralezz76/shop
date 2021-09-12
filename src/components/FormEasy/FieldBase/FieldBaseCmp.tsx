import classnames from 'classnames';
import { ErrorMessage } from 'formik';
import _ from 'lodash';
import t from '../../../utils/i18n';
import './FieldBaseCmp.scss';

const FieldBaseCmp = (props: any) => {
  const {
    children,
    noTitle = false,
    isRequired,
    isHidden = false,
    className,
    field: { name },
  } = props;

  return !isHidden ? (
    <div className={classnames('field', className)}>
      {!noTitle && (
        <div className="field-title">
          {t(`label${_.upperFirst(name)}`)} {isRequired && <label className="required">*</label>}
        </div>
      )}
      {children}
      <ErrorMessage name={name} component="div" className="field-error" />
    </div>
  ) : null;
};

export default FieldBaseCmp;
