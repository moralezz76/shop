import './WalletCmp.scss';

const WalletCmp = (props: any) => {
  const { wallets = { usdt: '0.00' } } = props;
  return (
    <div className="wallet as-menu">
      <div className="title">Tus billeteras</div>
      {Object.keys(wallets).map((name: string) => {
        return (
          <div key={name}>
            {name} : {wallets[name]}
          </div>
        );
      })}
    </div>
  );
};

export default WalletCmp;
