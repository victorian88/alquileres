import React from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { Rating } from "react-native-elements";
import Comentarios from "../components/Comentarios";
export default function Restaurant(props) {
  const { navigation } = props;
  const { restaurant } = navigation.state.params.restaurant.item;

  return (
    <ScrollView>
      <TitleRestaurant
        name={restaurant.name}
        direccion={restaurant.direccion}
        rating={restaurant.rating}
      />
      <Comentarios navigation={navigation} idRestaurant={restaurant.id} />
    </ScrollView>
  );
}
function TitleRestaurant(props) {
  const { name, direccion, rating } = props;
  return (
    <View styles={styles.viewRestaurantTitle}>
      <View styles={{ flexDirection: "row" }}>
        <Text style={styles.nameRestaurant}> {name} </Text>
        <Rating
          style={styles.rating}
          imageSize={20}
          readonly
          startingValue={parseFloat(rating)}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewRestaurantTitle: {
    margin: 15
  },
  nameRestaurant: {
    fontSize: 20,
    fontWeight: "bold"
  },
  rating: {
    position: "absolute",
    right: 0
  }
});
