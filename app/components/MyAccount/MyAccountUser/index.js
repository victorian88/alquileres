import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";
import UserInfo from "./UserInfo";
export default class MyAccountUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { goToScreen } = this.props;
    return (
      <View style={styles.viewBody}>
        <UserInfo />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewBody: {
    //flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    //paddingLeft: 30,
    //paddingRight: 30,
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
