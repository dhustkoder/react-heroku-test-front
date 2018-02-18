import React, { Component } from "react";
import { Alert } from "react-native";
import { Text, Content, Form, Item, Button, Input } from "native-base";
import { StackNavigator } from "react-navigation";
import styles from "./styles";


export default class Register extends Component<Props> {


  state = {
    login: "",
    email: "",
    pass: "",
    tryToRegister: false,
    fetchResponseJson: null
  };


  render() {
    const { navigate } = this.props.navigation;

    if (this.state.tryToRegister) {
      if (this.state.login != "" && this.state.email != "" && this.state.pass != "") {
        console.log("registering...");
        console.log("login: " + this.state.login);
        console.log("email: " + this.state.email);
        console.log("login: " + this.state.pass);

        fetch('https://shielded-retreat-49907.herokuapp.com/api/users', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            login: this.state.login,
            email: this.state.email,
            password:  this.state.pass
            }),
        })

        .then((response) => response.json())
        .then((responseJson) => this.setState({fetchResponseJson: responseJson}))
        .catch((error) => {
          console.error(error);
        });

        console.log(this.state.fetchResponseJson);
        this.setState({tryToRegister: false});

      } else {
        Alert.alert("Preencha todos os campos!");
        this.setState({tryToRegister: false});
      }
    }

    return (
          <Content>
            <Form>
              <Item>
                <Input onChangeText={(login) => this.setState({login})} placeholder="Usuário" />
              </Item>
              <Item>
                <Input onChangeText={(email) => this.setState({email})} placeholder="Email" />
              </Item>
              <Item last>
                <Input onChangeText={(pass) => this.setState({pass})} placeholder="Senha" secureTextEntry />
              </Item>
            </Form>

            <Button block last onPress={() => this.setState({tryToRegister: true})} style={{ margin: 15, marginTop: 15 }}>
              <Text>Registrar</Text>
            </Button>

            <Button block onPress={() => navigate("Login")} style={{ margin: 15, marginTop: 15 }}>
              <Text>Logar</Text>
            </Button>

          </Content>
    );
  }


}
