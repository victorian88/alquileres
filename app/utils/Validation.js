import t from "tcomb-form-native";

export default formValidation = {
  email: t.refinement(t.String, value => {
    return /@/.test(value); //esto es para validar el email, debe tener arroba
  }),
  password: t.refinement(t.String, value => {
    return value.length >= 6;
  })
};
