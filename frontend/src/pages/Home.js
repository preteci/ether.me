import { useEffect, useState } from "react";
import './style.css';
import './icons.css';

const Home = () => {

    const getTransaction = () =>
    {
        let path = `/search`;
        window.location.replace(path);
    }

    const getBalance = () =>
    {
        let path = `/balance`;
        window.location.replace(path);
    }

    useEffect(() =>{
        document.title = "Ether.me - Home";
    }, [])
    return (
        <div className="section centered">
            <div className="row">
                <p className="mainHead">What would you like to get?</p>
                <div className="w100">
                    <button className="buttonW100 m10" onClick={() => getBalance()}>Get balance</button>
                </div>
                <div className="w100">
                    <button className="buttonW100 m10" onClick={() => getTransaction()}>Get transaction history</button>
                </div>
            </div>
        </div>
    )
}

export default Home;