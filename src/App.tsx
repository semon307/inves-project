import React, {useState} from 'react';
import './App.module.css';
import {Header} from "./Components/Header/Header";
import {RoutesBlock} from "./Components/Routes/Routes";
import {Loader} from "./Common/Loader/Loader";
import {useSelector} from "react-redux";
import {AppStateType} from "./BLL/Store";
import {RequestStatusType} from "./BLL/AppReducer";
import s from "./App.module.css"
import {MoneyTransfers} from "./Components/Advertising/MoneyTransfers/MoneyTransfers";
import {AdvertisingComponent} from "./Components/Advertising/AdvertisingComponent/AdvertisingComponent.module";
import wise from './Common/Assets/Images/TransferWise-Title-Image.png'
import paysend from './Common/Assets/Images/paysend1.jpeg'
import tinkoff from './Common/Assets/Images/tinkoff.png'
import ibkr from './Common/Assets/Images/ibkr.png'
import {Result} from "./Components/Result/Result";
import Button from "./Common/Button/Button";

function App() {
    const loading = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
    const [isResultShown, setIsResultShown] = useState(false)
    const onSetIsResultShown = () => {
        setIsResultShown(true)
    }
    return (
        <div>
            <Header/>
            <div className={s.app}>
                <div className={s.advertising}>
                    {/*<MoneyTransfers/>*/}
                    {/*<AdvertisingComponent/>*/}
                    <AdvertisingComponent title={"Best money transfer services:"} units={
                        [{imgSrc: wise, rate: "5/5", buttonLink: "https://wise.com/invite/i/semenk14"},
                            {imgSrc: paysend, rate: "4/5", buttonLink: "https://paysend.com/referral/5b58c5"}]}/>
                    <AdvertisingComponent title={"Best brokers:"} units={
                        [{imgSrc: ibkr, rate: "5/5", buttonLink: "https://ibkr.com/referral/semen935"},
                            {imgSrc: tinkoff, rate: "5/5", buttonLink: "https://www.tinkoff.ru/sl/7eWYoL2YS6B"}]}/>
                </div>
                <div>

                    {loading === "loading" ? <Loader/> : null}
                    <RoutesBlock/>
                    <Button onClick={onSetIsResultShown}>+ results</Button>
                    {isResultShown && <Result/>}
                </div>
                <div className={s.right}>
                </div>
            </div>
        </div>
    );
}

export default App;
