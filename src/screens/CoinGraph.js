import React, { useEffect, useState } from "react";
import "./CoinGraph.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import LineChart from "../components/LineChart";


function CoinGraph(){
    let params = useParams();
    let navigate = useNavigate();
    const[chartData, setChartData] = useState({
    labels: [],
    datasets: []
    });

    useEffect(() => {
        console.log("Coin ID:", params.id); // Check what ID is being passed

        if (!params.id) {
          console.error("No Coin ID provided");
          return;
        }

        setChartData({
            labels: [],
            datasets: []
        });
        
        axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=usd&days=1`)
        .then((response) => {
            console.log(response.data);
          // handle success
          setChartData({
            labels: response.data.prices.map((data) => 
                moment(data[0]).format("LT")),
            datasets:[
                {
                    label: "Price Variation (in US Dollar)",
                    data: response.data.prices.map((data) => data[1]), // Extract the price values
                    borderColor: "#1b4332",
                    backgroundColor: "#40916c",
                    borderWidth: 1,
                    pointsStyle: "line",
                },
            ],
          });
        })
        .catch((error)=>{
          // handle error
          console.error("Error fetching char data:", error);
        });
    }, [params.id])
    return (
        <div className="coin-chart">
            {/** chart */}
            <h1 className="graph-title">
                {params.id} Price Variation in 24hr
            </h1>
            {
                chartData.labels.length > 0 && (<LineChart data={chartData}/>
            )}

            <p className="back-button" onClick={() => navigate(-1)}>
                Go Back
            </p>
        </div>
    )
}


export default CoinGraph;