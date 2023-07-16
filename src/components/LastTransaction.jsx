import React from 'react';
import {obj} from "./Converter";
const LastTransaction = () => {



    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }



    const keys = Object.keys(obj);
    const randomData = [];

    while (randomData.length < 25) {
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
                            <div className="mr-20"><img src={obj[data.key1].image} alt=""/> <span>{data.key1} </span> <img src={obj[data.key2].image} alt="" className="secondimg"/>  {data.key2} </div>
                            <div>{data.number.toFixed(2)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LastTransaction;
