const axios = require('axios');
const Web3 = require('web3');
const web3 = new Web3();
require('dotenv').config();

// helping fuction that returns balance for address via third party API 
const getBalance = async(address) =>
{
    const balance = await axios.get('https://api.etherscan.io/api', {
        params: {
            module: "account",
            action: "balance",
            address: address,
            tag: "latest",
            apikey: process.env.API_KEY 
        }
    })
    .then(response => {
        return response.data;
    });
    console.log(balance);
    let result = balance.result;
    result = web3.utils.fromWei(result);
    return result;
}

// helping fuction that returns date on cetrain day for that address

const getBalanceOnDate = async(address, date) =>
{
    const results = await getTransactions(address);
    let targetDate = new Date(date);
    let balance = await getBalance(address);
    balance = parseFloat(balance);
    console.log(balance);
    for(let i = 0 ; i < results.length; i++)
    {
        let transaction = results[i];
        let tempDate = new Date(results[i].time);
        if(tempDate >= targetDate)
        {
            let from = transaction.from;
            let to = transaction.to;
            if(to != address)
            {
                let fee = parseFloat(transaction.fee);
                let value = parseFloat(transaction.value);
                balance += fee;
                balance += value;
            }
            else if(from != address)
            {
                let fee = parseFloat(transaction.fee);
                let value = parseFloat(transaction.value);
                balance += fee;
                balance -= value;
            }
            console.log(balance);
        }
    }
    return balance;
}

// helping fuction to get all transactions from address back via third party API
const getTransactions = async(address, start = 0, end = 99999999) => {
    const transactions = await axios.get('https://api.etherscan.io/api', {
        params: {
           module: "account",
           action: "txlist",
           address: address,
           startblock: start,
           endblock: end,
           sort: "desc",
           offset: 1000,
           apikey: process.env.API_KEY
        }
    })
    .then(response => {
        return response.data;
    });
    //formating data to look better
    let tempTransactions = [];
    for(let i = 0; i < transactions.result.length; i++)
    {
        let temp = transactions.result[i];
        let dateFormat = new Date(temp.timeStamp*1000);
        let timeDate = (dateFormat.getMonth()+1) + "/" + dateFormat.getDate() + "/" + dateFormat.getFullYear();
        let parsedObject = {
            hash: temp.hash,
            blockNumber: temp.blockNumber,
            time: timeDate,
            from: temp.from,
            to: temp.to,
            value: web3.utils.fromWei(temp.value),
            fee: web3.utils.fromWei(temp.gasPrice)*temp.gasUsed
        }
        tempTransactions.push(parsedObject);
    }
    return tempTransactions;
}

// route for getting address balance
const getAddressBalance = async(req, res) => 
{
    const params = req.query;
    if(params.address != undefined)
    {
        const address = params.address;
        if(web3.utils.isAddress(address))
        {
            if(params.date != undefined)
            {
                console.log(params.date);
                const date = params.date;
                const balance = await getBalanceOnDate(address, date);
                res.status(200).json({balance : balance});
            }
            else
            {
                const balance = await getBalance(address);
                res.status(200).json({balance : balance});
            }
        }
        else
        {
            // address is not valid
            res.status(400).json({error : "Address is not a valid ethereum address"});
        }
    }
    else
    {
        // address is not provided
        res.status(400).json({error : "Please provide address"})
    }
}

// route for getting all transactions
const getAddressTransactions = async(req, res) =>
{
    let params = req.query;
    if(params.address != undefined)
    {
        let address = params.address;
        if(web3.utils.isAddress(address))
        {
            if(params.range != undefined)
            {
                let range = params.range.split("-");
                const transactions = await getTransactions(address, range[0], range[1]);
                res.status(200).json(transactions);
            }
            else
            {
                let transactions = await getTransactions(address);
                res.status(200).json(transactions);
            }
        }
        else
        {
            res.status(400).json({error : "Please provide a valid address"});
        }
    }
    else
    {
        res.status(400).json({error : ""})
    }

}

module.exports =
{
    getAddressBalance,
    getAddressTransactions
}