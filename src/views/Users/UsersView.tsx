//import { connect } from 'react-redux';
//import { bindActionCreators, Dispatch } from 'redux';
//import { RootState } from 'ReduxTypes';
import { Formatter, TableList } from '../../components';
//import { addModalAction, addToastAction, requestAction } from '../../redux/global/actions';
import MainLayout from '../MainLayout/MainLayout';
import './UsersView.scss';

const UsersView = (props: any) => {
  //const { request, addModal, addToast } = props;
  const { SocialAndEmail, RolesTag } = Formatter;

  const columns = ['id', 'name', 'email', 'roles'];
  const cWidth = { id: 30, name: 200, email: 200 };

  const f = {
    email: <SocialAndEmail />,
    roles: <RolesTag />,
  };

  const actions = [
    {
      visible: true,
      icon: 'edit',
      cb: (row: any) => {
        console.log(row);
      },
    },
    {
      visible: true,
      icon: 'trash',
      disabled: ({ socialName }: any) => socialName !== 'facebook',
      cb: (row: any) => {
        console.log(row);
      },
    },
  ];

  return (
    <MainLayout>
      <div className="users-view">
        <TableList
          columns={columns}
          cWidth={cWidth}
          className="data-grid"
          req="users.get"
          formatter={f}
          actions={actions}
          perPage={3}
        />
      </div>
    </MainLayout>
  );
};

/*const mapStateToProps = (state: RootState) => {
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
export default connect(mapStateToProps, mapDispatchToProps)(UsersView);*/
export default UsersView;
