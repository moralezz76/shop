import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from 'ReduxTypes';
import { FormEasy, Icon, ItemBox, Product, Roles } from '../../components';
import { addModalAction, addToastAction, requestAction } from '../../redux/global/actions';
import { fill, hasRole } from '../../utils/constants';
import t, { translate_array } from '../../utils/i18n';
import { apiPath } from '../../utils/request';
import MainLayout from '../MainLayout/MainLayout';
import './DashboardView.scss';

const DashboardView = (props: any) => {
  const { request, addModal, addToast } = props;

  const handleFieldChange = (attr: any) => {};

  const [products, setProducts] = useState<any>([]);
  useEffect(() => {
    const onSuccess = ({ products: p }: any) => {
      setProducts([...p]);
    };

    const onError = (v: any) => {};

    request(
      { name: 'product.get' },
      {
        onSuccess,
        onError,
      }
    );
  }, []);

  const is_admin = hasRole('admin');
  const options = translate_array([
    { value: 'product', label: 'product' },
    { value: 'crypto', label: 'crypto' },
    ...(is_admin ? [{ value: 'app', label: 'application' }] : []),
  ]);

  const showModal = (values: any) => {
    const fields = {
      ptype: {
        tlte: 'productType',
        type: 'select',
        isRequired: true,
        options,
      },
      title: {
        tlte: 'productTitle',
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
        //isRequired: true,
      },
      id: {
        type: 'hidden',
      },
    };

    const initialValues = fill(fields, values);

    const { id } = values;
    const rs = id ? 'updating' : 'adding';

    addModal({
      title: t(`${rs}ProductTitle`),
      content: (
        <FormEasy
          fields={fields}
          initialValues={initialValues}
          submitButton="submit"
          closeModal="cancelSubmit"
          onSubmit={handleSubmit}
          onFieldChange={handleFieldChange}
        />
      ),
    });
  };
  const handleSubmit = async (fields: any, cb: any) => {
    const onSuccess = (v: any = {}) => {
      const { products } = v;
      setProducts(products);
      const { id } = fields;
      const rs = id ? 'updating' : 'adding';
      addToast({ title: `${rs}ProductTitle`, content: `${rs}ProductContent` });
      cb && cb();
    };
    const onError = (v: any = {}) => {
      const {
        data: { error },
      } = v;

      cb && cb({ error });
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
        <div className="product-list">
          {products.map((prod: any, n: number) => {
            const { ptype, imageUrl } = prod;

            const [, url] = imageUrl.split('|');
            const uri = btoa(url);

            const style = {
              backgroundImage: `linear-gradient(to top , transparent, #40434B 90%), url(${apiPath}/api/v1/resource/image/${uri})`,
            };

            return (
              <ItemBox
                className={classNames('item-list', ptype)}
                onClick={() => showModal(prod)}
                style={style}
                key={`ib_${n}`}
              >
                <Product data={prod} />
              </ItemBox>
            );
          })}
        </div>
        <Roles roles="user">
          <div className="user-action">
            <ItemBox onClick={showModal}>
              <div className="plus-container">
                <Icon type="plus" size="40px" color="#ccc" />
              </div>
            </ItemBox>
          </div>
        </Roles>
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
