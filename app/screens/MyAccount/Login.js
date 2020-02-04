import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image, Button, Divider, SocialIcon } from "react-native-elements";
import { ActivityIndicator } from "react-native";
import t from "tcomb-form-native";
const Form = t.form.Form;
import { LoginStruct, LoginOptions } from "../../forms/Login";
import * as firebase from "firebase";
import Toast, { DURATION } from "react-native-easy-toast";
import { FacebookApi } from "../../utils/Social";
import * as Facebook from "expo-facebook";
//import Expo from "expo";

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      loginData: {
        email: "",
        password: ""
      },
      loginErrorMessage: ""
    };
  }
  login = () => {
    const validate = this.refs.loginForm.getValue();
    if (!validate) {
      this.setState({
        loginErrorMessage: "Los datos son incorrectos"
      });
    } else {
      this.setState({ loginErrorMessage: "" });
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(() => {
          this.refs.toastLogin.show("Login correcto", 200, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(error => {
          this.refs.toastLogin.show("Login incorrecto", 2500);
        });
    }
  };
  loginFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.application_id,
      {
        permissions: FacebookApi.permissions
      }
    );
    if (type == "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          this.refs.toastLogin.show("Login Correcto", 100, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(err => {
          this.refs.toastLogin.show("Error accediendo con Facebook", 300);
        });
    } else if (type == "cancel") {
      this.refs.toastLogin.show("Inicio de sesión cancelado", 300);
    } else {
      this.refs.toastLogin.show("Error Desconocido", 300);
    }
  };

  goToScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };
  onChangeFormLogin = formValue => {
    this.setState({
      loginData: {
        email: formValue.email,
        password: formValue.password
      }
    });
  };
  render() {
    const { loginStruct, loginOptions, loginErrorMessage } = this.state;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.viewForm}>
          <Form
            ref="loginForm"
            type={loginStruct}
            options={loginOptions}
            value={this.state.loginData}
            onChange={formValue => this.onChangeFormLogin(formValue)}
          />
          <Button
            buttonStyle={styles.buttonLoginContainer}
            title="Login"
            onPress={() => this.login()}
          />

          <Text style={styles.textRegister}>
            Aún no tienes una cuenta?
            <Text
              style={styles.btnRegister}
              onPress={() => this.goToScreen("Register")}
            >
              {" "}
              Registrate
            </Text>
          </Text>
          <Text style={styles.loginErrorMessage}>{loginErrorMessage}</Text>
          <Divider style={styles.divider} />
          <SocialIcon
            title="Iniciar sesión Facebook"
            button
            type="facebook"
            onPress={() => this.loginFacebook()}
          />
        </View>
        <Toast
          ref="toastLogin"
          position="bottom"
          positionValue={280}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    // justifyContent: "center",
    //alignItems: "center",
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30
  },
  logo: {
    width: 250,
    height: 150
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  viewForm: {
    marginTop: 30
  },
  containerLogo: {
    alignItems: "center",
    alignContent: "center",
    marginLeft: 35,
    marginRight: 30
  },
  loginErrorMessage: {
    color: "red",
    textAlign: "center",
    marginTop: 18,
    marginBottom: 5
  },
  divider: {
    backgroundColor: "blue",
    marginBottom: 20,
    height: 1
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
