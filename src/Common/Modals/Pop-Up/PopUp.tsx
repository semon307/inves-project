import React, {useEffect, useState} from "react";
import s from './PopUp.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../BLL/Store";
import {setAppErrorAC} from "../../../BLL/AppReducer";



export const PopUp = React.memo(() => {
	const dispatch = useDispatch()
	const error = useSelector<AppStateType, string | null>(state => state.app.error)
	const [active, setActive] = useState<boolean>(false)

	useEffect(() => {
		if (error) {
			setActive(true)
			setTimeout(() => {
				dispatch(setAppErrorAC("Some error occured"))
			}, 3000)
			return
		}
		setActive(false)
	}, [dispatch, error])

	const changePopUpBlock = active ? s.popUpBlockActive : s.popUpBlock
	const changePopUpMode = active ? s.popUpWrapperActive : s.popUpWrapper

	return (
		<div className={changePopUpBlock}>
			<div className={changePopUpMode}>
				<h2>
					{error}
				</h2>
			</div>
		</div>
	)
})
