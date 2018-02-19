import React, { Component } from "react";
import { Alert, Keyboard } from "react-native";
import { Text, Content, Form, Item, Button, Input, Container } from "native-base";
import { StackNavigator } from "react-navigation";
import Api from "../../sys/api";

export default class Login extends Component<Props> {
  static navigationOptions = {
    title: 'Logar'
  }

  state = {
    login: "",
    pass: "",
    loginPressed: false,
    tryingToLogin: false,
    loginSucceed: false,
    loginFailed: false,
    loginFailReason: null,
  };

  doLogin()
  {
    if (this.state.tryingToLogin) {
      Alert.alert("Login em andamento...");
    } else if (this.state.login != "" && this.state.pass != "") {
      this.setState({tryingToLogin: true});
      Api.post(
        'users/login',
        JSON.stringify({
          login: this.state.login,
          password:  this.state.pass,
        }),
        (data) => {
          console.log("doLogin: communication done!");
          console.log(data);
          this.setState({
          tryingToLogin: false,
          loginFailed: data['error'] ? true : false,
          loginFailReason: data['error'],
          loginSucceed: data['success'] ? true : false
          });
        });
    } else {
      Alert.alert("Preencha todos os campos!");
    }
  }

  componentDidUpdate()
  {
    const { navigate } = this.props.navigation;
    
    if (this.state.loginPressed) {
      this.doLogin();
      this.setState({loginPressed: false});
    } else if (this.state.loginFailed) {
      Alert.alert(this.state.loginFailReason);
      this.setState({loginFailed: false});
    } else if (this.state.loginSucceed) {
      navigate("Home");
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
              <Item last>
                <Input onChangeText={(pass) => this.setState({pass})} placeholder="Senha" secureTextEntry />
              </Item>
            </Form>

            <Button block onPress={() => { Keyboard.dismiss(); this.setState({loginPressed: true}); }} style={{ margin: 15, marginTop: 15 }}>
              <Text>Logar</Text>
            </Button>
            
        </Content>
      </Container>
    );
  }
}
