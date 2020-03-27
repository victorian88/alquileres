import React, { useState, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validateEmail } from "../../utils/Validation";
import { withNavigation } from "react-navigation";
import * as firebase from "firebase";
import Loading from "../Loading";
import Toast from "react-native-easy-toast";

function LoginForm(props) {
  const toastRef = useRef();
  const { navigation } = props;
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisibleLoading, setIsVisibleLoading] = useState(false);
  const [userLogged, setUserLogged] = useState(false);

  firebase.auth().onAuthStateChanged(user => {
    user ? setUserLogged(true) : setUserLogged(false);
  });

  const login = async () => {
    setIsVisibleLoading(true);
    if (!email || !password) {
      toastRef.current.show("Todos los campos son obligatorios");
    } else {
      if (!validateEmail(email)) {
        toastRef.current.show("El email no es correcto");
      } else {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate("Restaurants");
          })
          .catch(() => {
            toastRef.current.show("Email o contraseña incorrecta");
          });
      }
    }
    setIsVisibleLoading(false);
  };

  const cerrar = async () => {
    setIsVisibleLoading(true);

    firebase
      .auth()
      .signOut()
      .then(function() {
        navigation.navigate("Login");
      })
      .catch(function(error) {
        toastRef.current.show("Error inesperado");
      });

    setIsVisibleLoading(false);
  };

  return (
    <View style={styles.formContainer}>
      {userLogged ? (
        <View>
          <Text>Sesión Iniciada</Text>

          <Button
            title="Cerrar sesión"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={cerrar}
          />
        </View>
      ) : (
        <View style={styles.formContainer2}>
          <Input
            placeholder="Correo electronico"
            containerStyle={styles.inputForm}
            onChange={e => setEmail(e.nativeEvent.text)}
            rightIcon={
              <Icon
                type="material-community"
                name="at"
                iconStyle={styles.iconRight}
              />
            }
          />
          <Input
            placeholder="Contraseña"
            containerStyle={styles.inputForm}
            password={true}
            secureTextEntry={hidePassword}
            onChange={e => setPassword(e.nativeEvent.text)}
            rightIcon={
              <Icon
                type="material-community"
                name={hidePassword ? "eye-outline" : "eye-off-outline"}
                iconStyle={styles.iconRight}
                onPress={() => setHidePassword(!hidePassword)}
              />
            }
          />
          <Button
            title="Iniciar sesión"
            containerStyle={styles.btnContainerLogin}
            buttonStyle={styles.btnLogin}
            onPress={login}
          />
          <Loading isVisible={isVisibleLoading} text="Iniciando sesión" />
          <Toast ref={toastRef} position="center" opacity={0.5} />
        </View>
      )}
    </View>
  );
}
export default withNavigation(LoginForm);

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    marginTop: 30
  },
  formContainer2: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  inputForm: {
    width: "100%",
    marginTop: 20
  },
  iconRight: {
    color: "#c1c1c1"
  },
  btnContainerLogin: {
    marginTop: 20,
    width: "95%"
  },
  btnLogin: {
    backgroundColor: "#00a680"
  }
});
