import React from 'react';
import './App.module.css';
import {Header} from "./Components/Header/Header";
import {RoutesBlock} from "./Components/Routes/Routes";
import s from "./App.module.css"
import {AdvertisingComponent} from "./Components/Advertising/AdvertisingComponent/AdvertisingComponent";
import wise from './Common/Assets/Images/TransferWise-Title-Image.png'
import paysend from './Common/Assets/Images/paysend1.jpeg'
import tinkoff from './Common/Assets/Images/tinkoff.png'
import ibkr from './Common/Assets/Images/ibkr.png'

import {Footer} from "./Components/Footer/Footer";

const App = React.memo(() => {
    return (
        <div>
            <Header/>
            <div className={s.app}>
                <div className={s.advertising}>
                    <AdvertisingComponent title={"Best money transfer services:"} units={
                        [{imgSrc: wise, rate: "5/5", buttonLink: "https://wise.com/invite/i/semenk14"},
                            {imgSrc: paysend, rate: "4/5", buttonLink: "https://paysend.com/referral/5b58c5"}]}/>
                    <AdvertisingComponent title={"Best brokers:"} units={
                        [{imgSrc: ibkr, rate: "5/5", buttonLink: "https://ibkr.com/referral/semen935"},
                            {imgSrc: tinkoff, rate: "5/5", buttonLink: "https://www.tinkoff.ru/sl/7eWYoL2YS6B"}]}/>
                </div>
                <div className={s.center}>
                    <RoutesBlock/>
                </div>
                <div className={s.right}>

                </div>
            </div>
        <Footer/>

        </div>
    );
})

export default App;
