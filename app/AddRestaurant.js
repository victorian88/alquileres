import React, { useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Toast from "react-native-easy-toast";
import Loading from "../components/loading";
import AddRestaurantForm from "../app/components/AddRestaurantForm";
export default function AddRestaurant(props) {
  const { navigation } = props;
  const { setIsReloadRestaurants } = navigation.state.params;
  const toastRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <View style={styles.container}>
      <AddRestaurantForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
        setIsReloadRestaurants={setIsReloadRestaurants}
      />

      <Toast ref={toastRef} position="center" opacity={0.5} />
      <Loading isVisible={isLoading} text="Creando Propiedad" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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
