import classNames from 'classnames';
import { Roles } from '..';
import './ItemBoxCmp.scss';

const ItemBoxCmp = (props: any) => {
  const { roles, children, className, ...rest } = props;
  return (
    <Roles roles={roles}>
      <div className={classNames('item-box', className)} {...rest}>
        {children}
      </div>
    </Roles>
  );
};

export default ItemBoxCmp;
