import { MenuButton } from '..';
import { menus } from '../../utils/request';
import './AppMenuCmp.scss';

const AppMenuCmp = (props: any) => {
  const { appMenu } = props;
  return (
    <div className="app-menu">
      {[...menus, ...appMenu].map((menu: any, k: number) => (
        <MenuButton key={`a_m_${k}`} {...menu} />
      ))}
    </div>
  );
};

export default AppMenuCmp;
