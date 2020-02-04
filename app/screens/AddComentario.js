import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Button, Input } from "react-native-elements";
import DatepickerRange from "react-native-range-datepicker";

export default function addComentario(props) {
  const { navigation } = props;
  const { idRestaurant } = navigation.state.params;
  const [inquilino, setInquilino] = useState("");
  const [fechaIni, setFechaini] = useState(new Date());
  const [fechaFin, setFechafin] = useState(new Date());
  const [senia, setSenia] = useState("0.0");

  return (
    <View style={styles.viewBody}>
      <View style={styles.formComentario}>
        <Input
          placeholder="Inquilino"
          containerStyle={styles.input}
          onChange={e => setInquilino(e.nativeEvent.text)}
        />
        <DatepickerRange
          placeHolderStart="Desde"
          startDate="20200101"
          untilDate="20200105"
          infoStyle={{ fontSize: 8 }}
          onConfirm={(startDate, untilDate) => (
            setFechaini({ startDate }), setFechafin({ untilDate })
          )}
        />

        <Input
          label="Seña"
          //placeholder="Seña"
          value={senia}
          keyboardType="numeric"
          type="number"
          containerStyle={styles.input}
          onChange={e => setSenia(e.nativeEvent.text)}
        />
        <Button title="Guardar" onPress={() => console.log(fechaIni)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  formComentario: {
    margin: 10,
    marginTop: 40,
    flex: 1,
    alignItems: "center"
  },
  input: {
    marginBottom: 10
  }
});
