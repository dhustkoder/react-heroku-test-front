import React, { Component } from "react";
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

    var cards = [];
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

    return (
      <Container>
        <Header>
          <Body>
            <Title>Usuários</Title>
          </Body>
        </Header>

        <Content padder>
          {cards}
        </Content>
      </Container>
      );
  }

}
