import React, { Component } from "react";
import { Text, Content, Form, Item, Button, Input } from "native-base";
import { StackNavigator } from "react-navigation";

export default class Home extends Component<Props> {
  static navigationOptions = {
    title: 'Home'
  }

  render() 
  {
    const { navigate } = this.props.navigation;

    return (
      
        <Content>

          <Button block onPress={() => navigate("ListUsers")} style={{ margin: 15, marginTop: 15 }}>
            <Text>Listar usuários registrados</Text>
          </Button>
          
        </Content>
    );
  }
}
