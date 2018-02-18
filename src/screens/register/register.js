import React, { Component } from "react";
import { Alert } from "react-native";
import { Text, Content, Form, Item, Button, Input,  Container } from "native-base";
import { StackNavigator } from "react-navigation";



export default class Register extends Component<Props> {

  static navigationOptions = {
      title: 'Registrar'
  }

  state = {
    login: "",
    email: "",
    pass: "",
    registerPressed: false,
    tryingToRegister: false,
    registrationFailed: false,
    registrationSucceed: false,
    registrationFailReason: null
  };

  doRegistration()
  {
    if (this.state.tryingToRegister) {
      Alert.alert("Cadastrando...");
    } else if (this.state.login != "" && this.state.email != "" && this.state.pass != "") {
      this.setState({tryingToRegister: true});
      fetch('https://shielded-retreat-49907.herokuapp.com/api/users/register', {
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
        this.setState({
          tryingToRegister: false,
          registrationFailed: responseJson.original["error"] ? true : false,
          registrationFailReason: responseJson.original["error"],
          registrationSucceed: responseJson.original["success"] ? true : false,
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          tryingToRegister: false,
          registrationFailed: true,
          registrationFailReason: error
        });
      });
    } else {
      Alert.alert("Preencha todos os campos!");
    }
  }

  componentDidUpdate() 
  {
    const { navigate } = this.props.navigation;

    if (this.state.registerPressed) {
      this.setState({registerPressed: false});
      this.doRegistration();
    } else if (this.state.registrationFailed) {
      this.setState({registrationFailed: false});
      Alert.alert(this.state.registrationFailReason);
    } else if (this.state.registrationSucceed) {
      this.setState({registrationSucceed: false});
      Alert.alert("Registro realizado com sucesso!");
      navigate("Login");
    }

  }

  render() 
  {
    const { navigate } = this.props.navigation;

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

          <Button block last onPress={() => this.setState({registerPressed: true})} style={{ margin: 15, marginTop: 15 }}>
            <Text>Registrar</Text>
          </Button>

          <Button block onPress={() => navigate("Login")} style={{ margin: 15, marginTop: 15 }}>
            <Text>Logar</Text>
          </Button>
        </Content>
        
      </Container>
    );
  }


}
