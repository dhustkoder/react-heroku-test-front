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
import Api from "../../sys/api";

export default class ListUsers extends Component<Props> {
  static navigationOptions = {
    title: 'Usuários'
  }

  state = {
    userlist: null
  };

  componentDidMount() 
  {
    Api.get('users', (data) => this.setState({userlist: data}));
  }


  render() 
  {

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
