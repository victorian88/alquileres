import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  AsyncStorage,
  Keyboard,
  Navigator
} from "react-native";
import List from "./List";
import { Input } from "react-native-elements";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import uuid from "uuid/v5";
import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export default function AddRestaurantForm(props) {
  const { toastRef, setIsLoading, navigation, setIsReloadRestaurants } = props;
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");

  // const [list] = useState("");
  const saveData = () => {
    setIsLoading(true);
    db.collection("restaurants")
      .add({
        name: restaurantName,
        direccion: restaurantAddress,
        createAt: new Date(),
        rating: 0
      })
      .then(() => {
        setIsLoading(false);
        setIsReloadRestaurants(true);
        navigation.navigate("Restaurants");
      })
      .catch(() => {
        toastRef.current.setIsLoading(false);
        show(" Error al subir los datos");
      });
  };

  return (
    <ScrollView>
      <FormAdd
        setRestaurantName={setRestaurantName}
        setRestaurantAddress={setRestaurantAddress}
      />
      <Button title="Guardar" onPress={saveData} />
    </ScrollView>
  );
}
function FormAdd(props) {
  const { setRestaurantAddress, setRestaurantName } = props;
  return (
    <View style={StyleSheet.viewForm}>
      <Input
        placeholder="Nombre del Restaurante"
        containerStyle={styles.input}
        //value={restaurantName}
        onChange={e => setRestaurantName(e.nativeEvent.text)}
        // onChangeText ={restaurantname=> this.setState({restaurantname})}
      />
      <Input
        placeholder="Dirección"
        containerStyle={styles.input}
        // value={restaurantAddress}
        onChange={e => setRestaurantAddress(e.nativeEvent.text)}
        //  onChangeText ={direccion=> this.setState({direccion})}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  viewForm: {
    flex: 1,
    padding: 10,
    marginLeft: 10,
    marginRight: 10
  },
  input: {
    marginBottom: 10
  }
});
