import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { FormEasy, ItemBox } from '../../components';
import { addModalAction, addToastAction, requestAction } from '../../redux/global/actions';
import MainLayout from '../MainLayout/MainLayout';
import './DashboardView.scss';

const DashboardView = (props: any) => {
  const { request, addModal, addToast } = props;

  const handleFieldChange = (attr: any) => {
    //const { name, value, set } = attr;
    /*switch (name) {
      case 'age':
        if (value === '22') {
          set({ age: `${value}|validationNoMames` });
        }
        break;

      case 'password':
        if (value === '123') {
          set({ password: `${value}|validationSoEasy` });
        }
    }*/
    //console.log(name, value, set);
  };

  const showModal = (v: any) => {
    addModal({
      title: 'hola',
      content: (
        <FormEasy
          fields={{
            title: {
              type: 'text',
              isRequired: true,
            },
            description: {
              type: 'textarea',
              isRequired: true,
            },
            price: {
              type: 'number',
              validation: { min: 0 },
            },
            image: {
              type: 'file',
              //multiple: true,
              isRequired: true,
            },
          }}
          initialValues={{ description: 'mi direccion', title: '1', price: 1 }}
          submitButton="submit"
          onSubmit={handleSubmit}
          onFieldChange={handleFieldChange}
        />
      ),
    });
  };
  const handleSubmit = async (fields: any) => {
    const onSuccess = (v: any = {}) => {};
    const onError = (v: any = {}) => {
      const { message } = v;
      addToast({
        title: 'Error',
        content: message,
      });
    };

    await request(
      { name: 'product.post', fields },
      {
        onSuccess,
        onError,
      },
      false
    );
  };

  return (
    <MainLayout>
      <div className="dashboard">
        <ItemBox onClick={showModal}></ItemBox>
      </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DashboardView);
//export default DashboardView;
