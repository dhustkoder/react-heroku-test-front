import React, { Component } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from "native-base";
import { StackNavigator } from "react-navigation";


export default class ListUsers extends Component<Props> {
  static navigationOptions = {
    title: 'Usuários'
  }

  state = {
    userlist: null
  };

  async componentDidMount() {
    try {
      const theFetch = await fetch("https://shielded-retreat-49907.herokuapp.com/api/users");
      const theFetchJson = await theFetch.json();
      this.setState({userlist: theFetchJson.original});
    } catch (error) {
      console.error(error);
    }
  }


  render() {

    var cards = [];
    if (this.state.userlist != null) {
      var k = 0;
      for (let user of this.state.userlist) {
        cards.push(
          <Card key={k++}>
            <CardItem key={k++}>
              <Body key={k++}>
                <Text key={k++}>Login: {user["name"]}</Text>
                <Text key={k++}>Email: {user["email"]}</Text>
              </Body>
            </CardItem>
          </Card>
          );
      }
    } else {
      cards.push(
        <View key={0} style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator key={1} />
        </View>
        );
    }

    return (
      <Container>
        <Content padder>
          {cards}
        </Content>
      </Container>
      );

  }

}
