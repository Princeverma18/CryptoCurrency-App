import './HomeScreen.css';
import Coin from '../components/Coin.js';
import { useEffect, useState } from 'react';
import axios from 'axios';

 // https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&sparkline=false

function HomeScreen() {
    const[coins, setCoins] = useState([]);
    const[search, setSearch] = useState("");
    const[currency, setCurrency] = useState("usd");
    const[sort, setSort] = useState("market_cap");

    const availableCurrency = [
      {
        id: "1",
        name: "Indian Rupees",
        value:"inr",
      },
      {
        id: "2",
        name: "US Dollar",
        value:"usd",
      },
      {
        id: "3",
        name: "Indonesia Dollar",
        value:"idr",
      },
      {
        id: "4",
        name: "New Tawan Dollar",
        value:"twd",
      },
      {
        id: "5",
        name: "Euro",
        value:"eur",
      },
      {
        id: "6",
        name: "South Korean Won",
        value:"krw",
      },
      {
        id: "7",
        name: "Japanese Yen",
        value:"jpy",
      },
      {
        id: "8",
        name: "Russian Rubble",
        value:"rub",
      },
      {
        id: "9",
        name: "Chinese Yuan",
        value:"cny",
      }
    ];

    const availableSorting = [
      {
        id:"1",
        name:"Name",
        value:"name",
      },
      {
        id:"2",
        name:"Price",
        value:"current_price",
      },
      {
        id:"3",
        name:"Volume",
        value:"total_volume",
      },
      {
        id:"4",
        name:"market Cap",
        value:"market_cap",
      },
    ]

    useEffect(() => {
        axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&sparkline=false`)
  .then((response) => {
    // handle success
    setCoins(response.data);
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    // always executed
  });
    }, [currency]);


    const searchCoin = (e) => {
      setSearch(e.target.value);
    };


    const handleChange = (e) => {
      setCurrency(e.target.value);
    };


    
    const handleChangeSort = (e) => {
      setSort(e.target.value);
    };


    const filteredCoins = coins.filter((coin) => 
      coin.name.toLowerCase().includes(search.toLowerCase())
  );


  //Sorting
  switch(sort) {
    case "name":
      filteredCoins.sort((a,b) => (a.name > b.name ? 1 : -2));
      break;

    case "current_price":
      filteredCoins.sort((a,b) => (a.current_price > b.current_price ? 1 : -2));
      break;

    case "total_volume":
      filteredCoins.sort((a,b) => (a.total_volume > b.total_volume ? 1 : -2));
      break;

      case "market_cap":
      filteredCoins.sort((a,b) => (a.market_cap > b.market_cap ? 1 : -2));
      break;

    default:
      break;
  }

  return (
    <div className="main-container">
     {/**  search box */}
     
    <div className='coin-search'>
        <h1 className='main-heading'> Cryptocurrency Tracking</h1>
        <form>
            <input type='text'
                   placeholder='search' 
                   className='coin-input'
                   onChange={searchCoin}
                   />
        </form>
        </div>
        {/**dropdown menu */}

        <div className='coin-option'>
          <div className='coin-dropdown'>
            Select Currency
            <select value={currency}
              onChange={handleChange}
              className = "dropdown-menu">{
                availableCurrency.map((item) =>{
                  return(
                  <option  value={item.value} key={item.id}>
                    {item.name}
                  </option>
                  );
                })
              }
            </select>
          </div>

          <br></br>
          <div className='coin-dropdown'>
            Sort By
            <select value={sort}
              onChange={handleChangeSort}
              className = "dropdown-menu">{
                availableSorting.map((item) =>{
                  return(
                  <option  value={item.value} key={item.id}>
                    {item.name}
                  </option>
                  );
                })
              }
            </select>
          </div>
        </div>


        <div className='coins-container'>
            {
                filteredCoins.map((coin) => {
                    return (
                        <Coin 
                          id={coin.id}
                          key={coin.id}
                          name={coin.name}
                          image={coin.image}
                          symbol={coin.symbol}
                          volume={coin.total_volume}
                          price={coin.current_price}
                          priceChange={coin.price_change_percentage_24h}
                          marketcap={coin.market_cap}
                          currency={currency}
                        />
                    )
                })
            }
        </div>
    </div>
  );
}

export default HomeScreen;
