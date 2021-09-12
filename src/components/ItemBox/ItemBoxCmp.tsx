import './ItemBoxCmp.scss';

const ItemBoxCmp = (props: any) => {
  const { children, ...rest } = props;
  return (
    <div className="item-box" {...rest}>
      {children}
    </div>
  );
};

export default ItemBoxCmp;
