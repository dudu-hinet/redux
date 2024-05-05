/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react"
import { SafeAreaView } from "react-native"
import { Provider } from "react-redux"

import { store } from "@store"
import ReduxContainer from "@container/ReduxContainer"
import ReactComponent from "@component/ReactComponent"

export default (): React.JSX.Element => {
	const [count, set_count] = React.useState(0)
	const [fetched, set_fetched] = React.useState("not fetched")

	return (
		<Provider store={store} >
			<SafeAreaView>
				<ReactComponent count={count} fetched={fetched} title="React" onPress={start => {
					const c = count + 1	// setTimeout will keep the original value
					set_count(c)
					set_fetched("fetching")
					setTimeout(() => {
						if (c % 2) {
							set_fetched(`fetch success \n count: ${c} \n start at: ${start.toISOString()} \n latency: ${new Date().getTime() - start.getTime()}`)

						} else {
							set_fetched(`fetch error \n count: ${c} \n start at: ${start.toISOString()} \n latency: ${new Date().getTime() - start.getTime()}`)
						}
					}, 1000)
				}} />
				{/*
					react + redux
					step by step: https://chentsulin.github.io/redux/
					react-redux Provider allows containers to retrieve from reducer separately. Otherwise pass props to each component.
				*/}
				<ReduxContainer />
			</SafeAreaView>
		</Provider>

	)
}
