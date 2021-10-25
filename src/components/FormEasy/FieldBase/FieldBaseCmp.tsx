import classnames from 'classnames';
import { ErrorMessage } from 'formik';
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
    tlte,
    type,
    fieldStyle,
  } = props;

  if (type === 'hidden') return children;
  return !isHidden ? (
    <div className={classnames('field', className)} style={fieldStyle}>
      {!noTitle && (
        <div className="field-title">
          {t(tlte || name)}: {isRequired && <label className="required">*</label>}
        </div>
      )}
      {children}
      <ErrorMessage name={name} component="div" className="field-error" />
    </div>
  ) : null;
};

export default FieldBaseCmp;
