import shopping from './shopping.svg';
import './ShoppingCartCmp.scss';

const ShoppingCartCmp = (props: any) => {
  const { articles = {} } = props;
  const keys = Object.keys(articles);
  return (
    <div className="shopping-cart as-menu">
      <div className="title">Tus Compras</div>
      <div className="block">
        <div>
          <img src={shopping} alt="123" width="38" />
        </div>
        <div className="values">{keys.length} articulo(s)</div>
      </div>
      {keys.map((name: string) => {
        return (
          <div>
            {name} : {articles[name]}
          </div>
        );
      })}
    </div>
  );
};

export default ShoppingCartCmp;
