import { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { AppMenu, ExchangeRate, ShoppingCart, UserInfo, Wallet } from '../../components';
import { requestAction, setRolesAction, setSessionAction } from '../../redux/global/actions';
import { getSession } from '../../redux/global/selectors';
import Storage from '../../utils/StorageHelper';
import './MainLayout.scss';

const MainLayout = (props: any) => {
  const { request, children, session, setSession, setRoles } = props;

  useEffect(() => {
    if (!session) {
      const _session = Storage.get('session');
      setSession(_session);

      const onSuccess = (v: any = {}) => {
        const { isValid, roles } = v;
        if (isValid) {
          //const currentSession = Storage.get('session');
          /*setSession(session);
          Storage.add('session', session);*/
          setRoles(roles);
        } else {
          setSession({});
        }
      };

      request({ name: 'login.get' }, { onSuccess });
    }
  }, []);

  const handleSocialLoginResponse = (session: any, roles: string) => {
    setSession(session);
    Storage.add('session', session);
    setRoles(roles);
  };

  const appMenu = [
    {
      type: 'exit',
      title: 'Disconnect',
      roles: 'user',
      onClick: (props: any) => {
        request({ name: 'logout.get' });
        Storage.clear();
        setSession(null);
      },
    },
  ];

  return (
    <div className="main-layout">
      <div className="left-menu">
        <h3>Usdt Shop</h3>
        <UserInfo session={session} onSocialLoginResponse={handleSocialLoginResponse} />
        <Wallet />
        <ExchangeRate />
        <ShoppingCart />
        <AppMenu appMenu={appMenu} />
      </div>
      <div className="content">
        <div className="content-header"></div>
        <div className="content-body">{children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    session: getSession(state),
  };
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      request: requestAction,
      setSession: setSessionAction,
      setRoles: setRolesAction,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
