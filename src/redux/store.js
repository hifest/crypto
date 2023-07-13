import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {},
})

export const obj = {
    "ADA": {
        min:31.3152,
        max:3000,
        wallet: 'addr1q8sgyece9u9f9kvu7vhhp9sj6kt9nmskpdsj9h7kez8pyhlxytavhwj0glsqks3tts4mymcgz8xvrle9fe7883qw6p3sgtaneq',
        image: "https://avalpay.ru/img/pm2/ada.svg"
    },
    "LTC": {
        min:0.0894,
        max:15,
        wallet: 'ltc1qz78ntrlfyhyd9z39rtjvhp2z0n93w5hkpyyzxd',
        image: "https://avalpay.ru/img/pm2/ltc.svg"
    },
    "XTZ": {
        min:10.6509,
        max:530,
        wallet: 'tz1hPGdWAuaiNZPVjLBc2Ee3cFfQgQJFc82e',
        image: "https://avalpay.ru/img/pm2/xtz.svg"
    },
    "BTC": {
        min:0.0003,
        max:530,
        wallet: 'bc1q8yj8ht8c044jp9uzus88wj7s5lpp27k62gvclw',
        image: "https://avalpay.ru/img/pm2/btc.svg"
    },
    "ZEC": {
        min:0.2975,
        max:530,
        wallet: 't1d2BM96SQwGexzrWep4Q9ejoMQN9EUTZVm',
        image: "https://avalpay.ru/img/pm2/zec.svg"
    },
    "TRX": {
        min:115.2221,
        max:50000,
        wallet: 'TCARaruHkXevvRHTFYHkUccx7cpwLUzGVP',
        image: "https://avalpay.ru/img/pm2/trx.svg"
    },
    "ETH": {
        min:0.0048,
        max:26,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://avalpay.ru/img/pm2/eth.svg"
    },
    "XMR": {
        min:0.0555,
        max:6,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://avalpay.ru/img/pm2/xmr.svg"
    },
    "DASH": {
        min: 0.2681,
        max:11,
        wallet: 'Xioo28G2h6bfuTk4NwcHuEivjskyeHGihd',
        image: "https://avalpay.ru/img/pm2/dash.svg"
    },
    "DOGE": {
        min:138.2064,
        max:2302 ,
        wallet: 'DFFMf7KjqqCuzeTd9bKyGgDnajKYdMiLhc',
        image: "https://avalpay.ru/img/pm2/doge.svg"
    },
    "BTG": {
        min:138.2064,
        max:2302,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://avalpay.ru/img/pm2/btg.svg"
    },
    "DGB": {
        min:0.6545,
        max:265,
        wallet: 'dgb1qztms8gd6xh58kw4m4vxedfv7jf9l2cylz5kenz',
        image: "https://avalpay.ru/img/pm2/dgb.svg"
    },
    "ALGO": {
        min:85.2273 ,
        max:8322 ,
        wallet: 'WQKUWFZIBKLR7KXIXQE7F53NUB7TNZBXAZVDZ7P27X7VC3EKINZGRNTTI4',
        image: "https://avalpay.ru/img/pm2/algo.svg"
    },
    "SOL": {
        min:0.4108 ,
        max:322 ,
        wallet: 'gY9BXuRAeet4QeEs2z8GXfNH1T1tKrWvdPsGVeJSZse',
        image: "https://avalpay.ru/img/pm2/sol.svg"
    },
    "RVN": {
        min:465.8385 ,
        max:34555 ,
        wallet: 'RRBAaKBZnd1NsbQRTz2zNa2vpj8pUiswiv',
        image: "https://avalpay.ru/img/pm2/rvn.svg"
    },
    "USDT": {
        min:9.0000 ,
        max:2450 ,
        wallet: 'TCARaruHkXevvRHTFYHkUccx7cpwLUzGVP',
        image: "https://avalpay.ru/img/pm2/trc20.svg"
    },
    "XLM": {
        min:103.84 ,
        max:2077,
        wallet: 'GB74YQ7ZILYYI6YT5S7VXSC5PJTJPFXXHWC6B4FADYNTOWBRN6KOCSRL',
        image: "https://altcoinsbox.com/wp-content/uploads/2023/01/xlm-stellar-lumens-logo-350x350.webp"
    },
    "XRP": {
        min:21.25,
        max:1062,
        wallet: 'rE3eGs1Vq2PtVUCcS41X2PosjTGSD6waYu',
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025'
    },
    "MATIC": {
        min:13.905,
        max:530,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo-350x350.webp"
    },
    "VET": {
        min:535.788851,
        max:10712,
        wallet: '0x343e86Be6F148E1838f7773D8099615b568bA09A',
        image: "https://altcoinsbox.com/wp-content/uploads/2023/03/vechain-logo-300x283.webp"
    }
}