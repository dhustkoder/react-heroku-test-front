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
    Register: { screen: Register },
    ListUsers: { screen: ListUsers },
    Login: { screen: Login },
  },

  {
    initialRouteName: "Register",
    transitionConfig: () => ({ 
      containerStyle: {
      backgroundColor: 'transparent'
      } 
    })
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


