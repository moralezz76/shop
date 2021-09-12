/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import './App.scss';
import { Dialog, Toast } from './components';
import Loading from './components/LoadingCmp/LoadingCmp';
import { addModalAction, addToastAction, requestAction } from './redux/global/actions';
import { routes } from './utils/request';

const App = (props: any) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const adjustScrollY = () => {
      const { scrollY } = window;
      setScrollY(scrollY);
    };

    window.addEventListener('scroll', adjustScrollY);
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {routes.map((routeName: any, i: any) => {
            const { uri, view: View } = routeName;
            return <Route exact key={`route_${i}`} path={uri} render={() => <View />} />;
          })}
          <Route>
            <Redirect
              to={{
                pathname: '/dashboard',
              }}
            />
          </Route>
        </Switch>
      </BrowserRouter>
      <Loading scrollY={scrollY} />
      <Dialog scrollY={scrollY} />
      <Toast scrollY={scrollY} />
    </div>
  );
};

//export default App;

const mapStateToProps = (state: RootState) => {
  return {};
};
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      request: requestAction,
      addModal: addModalAction,
      addToast: addToastAction,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(App);
