import FieldBase from '../FieldBase/FieldBaseCmp';
import './TextBoxCmp.scss';

const TextBoxCmp = (props: any) => {
  const {
    field: { name, onChange, onBlur, value },
    form,
    type,
    onFieldChange,
    onKeyPress,
    isDisabled,
  } = props;

  const { isSubmitting } = form;
  const handleChange = async (event: any) => {
    await onChange(event);
    onFieldChange && onFieldChange({ event, form });
  };

  // json field onchange
  const prevalidate = (e: any) => {
    if (onKeyPress && onKeyPress(e) === false) {
      e.preventDefault();
    }
  };

  return (
    <FieldBase {...props}>
      <input
        name={name}
        onKeyPress={prevalidate}
        onChange={handleChange}
        onBlur={onBlur}
        type={type}
        disabled={isSubmitting || isDisabled}
        step="any"
        defaultValue={value}
        className="input"
      />
    </FieldBase>
  );
};

export default TextBoxCmp;
