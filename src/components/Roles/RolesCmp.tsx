import { connect } from 'react-redux';
import { RootState } from 'ReduxTypes';
import { getRoles } from '../../redux/global/selectors';
import { hasRole } from '../../utils/constants';

const RolesCmp = (props: any) => {
  const { getRoles, roles, children } = props;
  //return hasRole(roles) ? React.cloneElement(children, rest) : null;
  return hasRole(roles) ? children : null;
};

const mapStateToProps = (state: RootState) => {
  return {
    getRoles: getRoles(state),
  };
};

export default connect(mapStateToProps)(RolesCmp);

//export default RolesCmp;
