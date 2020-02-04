import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Overlay, Input, Button } from "react-native-elements";

// create a component
export default class OverlayOneInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props
    };
  }
  onChangeInput = inputData => {
    this.setState({
      inputValue: inputData
    });
  };
  update = () => {
    const newValue = this.state.inputValue;
    this.state.updateFunction(newValue);
    this.setState({
      isVisibleOverlay: false
    });
  };
  render() {
    const { isVisibleOverlay, placeholder, inputValue } = this.state;
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
        fullScreen={true}
      >
        <View style={styles.viewOverlay}>
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholder}
            onChangeText={value => this.onChangeInput(value)}
            value={inputValue}
          />
          <Button
            buttonStyle={styles.buttonUpdate}
            title="Actualizar"
            onPress={() => this.update()}
          />
        </View>
      </Overlay>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  viewOverlay: {
    width: "100%",
    backgroundColor: "#fff"
  },
  inputContainer: {
    marginBottom: 20
  },
  buttonUpdate: {
    backgroundColor: "#00a680"
  }
});
