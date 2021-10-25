import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { Icon } from '..';
import t from '../../utils/i18n';
import './FormatterCmp.scss';

const FormatterCmp = () => {};

FormatterCmp.SocialAndEmail = (props: any) => {
  const {
    value,
    row: { socialName },
  } = props;
  return (
    <>
      <Icon type={socialName} size="20" className="formatter-icon-social" /> <span>{value}</span>
    </>
  );
};

FormatterCmp.ValueTag = (props: any) => {
  const { value } = props;
  return (
    <label className={classNames('formatter-tag', `tag-${value.toLowerCase()}`)}>{value}</label>
  );
};

FormatterCmp.RolesTag = (props: any) => {
  const { value } = props;
  return (
    <>
      {value.split(',').map((role: string, n: number) => (
        <label key={`lb_${n}`} className="formatter-tag">
          {role}
        </label>
      ))}
    </>
  );
};

FormatterCmp.LinkedTo = (props: any) => {
  const { value, field, row } = props;
  return (
    <label className="linked-to">
      <Link to={row[field]}>{value}</Link>
    </label>
  );
};

FormatterCmp.RowAction = (props: any) => {
  const { actions, row } = props;

  return actions.map((item: any) => {
    const { icon, cb, disabled = () => false } = item;

    const _d = disabled(row);
    return (
      <div
        className={classNames('formatter-action', { disabled: _d })}
        onClick={() => cb && !_d && cb(row)}
      >
        <div className="formatter-action-icon">
          <Icon type={icon} />
        </div>
      </div>
    );
  });
};

FormatterCmp.FieldToInfo = (props: any) => {
  const { value, infoField, info = {}, prefix } = props;

  let _info: any;
  if ((_info = info[infoField])) {
    const _value = (_info && _info[`${prefix}${value}`]) || '';
    return <>{_value}</>;
  }
  return null;
};

FormatterCmp.PrevPage = (props: any) => {
  const {
    values: { page },
    onPageChange = () => {},
  } = props;

  const disabled = parseInt(page) <= 1;
  const handleOnClick = () => {
    !disabled && onPageChange(parseInt(page) - 1);
  };
  return (
    <span className={classNames('btn btn-primary', { disabled })} onClick={handleOnClick}>
      <Icon type="before" size="20" />
    </span>
  );
};

FormatterCmp.NextPage = (props: any) => {
  const {
    values: { page, total },
    onPageChange = () => {},
  } = props;

  const disabled = parseInt(page) >= total;
  const handleOnClick = () => {
    !disabled && onPageChange(parseInt(page) + 1);
  };

  return (
    <span className={classNames('btn btn-primary', { disabled })} onClick={handleOnClick}>
      <Icon type="next" size="20" />
    </span>
  );
};

FormatterCmp.PageShowing = (props: any) => {
  const {
    values: { showing, items },
  } = props;

  return (
    <span>
      {t('showing')} {showing} {t('of')} {items}
    </span>
  );
};

export default FormatterCmp;
