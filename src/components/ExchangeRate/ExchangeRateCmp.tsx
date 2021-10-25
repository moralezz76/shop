import './ExchangeRateCmp.scss';

const ExchangeRateCmp = (props: any) => {
  const { rates = { usdt: '0.4904 usd', usd: '0.9996 usdt' } } = props;
  return (
    <div className="exchange-rate as-menu">
      <div className="title">Tipo de Cambio</div>
      {Object.keys(rates).map((name: string) => {
        return (
          <div key={name} className="block">
            <div>1 {name}</div>
            <div className="values">= {rates[name]}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ExchangeRateCmp;
