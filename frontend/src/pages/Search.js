import { useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './style.css';
import './icons.css';
import EthereumLogo  from './etherium.svg';



const Search = () => {
    const [data, setData] = useState(null)
    const [searchParams] = useSearchParams();
    const [error, setError] = useState(null);
    let [settings, setSetsettings] = useState(false);

    const backHome = () =>
    {
        let path = "/"
        window.location.replace(path);
    }

    const showMoreOptions = () =>
    {
        setSetsettings(!settings);
    }

    const filterByBlock = () =>
    {
        const queryFrom = document.querySelector("#from");
        const queryTo = document.querySelector("#to");
        const queryAdress = document.querySelector("#search");
        let from = queryFrom.value;
        let to = queryTo.value;
        let address = queryAdress.value;
        if(address === "")
        {
            address = searchParams.get("address");
        }
        else
        {
            address = queryAdress.value;
        }
        let path = `/search?address=${address}&range=${from}-${to}`;
        window.location.replace(path);
    }

    const searchFunction = () =>
    {
        const query = document.querySelector("#search");
        let path = "/search?&address=" + query.value;
        window.location.replace(path);
    }

    useEffect(() => {
        document.title = "Ether.me - Search";
        const fetchData = async() => 
        {
            const address = searchParams.get("address");
            const range = searchParams.get("range");
            try
            {
                const response = await axios.get(`/api/search?address=${address}&range=${range}`);
                console.log(response);
                if(response.status === 200)
                {
                    setData(response.data);
                }
            }
            catch(err)
            {
                setError(err.response.data);
                console.log(err.response.data);
            }
        }

        fetchData();
    }, [])

    return (
        <div className="">
            <div className="backArrow" onClick={() => backHome()}>
                <div className="arrowHolder">
                    <div className="arrow">

                    </div>
                </div>
            </div>
            <div className="section m50">
                <div className="row">
                    <div className="w50">
                        <input id="search" className="input" placeholder="Search address transactions"></input>
                    </div>
                    <div className="w10">
                        <div className="iconButton" onClick={() => searchFunction()}>
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
            </div>
            {(error != null) && (searchParams.get("address") != null) && <div className="section m20 errorStatus">{error.error}</div>}
            {(settings != false) &&
            <div id="filter" className="section m20 borderSection">
                <p className="header">Filter by block options</p>
                <input id="from" className="input" placeholder="From block"></input>
                <input id="to" className="input m20" placeholder="To block"></input>
                <button className="buttonW100 m20" onClick={() => filterByBlock()}>Filter</button>
            </div>
            }
            <div className="section m20">
                {data && <div>
                        <p className="head">Recent transactions</p><p className="date">for {searchParams.get("address")}</p><p className="info">Please note that only latest 10000 transactions will be shown.</p>
                    </div>}
                {data && data.map((data, i) => (
                    <div className="transaction" key={i}>
                        <div className="row">
                            <div className="left">

                                <p className="big">{data.hash}</p>
                                <p className="small">
                                    block number: {data.blockNumber}<br></br>
                                    from: {data.from}<br></br>
                                    to: {data.to}
                                </p>
                            </div>
                            <div className="right">
                                <p className="value">
                                    {data.value} ETH <img className="icon" src={EthereumLogo}></img>
                                </p>
                                <p className="date2">{data.time}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
        </div>
    )
}
export default Search;