import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { Button, Input } from "react-native-elements";
import DatepickerRange from "react-native-range-datepicker";

export default function addComentario(props) {
  const { navigation } = props;
  const { idRestaurant } = navigation.state.params;
  const [inquilino, setInquilino] = useState("");
  const [fechaIni, setFechaini] = useState(new Date());
  const [fechaFin, setFechafin] = useState(new Date());
  const [senia, setSenia] = useState("0.0");
  const [pago, setPago] = useState("0.0");
  const [numero, setNumero] = useState("");

  return (
    //<View style={styles.viewBody}>
    <ScrollView maximumZoomScale={0.5}>
      <View style={styles.formComentario}>
        <Input
          style={styles.input}
          label="Inquilino"
          containerStyle={styles.input}
          onChange={e => setInquilino(e.nativeEvent.text)}
        />
        <Input
          style={styles.input}
          label="Teléfono"
          containerStyle={styles.input}
          onChange={e => setIsetNumero(e.nativeEvent.text)}
        />
        <View style={{ flex: 0.5, height: 300 }}>
          <DatepickerRange
            placeHolderStart="Desde"
            startDate="20200101"
            untilDate="20200105"
            infoStyle={{ fontSize: 8 }}
            infoContainerStyle={{
              marginRight: 20,
              paddingHorizontal: 20,
              paddingVertical: 5,
              backgroundColor: "green",
              borderRadius: 20,
              alignSelf: "stretch"
            }}
            onConfirm={(startDate, untilDate) => (
              setFechaini({ startDate }), setFechafin({ untilDate })
            )}
          />
        </View>
        <Input
          label="Seña"
          //placeholder="Seña"
          value={senia}
          keyboardType="numeric"
          type="number"
          containerStyle={styles.input}
          onChange={e => setSenia(e.nativeEvent.text)}
        />
        <Input
          label="Pago"
          //placeholder="Seña"
          value={pago}
          keyboardType="numeric"
          type="number"
          containerStyle={styles.input}
          onChange={e => setPago(e.nativeEvent.text)}
        />
        <Button title="Guardar" onPress={() => console.log(fechaIni)} />
      </View>
    </ScrollView>
    //  </View>
  );
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  formComentario: {
    margin: 10,
    marginTop: 5,
    //flex: 1,
    alignItems: "center"
  },
  input: {
    marginBottom: 2
  }
});
