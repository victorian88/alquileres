import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";

export default class MyAccountGuest extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goToScreen } = this.props;
    return (
      <View style={styles.viewBody}>
        <Image
          style={styles.image}
          source={require("../../../assets/img/guest.jpg")}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Text style={styles.title}> Consulta tu perfil</Text>
        <Text style={styles.description}>
          Cómo describirias tu mejor Restaurante?
        </Text>
        <Button
          buttonStyle={styles.btnViewProfile}
          title="Ver tu Perfil"
          onPress={() => goToScreen("Login")}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30
  },
  image: {
    height: 300,
    width: 250,
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10
  },
  btnViewProfile: {
    //width: "80%",
    backgroundColor: "#00a680",
    justifyContent: "center"
  },
  description: {
    marginBottom: 10
  }
});
