import { useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import './icons.css';
import EthereumLogo  from './etherium.svg';

const Balance = () => 
{
    const d = new Date();
    const dateString = (d.getMonth()+1) + "/" + d.getDate() + "/" + d.getFullYear();
    const [data, setBalance] = useState(null);
    const [searchParams] = useSearchParams();
    const [error, setError] = useState(null);
    let [date, setDate] = useState(dateString);
    let [settings, setSetsettings] = useState(false);

    const showMoreOptions = () =>
    {
        setSetsettings(!settings);
    }

    const backHome = () =>
    {
        let path = "/"
        window.location.replace(path);
    }

    const getBalance = () => 
    {
        let query = document.querySelector("#search");
        let address = query.value;
        let path = `/balance?&address=${address}`;
        window.location.replace(path);
    }

    const filterByDate = () =>
    {
        const query = document.querySelector("#date");
        const queryDate = query.value;
        const queryAddress = document.querySelector("#search");
        let address = queryAddress.value
        if(address === "")
        {
            address = searchParams.get("address");
        }
        else
        {
            address = queryAddress.value;
        }
        let path = `/balance?address=${address}&date=${queryDate}`
        window.location.replace(path);
        
    }

    const checkDate = (D) =>
    {
        let dateString = D;
        let timestamp = Date.parse(dateString);
        if (isNaN(timestamp)) {
            return false;
        } else {
            return true;
        }
    }
    useEffect(() => {
        document.title = "Ether.me - Balance";
        const fetchBalance = async() => 
        {
            const address = searchParams.get("address");
            const date = searchParams.get("date");
            try
            {
                const response = await axios.get(`/api/balance?address=${address}&date=${date}`);
                console.log(response);
                if(response.status === 200)
                {
                    setBalance(response.data);
                    if(date != null)
                    {
                        if(checkDate(date))
                        {
                            let td = new Date(date);
                            let paresedDate = (td.getMonth()+1) + "/" + td.getDate() + "/" + td.getFullYear();
                            setDate(paresedDate);
                        }
                    }
                }
            }
            catch(err)
            {
                setError(err.response.data);
                console.log(err.response.data);
            }
        }

        fetchBalance();
    }, [])


    return (
        <div>
             <div className="backArrow" onClick={() => backHome()}>
                <div className="arrowHolder">
                    <div className="arrow">

                    </div>
                </div>
            </div>
            <div className="section m50">
                <div className="row">
                        <div className="w50">
                            <input id="search" className="input" placeholder="Search address balance"></input>
                        </div>
                        <div className="w10">
                            <div className="iconButton" onClick={() => getBalance()}>
                                <div className="magnifier">
                                
                                </div>
                            </div>
                        </div>
                        <div className="w10">
                            <div className="iconButton" onClick={() => showMoreOptions()}>
                                <div className="filter">
                                
                                </div>
                            </div>
                        </div>
                </div>
                {(error != null) && (searchParams.get("address") != null) && <div className="section m20 errorStatus">{error.error}</div>}
            </div>
            {(settings != false) &&
            <div id="filter" className="section m20 borderSection">
                <p className="header">Get balance on date</p>
                <input id="date" className="input" placeholder="MM/DD/YYYY"></input>
                <button className="buttonW100 m20" onClick={() => filterByDate()}>Filter</button>
            </div>
            }
            <div className="section m20">
                {(data != null) && <div>
                    <p className="head m50">Balance</p>
                    <p className="date">for {searchParams.get("address")}</p>
                    <p className="date">{date}</p>
                    <div className="bigImage">
                        <div className="imgHolder">       
                            <img src={EthereumLogo} className="bigIcon"></img>
                        </div>
                    </div>
                    <p className="bigNumber">{data.balance} ETH</p>

                    </div>}
            </div>
        </div>
    )
}

export default Balance;