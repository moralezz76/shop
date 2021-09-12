import FieldBase from '../FieldBase/FieldBaseCmp';
import './TextAreaCmp.scss';

const TextAreaCmp = (props: any) => {
  const {
    field: { name, onChange, onBlur, value },
    form,
    fieldChange,
    onKeyPress,
    isDisabled,
    rows = 4,
  } = props;

  const { isSubmitting } = form;
  const handleChange = async (event: any) => {
    await onChange(event);
    fieldChange && fieldChange({ event, form });
  };

  // json field onchange
  const prevalidate = (e: any) => {
    if (onKeyPress && onKeyPress(e) === false) {
      e.preventDefault();
    }
  };

  return (
    <FieldBase {...props}>
      <textarea
        name={name}
        onKeyPress={prevalidate}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={isSubmitting || isDisabled}
        rows={rows}
        defaultValue={value}
      />
    </FieldBase>
  );
};

export default TextAreaCmp;
