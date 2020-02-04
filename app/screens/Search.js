import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { SearchBar, ListItem, Icon } from "react-native-elements";
import { FireSQL } from "firesql";
import firebase from "firebase/app";
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" });
export default function Search(props) {
  const { navigation } = props;
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (search) {
      fireSQL
        .query(`select * from restaurants where name like '${search}%'`)
        .then(response => {
          setRestaurants(response);
        });
    }
  }, [search]);
  return (
    <View>
      <SearchBar
        placeholder="Busca tu Restaurante..."
        onChangeText={e => setSearch(e)}
        value={search}
        containerStyle={styles.searchBar}
      />
      {restaurants.length === 0 ? (
        <View>
          <Text>No hay Restaurantes</Text>
        </View>
      ) : (
        <FlatList
          data={restaurants}
          renderItem={restaurant => (
            <Restaurant restaurant={restaurant} navigation={navigation} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
}
function Restaurant(props) {
  const { restaurant, navigation } = props;
  const { name } = restaurant.item;

  return (
    <ListItem
      title={name}
      rightIcon={<Icon type="material-community" name="chevron-right" />}
      onPress={() =>
        navigation.navigate("Restaurant", { restaurant: restaurant.item })
      }
    />
  );
}
const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center"
  },
  searchBar: {
    marginBottom: 20
  }
});
