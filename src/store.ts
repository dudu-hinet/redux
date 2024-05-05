import { combineReducers } from "redux"
import { createLogger } from "redux-logger"
import { configureStore } from "@reduxjs/toolkit"
import ReduxThunk from "redux-thunk"

import { name as ReduxContainer_name, reducers as ReduxContainer_reducers } from "@container/ReduxContainer"

const reducers = combineReducers({
    [ReduxContainer_name]: ReduxContainer_reducers,
})
const store = configureStore({
    reducer: reducers,
    middleware: getDefaultMiddleware => {
        const custom_middlewares = getDefaultMiddleware({
            serializableCheck: {}
        })
        custom_middlewares.concat(ReduxThunk)
        if (process.env.NODE_ENV !== "production") {
            custom_middlewares.concat(createLogger({
                collapsed: true, // fold all logs.
            }))
        }

        return custom_middlewares
    }
})

const { dispatch } = store	// [only import store only]https://github.com/reduxjs/redux-toolkit/issues/687
export { dispatch, store }
