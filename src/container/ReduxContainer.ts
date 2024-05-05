import { Action, createAsyncThunk, Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit"
import { connect } from "react-redux"

import Component, { Props, Actions } from "@component/ReactComponent"
import { dispatch as store_dispatch } from "@store"

// [redux async]https://redux.js.org/tutorials/fundamentals/part-6-async-logic
// [createAsyncThunk]https://redux-toolkit.js.org/api/createAsyncThunk
export const name = "ReduxContainer"
const initialState: Props = {
	count: 0,
	fetched: "not fetched",
	title: "React + Redux",
}
const slice = createSlice({
	name,
	initialState,
	reducers: {
		add_count: (props: Props, action: PayloadAction<void>): void => {
			props.count += 1
		},
		set_fetched: (props: Props, action: PayloadAction<string>): void => {
			props.fetched = action.payload
		},
	},
})
export const { ...others } = slice.actions
export const reducers = slice.reducer

const mapStateToProps = (props: { [name]: Props }): Props => {
	return props[name]
}
const mapDispatchToProps = (dispatch: Dispatch<Action>): Actions => {
	return {
		onPress: (payload: Date) => {
			dispatch(slice.actions.add_count())
			dispatch(slice.actions.set_fetched("fetching"))
			store_dispatch(start_press({ start: payload }))
				.then(response => {
					dispatch(slice.actions.set_fetched(response.payload!))
				})
				.catch(error => {
					dispatch(slice.actions.set_fetched(error))
				})
			/*
			store_dispatch(start_press({ start: payload })).unwrap()
				.then(response => {
					dispatch(slice.actions.set_fetched(response))
				})
				.catch(error => {
					dispatch(slice.actions.set_fetched(error))
				})
			*/
		},
	}
}
const start_press = createAsyncThunk<string, { start: Date }, { state: { [name]: Props }; rejectValue: string }>(name, async (arg, thunkAPI) => {
	const { getState, fulfillWithValue, rejectWithValue, } = thunkAPI
	const { count } = getState()[name]
	const { start } = arg

	const promise = new Promise<string>((resolve, reject) => {
		setTimeout(() => {
			if (count % 2) {
				resolve(`fetch success \n count: ${count} \n start at: ${start.toISOString()} \n latency: ${new Date().getTime() - start.getTime()}`)

			} else {
				reject(`fetch error \n count: ${count} \n start at: ${start.toISOString()} \n latency: ${new Date().getTime() - start.getTime()}`)
			}
		}, 1000)
	})
	return await promise.then((response) => {
		return fulfillWithValue(response)

	}).catch((error) => {
		return rejectWithValue(error)
	})

	/*
	try {
		return await promise

	} catch (error) {
		return rejectWithValue(error as string)
	}
	*/
})
export default connect(mapStateToProps, mapDispatchToProps)(Component)
