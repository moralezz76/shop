import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { addModalAction, addToastAction, requestAction } from '../../redux/global/actions';
import MainLayout from '../MainLayout/MainLayout';
import './UsersView.scss';

const UsersView = (props: any) => {
  const { request, addModal, addToast } = props;

  return (
    <MainLayout>
      <div className="Users"></div>
    </MainLayout>
  );
};

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
export default connect(mapStateToProps, mapDispatchToProps)(UsersView);
//export default UsersView;
