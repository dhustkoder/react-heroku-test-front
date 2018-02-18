import React, { Component } from "react";
import NativeBase from "native-base";
import App from "../App";

export default class Setup extends Component {
	state = { 
		isLoading: true 
	};

	async componentDidMount()
	{
		try {
			await Expo.Font.loadAsync({
				'Roboto': require('native-base/Fonts/Roboto.ttf'),
				'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
				'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
			});
			this.setState({isLoading: false});
		} catch (error) {
			console.error(error);
		}
	}

	render() 
	{
		return this.state.isLoading ? null : <App />;
	}
}


