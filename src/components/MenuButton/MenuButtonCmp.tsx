import classnames from 'classnames';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { Icon, Roles } from '..';
import './MenuButtonCmp.scss';

const MenuButtonCmp = (props: any) => {
  const { roles, title, def = {}, route, type, onClick = () => {}, ...rest } = props;

  const match = useRouteMatch<any>();
  const { path } = match;

  let history = useHistory();

  const handleClick = () => {
    let _r = route;
    Object.keys(def).forEach((item: string) => {
      _r = _r.replace(`:${item}`, def[item]);
    });
    route && history.push(_r);
    onClick();
  };

  //const active = true;

  return (
    <Roles roles={roles}>
      <div
        className={classnames('menu-button', { active: path === route })}
        onClick={handleClick}
        {...rest}
      >
        {type && <Icon type={type} size="26px" color="#5d6888" />} &nbsp; {title}
      </div>
    </Roles>
  );
};

export default MenuButtonCmp;
