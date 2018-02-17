import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Text, Content, Form, Item, Button, Input } from "native-base";
import { StackNavigator } from "react-navigation";


export default class ListUsers extends Component<Props> {

  state = {
    userlist: null
  };

  async componentDidMount() {
    const theFetch = await fetch("https://shielded-retreat-49907.herokuapp.com/api/users");
    const theFetchJson = await theFetch.json();
    this.setState({userlist: theFetchJson.original});
  }

  render() {
    if (this.state.userlist == null)
      return null;

    var userrows = [];
    for (let user of this.state.userlist) {
      userrows.push(<Text>{user["name"]}</Text>);
      userrows.push(<Text>{user["email"]}</Text>);
    }

    return (

      <ScrollView>
        <View>
          {userrows}
        </View>
      </ScrollView>

      );
  }

}
