import React, { Component } from "react";
import { ActivityIndicator, Alert, View } from "react-native";
import { Text, Content, Form, Item, Button, Input,  Container } from "native-base";
import { StackNavigator } from "react-navigation";
import styles from "./styles";


export default class Register extends Component<Props> {

  state = {
    login: "",
    email: "",
    pass: "",
    registerPressed: false,
    tryingToRegister: false,
  };

  doRegistration()
  {
    if (this.state.tryingToRegister)
      Alert.alert("Cadastrando...");

    if (this.state.login != "" && this.state.email != "" && this.state.pass != "") {
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
      .then((responseJson) => {
        console.log("communication done!");
        console.log(responseJson);
      })
      .catch((error) => console.error(error));
    } else {
      Alert.alert("Preencha todos os campos!");
    }
  }

  componentDidUpdate() 
  {
    if (this.state.registerPressed)  {
      this.doRegistration();
      this.setState({registerPressed: false});
    }
  }

  render() 
  {
    const { navigate } = this.props.navigation;

    var registerButton = [];

    if (this.tryingToRegister) {
      registerButton.push(
        <View key={0} style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator key={1} />
        </View>
      );
    } else {
      registerButton.push(
        <Button block last key={0} onPress={() => this.setState({registerPressed: true})} style={{ margin: 15, marginTop: 15 }}>
          <Text key={1}>Registrar</Text>
        </Button>
      );
    }

    return (
          <Container>
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

              {registerButton}

              <Button block onPress={() => navigate("Login")} style={{ margin: 15, marginTop: 15 }}>
                <Text>Logar</Text>
              </Button>

            </Content>
          </Container>
    );
  }


}
