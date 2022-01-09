import React, {useState} from "react";
import s from './AddShare.module.css'
import {useDispatch, useSelector} from "react-redux";
import Button from "../../../Common/Button/Button";
import {Modal} from "../../../Common/Modals/Modal";
import Input from "../../../Common/Input/Input";

import {RequestStatusType} from "../../../BLL/AppReducer";
import {
	addShare, deleteLastAddedShare, getCurrentPriceTC,
	setCurrentPrice, setPricesBefore, setPricesBeforeTC,
	SharesType,
	updateAmount,
	updateBuyPrice,
	updateTicker
} from "../../../BLL/SharesReducer";
import {AppStateType} from "../../../BLL/Store";
import {Loader} from "../../../Common/Loader/Loader";
import {realEstateInTimeStampsFutureFunction} from "../../../Functions/Functions";
import {setTimeStampsTC, TimeStateType} from "../../../BLL/TimeReducer";

type AddPackPagePropsType = {
	disable:boolean
	title: string
	shareId?: string
}

export const AddShare = ({disable, title, shareId}:AddPackPagePropsType) => {
	const dispatch = useDispatch()
	const timeState = useSelector<AppStateType, TimeStateType>(state => state.time)
	const sharesState = useSelector<AppStateType, Array<SharesType>>(state => state.shares)
	let currentShare: SharesType;
	if(!shareId){
		currentShare = sharesState[sharesState.length - 1];
	} else {
		currentShare = sharesState.filter(share => share.id === shareId)[0]
	}

	const {id, ticker, buyPrice, amount, currentPrice} = currentShare

	const status = useSelector<AppStateType, RequestStatusType>(state => state.app.status)
	const [active,setActive] = useState<boolean>(false)
	const [localError, setLocalError] = useState(false)
	const checkLocalError = () => {
		if (!ticker.trim() || !buyPrice.trim() || !amount.trim() || !currentPrice.trim()){
			setLocalError(true)
		}
	}
	const onAddShareModule = () => {

		setActive(true)
		!shareId && dispatch(addShare())
	}
	const onClosePackModule = () => {
		!shareId && dispatch(deleteLastAddedShare())
		setActive(false)

	}
	const fetchPrice = () => {
		dispatch(getCurrentPriceTC(id, ticker.toUpperCase()));
		if (timeState.timeStamps.length === 0) {
			dispatch(setTimeStampsTC(ticker, timeState.years))
		}
		dispatch(setPricesBeforeTC(id, ticker, timeState.years))
	}
	const onTickerChange = (value: string) => {
		dispatch(updateTicker(id, value))
	}
	const onBuyPriceChange = (value: string) => {
		dispatch(updateBuyPrice(id, value))
	}
	const onAmountChange = (value: string) => {
		dispatch(updateAmount(id, value))
	}
	const onCurrentPriceChange = (value: string) => {
		dispatch(setCurrentPrice(id, value))


	}

	const addShareHandler = () => {
		checkLocalError()
		!localError
		&& dispatch(setPricesBefore(id, realEstateInTimeStampsFutureFunction(+buyPrice, +currentPrice, timeState.timeStamps.length)))
		&& setActive(false)
	}


	return (
		<>
			<Button disabled={disable} onClick={onAddShareModule}>{title}</Button>

			<Modal active={active} setActive={setActive}>

				<div>
					{status === "loading" && <Loader/>}

					<div className={s.addPackBlockWrapper}>
						<div>
							<h3>Add share</h3>
						</div>
						<div>
							Ticker: <Input placeholder='AAPL' type={"text"} onChangeText={onTickerChange} value={ticker}/>
						</div>
						<div>
							Buy Price: <Input placeholder='60' onChangeText={onBuyPriceChange} value={buyPrice}/>
						</div>
						<div>
							Amount: <Input placeholder='60' onChangeText={onAmountChange} value={amount}/>
						</div>
						<Button onClick={fetchPrice} disabled={status === "loading"}>Check price!</Button>
						{status === "succeeded" && <span>Now price: {currentPrice}</span>}
						{status === "failed" && <div>
							Sorry, we could not find now price for your share. Please, enter that manually:
							Now price: <Input placeholder='170' onChangeText={onCurrentPriceChange} value={currentPrice}/>
						</div>}

						<div>
							<Button onClick={onClosePackModule}>Cancel</Button>
							<Button disabled={disable} onClick={addShareHandler}>Save</Button>
						</div>
					</div>
					<div>
						{localError && <div className={s.error}>Some fields are empty.</div>}
					</div>
				</div>
			</Modal>
		</>
	)
}


