import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Flatlist } from "react-native";
import { Button } from "react-native-elements";

export default function Comentarios(props) {
  const { navigation, idRestaurant } = props;

  return (
    <View>
      <Button
        buttonStyle={styles.btnAddComentario}
        titleStyle={styles.btnTitleAddComentario}
        title="Añadir reserva"
        icon={{
          type: "material-community",
          name: "square-edit-outline",
          color: "#00a680"
        }}
        onPress={() =>
          navigation.navigate("AddComentario", {
            idRestaurant: idRestaurant
          })
        }
      />
      <Text>Lista de alquileres...</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  btnAddComentario: {
    backgroundColor: "transparent"
  },
  btnTitleAddComentario: {
    color: "#00a680"
  }
});
