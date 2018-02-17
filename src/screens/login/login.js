import React, { Component } from "react";
import { Text, Content, Form, Item, Button, Input } from "native-base";
import { StackNavigator } from "react-navigation";
import styles from "./styles";


export default class Login extends Component<Props> {
  render() {
    const { navigate } = this.props.navigation;
    return (
          <Content>
          <Form>
            <Item>
              <Input placeholder="Usuário" />
            </Item>
            <Item last>
              <Input placeholder="Senha" secureTextEntry />
            </Item>
          </Form>

          <Button block style={{ margin: 15, marginTop: 15 }}>
            <Text>Logar</Text>
          </Button>

          <Button block last onPress={() => navigate("Register")} style={{ margin: 15, marginTop: 15 }}>
            <Text>Registrar</Text>
          </Button>

        </Content>
    );
  }
}
