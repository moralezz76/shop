import { useHistory } from 'react-router-dom';
import gear from './gear.svg';
import './MenuButtonCmp.scss';
import shutdown from './shutdown.svg';

const MenuButtonCmp = (props: any) => {
  const { request, title, route, type, onClick = () => {}, ...rest } = props;

  const types: any = {
    shutdown,
    gear,
  };

  let history = useHistory();

  const handleClick = () => {
    route && history.push(route);
    onClick({ request });
  };

  return (
    <div className="menu-button" onClick={handleClick} {...rest}>
      {types[type] && <img src={types[type]} alt="exit" />} &nbsp;{title}
    </div>
  );
};

export default MenuButtonCmp;
