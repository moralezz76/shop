import classNames from 'classnames';
import './ProductCmp.scss';

const ProductCmp = (props: any) => {
  const { data, className, rest } = props;
  const { title, description, price } = data;

  var f = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className={classNames('product-item', className)} {...rest}>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="price"> {f.format(price)}</div>
    </div>
  );
};

export default ProductCmp;
