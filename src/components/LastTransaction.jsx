import React from 'react';

const LastTransaction = () => {

    const obj = {
        "ADA": {
            min:31.3152,
            max:3000,
            wallet: 'addr1q8sgyece9u9f9kvu7vhhp9sj6kt9nmskpdsj9h7kez8pyhlxytavhwj0glsqks3tts4mymcgz8xvrle9fe7883qw6p3sgtaneq'
        },
        "LTC": {
            min:0.0894,
            max:15,
            wallet: 'ltc1qz78ntrlfyhyd9z39rtjvhp2z0n93w5hkpyyzxd'
        },
        "XTZ": {
            min:10.6509,
            max:530,
            wallet: 'tz1hPGdWAuaiNZPVjLBc2Ee3cFfQgQJFc82e'
        },
        "BTC": {
            min:0.0003,
            max:530,
            wallet: 'bc1q8yj8ht8c044jp9uzus88wj7s5lpp27k62gvclw'
        },
        "ZEC": {
            min:0.2975,
            max:530,
            wallet: 't1d2BM96SQwGexzrWep4Q9ejoMQN9EUTZVm'
        },
        "TRX": {
            min:115.2221,
            max:50000,
            wallet: 'TCARaruHkXevvRHTFYHkUccx7cpwLUzGVP'
        },
        "ETH": {
            min:0.0048,
            max:26,
            wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c'
        },
        "XMR": {
            min:0.0555,
            max:6,
            wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c'
        },
        "DASH": {
            min: 0.2681,
            max:11,
            wallet: 'Xioo28G2h6bfuTk4NwcHuEivjskyeHGihd'
        },
        "DOGE": {
            min:138.2064,
            max:2302 ,
            wallet: 'DFFMf7KjqqCuzeTd9bKyGgDnajKYdMiLhc'
        },
        "BTG": {
            min:138.2064,
            max:2302,
            wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c'
        },
        "DGB": {
            min:0.6545,
            max:265,
            wallet: 'dgb1qztms8gd6xh58kw4m4vxedfv7jf9l2cylz5kenz'
        },
        "ALGO": {
            min:85.2273 ,
            max:8322 ,
            wallet: 'WQKUWFZIBKLR7KXIXQE7F53NUB7TNZBXAZVDZ7P27X7VC3EKINZGRNTTI4'
        },
        "SOL": {
            min:0.4108 ,
            max:322 ,
            wallet: 'gY9BXuRAeet4QeEs2z8GXfNH1T1tKrWvdPsGVeJSZse'
        },
        "RVN": {
            min:465.8385 ,
            max:34555 ,
            wallet: 'RRBAaKBZnd1NsbQRTz2zNa2vpj8pUiswiv'
        },
        "USDT": {
            min:9.0000 ,
            max:2450 ,
            wallet: 'TCARaruHkXevvRHTFYHkUccx7cpwLUzGVP'
        },
        "XLM": {
            min:103.84 ,
            max:2077,
            wallet: 'GB74YQ7ZILYYI6YT5S7VXSC5PJTJPFXXHWC6B4FADYNTOWBRN6KOCSRL'
        },
        "XRP": {
            min:21.25,
            max:1062,
            wallet: 'rE3eGs1Vq2PtVUCcS41X2PosjTGSD6waYu'
        },
        "MATIC": {
            min:13.905,
            max:530,
            wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c'
        },
        "VET": {
            min:535.788851,
            max:10712,
            wallet: '0x343e86Be6F148E1838f7773D8099615b568bA09A'
        }
    }

    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }



    const keys = Object.keys(obj);
    const randomData = [];

    while (randomData.length < 15) {
        const randomKey1 = keys[Math.floor(Math.random() * keys.length)];
        const randomKey2 = keys[Math.floor(Math.random() * keys.length)];

        if (randomKey1 !== randomKey2) {
            const randomNum = getRandomNumber(obj[randomKey2].min, obj[randomKey2].max);
            randomData.push({
                key1: randomKey1,
                key2: randomKey2,
                number: randomNum
            });
        }
    }

    function addRandomTime() {
        const currentDate = new Date();
        currentDate.setHours(currentDate.getHours() - 2);

        const randomSeconds = Math.floor(Math.random() * (420 - 40 + 1) + 40);
        currentDate.setSeconds(currentDate.getSeconds() + randomSeconds);

       return currentDate.toISOString().slice(0, 19).replace('T', ' ')
    }


    return (
        <div className="trans">
            <div className="trans__content">
            <h2 className="tac trans__h2">Последние транзакции</h2>
                <div className="trans__info">
                    <p>Время</p>
                    <p>Операция</p>
                    <p>Количество</p>
                </div>
                <div className="trans__operations">
                    {randomData.map(data => (
                        <div className="trans__box" key={` ${data.key1}-${data.key2}`}>
                            <div>{addRandomTime()}</div>
                            <div className="mr-20">{data.key1} - {data.key2} </div>
                            <div>{data.number.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LastTransaction;
