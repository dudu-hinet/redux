import React from "react"
import { Button, Text, View } from "react-native"

export interface Props {
	count: number
	fetched: string
	title: string
}
export interface Actions {
	onPress: (start: Date) => void
}
export default (props: Props & Actions): React.ReactElement => {
	return (
		<View style={{ alignItems: "center", }}>
			<Button title={props.title} onPress={() => {
				props.onPress(new Date())
			}} />
			<Text>{`props: ${props.count}`}</Text>
			<Text>{props.fetched}</Text>
		</View>
	)
}