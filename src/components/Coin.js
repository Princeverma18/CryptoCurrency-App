import { useEffect, useState } from 'react';
import './Coin.css';
import { useNavigate } from 'react-router-dom';


function Coin(props) {
  const[currencySymbol, setCurrencySymbol] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    switch(props.currency){
      case "USD":
        setCurrencySymbol("$");
        break;

      case "idr":
        setCurrencySymbol("IDR");
        break;

      case "twd":
        setCurrencySymbol("NT");
        break;

      case "eur":
        setCurrencySymbol("€");
        break;

      case "krw":
        setCurrencySymbol("₩");
        break;

      case "jpy":
        setCurrencySymbol("¥");
        break;

      case "rub":
        setCurrencySymbol("RUB");
        break;

      case "cny":
        setCurrencySymbol("CN¥");
        break;

      case "inr":
        setCurrencySymbol("Rs.");
        break;

      default:
        break;
    }

  }, [props.currency])
  return (
    <div className="coin-container" onClick={() => navigate(`/Coin/${props.id}`)}>
        <img src={props.image}
             alt={props.name}
             className='image'
             />

             <h1 className='coin-name'>{props.name}</h1>
             <p className='coin-data'>{props.symbol}</p>

             <p className='coin-heading'>Price</p>
             <p className='coin-data'>{currencySymbol} {props.price}</p>

             <p className='coin-heading'>Volume</p>
             <p className='coin-data'>{currencySymbol} {props.volume.toLocaleString()}</p>

             <p className='coin-heading'>Price Change</p>
             {
              props.priceChange < 0 ? (
                <p className='coin-data red'>{props.priceChange.toFixed(2)}%</p>

              ) : (<p className='coin-data green'>{props.priceChange.toFixed(2)}%</p>
             )}

             <p className='coin-heading'>Market Cap</p>
             <p className='coin-data'>{currencySymbol} {props.marketcap.toLocaleString()}</p>
    </div>
  );
}

export default Coin;
