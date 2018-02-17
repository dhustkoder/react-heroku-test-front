import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, ImageBackground, View, StatusBar, Dimensions, Platform } from "react-native";
import { Container, H3, Text, Content, Form, Item, Button, Input } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";


// routes
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import ListUsers from "./screens/listusers/listusers";
// end routes


const deviceHeight = Dimensions.get("window").height;

const launchscreenBg = require("../assets/launchscreen-bg.png");

const AppNavigator = StackNavigator(
  {
    ListUsers: { screen: ListUsers },
    Login: { screen: Login },
    Register: { screen: Register },
  },
  {
    initialRouteName: "ListUsers",
    headerMode: "none"
  }
);


const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
  text: {
    color: "#FFFFFF",
    marginTop: deviceHeight / 4,
    textAlign: 'center'
  }
});

export default class App extends Component {
  
  state = { 
    fontLoaded: false 
  };

  async componentDidMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({fontLoaded: true});
  }


	render() {
    if (!this.state.fontLoaded)
      return null;
    return (
      <Container>
        <StatusBar barStyle="light-content" />
          <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
            <Text style={styles.text}>Logue para listar usuários registrados</Text>
            <AppNavigator />
          </ImageBackground>
    </Container>);
	}
}


