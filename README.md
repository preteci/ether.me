# ether.me

Ether.me is a small application written in node.js for backend and react.js for frontend that can generate last 10K transactions for a ethereum adress that is given as well as balance of the address.

Before running both frontend and backend, please configure .env file with API_KEY="YOURAPIKEYHERE".

API provider is https://etherscan.io/apis.

Frontend run command:
```
npm start
```
Backend run command:
```
node index.js
```

Application has balance and transactions history for every address you type in, by accesing 3 lines you can filter address balance by DATE or you can filter address transactions by block.

Balance window filters

![Alt text](https://i.imgur.com/h80KeFH.png)

Transactions window filters

![Alt text](https://i.imgur.com/uJg03oE.png)
