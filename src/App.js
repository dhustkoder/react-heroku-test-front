import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, ImageBackground, View, StatusBar, Dimensions, Platform } from "react-native";
import { Container, H3, Text, Content, Form, Item, Button, Input } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";


// routes
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Home from "./screens/home/home"
import ListUsers from "./screens/listusers/listusers";
// end routes

const launchscreenBg = require("../assets/launchscreen-bg.png");


const AppNavigator = StackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    Home: { screen: Home },
    ListUsers: { screen: ListUsers },
  },

  {
    initialRouteName: "Register"
    
  }
);

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    width: null,
    height: null
  },
});


export default class App extends Component {
	render() 
  {
    return (
      <Container>
        <StatusBar barStyle="light-content" />
            <ImageBackground source={launchscreenBg} style={styles.imageContainer}>
              <AppNavigator />
            </ImageBackground>
      </Container>
      );
	}
}


