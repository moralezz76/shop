import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { AppMenu, ExchangeRate, ShoppingCart, UserInfo, Wallet } from '../../components';
import { requestAction } from '../../redux/global/actions';
import { StorageHelper } from '../../utils/StorageHelper';
import './MainLayout.scss';

const MainLayout = (props: any) => {
  const { request, children } = props;
  const [userLoged, setUserLoged] = useState<{} | null>();

  useEffect(() => {
    const storage_user = StorageHelper.get('user');
    setUserLoged(storage_user);
  }, []);

  useEffect(() => {
    const validateUser = (v: any = {}) => {
      const { isValid } = v;
      if (isValid) {
      } else {
        setUserLoged(null);
      }
    };
    if (userLoged) request({ name: 'login.get' }, validateUser);
  }, [userLoged]);

  const handleSocialLoginResponse = (user: any) => {
    setUserLoged(user);
  };

  return (
    <div className="main-layout">
      <div className="left-menu">
        <h3>Usdt Shop</h3>
        <UserInfo user={userLoged} onSocialLoginResponse={handleSocialLoginResponse} />
        <Wallet />
        <ExchangeRate />
        <ShoppingCart />
        <AppMenu request={request} />
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      request: requestAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
