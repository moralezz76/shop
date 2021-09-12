import { MenuButton } from '..';
import { menus } from '../../utils/request';
import './AppMenuCmp.scss';

const AppMenuCmp = (props: any) => {
  const { request } = props;
  return (
    <div className="app-menu">
      {menus.map((menu: any) => (
        <MenuButton request={request} {...menu} />
      ))}
    </div>
  );
};

export default AppMenuCmp;
