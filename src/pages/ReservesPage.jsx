import React from 'react';
import vtb from "../img/vtb.svg"
import tinkoff from "../img/tinkoff.svg"
import alfabank from "../img/alfabank.png"
import sberbank from "../img/sberbank.svg"

const ReservesPage = () => {
    return (
        <div className="container">
            <h1 className="tac reserves__h1">Резерви</h1>
            <div className="reserves">
                <div className="reserves__box">
                    <div className="reserves__img">
                        <img src={vtb} alt=""/>
                    </div>
                    <div className="reserves__price">
                        12 468 838
                    </div>
                    <div className="reserves__name">
                        VTB
                    </div>
                </div>
                <div className="reserves__box">
                    <div className="reserves__img">
                        <img src={tinkoff} alt=""/>
                    </div>
                    <div className="reserves__price">
                        13 436 062
                    </div>
                    <div className="reserves__name">
                        Tinkoff
                    </div>
                </div>
                <div className="reserves__box">
                    <div className="reserves__img">
                        <img src={alfabank} alt=""/>
                    </div>
                    <div className="reserves__price">
                        12 154 063
                    </div>
                    <div className="reserves__name">
                        Alfabank
                    </div>
                </div>
                <div className="reserves__box">
                    <div className="reserves__img">
                        <img src={sberbank} alt=""/>
                    </div>
                    <div className="reserves__price">
                        12 984 807
                    </div>
                    <div className="reserves__name">
                        Sberbank
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReservesPage;
