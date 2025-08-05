import { StyleSheet, Text, View } from 'react-native'
import React, { useReducer } from 'react'
import { widthToDP } from 'react-native-responsive-screens';
import Input from '@components/reusable/Input';


const initialState = {
  investment: "",
  food: "",
  health: "",
  miscellaneous: "",
};

type State = typeof initialState;
type Action =
  | { type: "SET_FIELD"; field: keyof State; value: any }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}
const Monthlyexpense = () => {

  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formlabel}>Investment</Text>
        <Input
          placeholder='Eg.₹ 30,000'
          placeholderTextColor={"#C6C6C6"}
          value={state.investment}
          onChangeContent={(val) =>
            dispatch({
              type: "SET_FIELD",
              field: "investment",
              value: val,
            })
          }
          style={styles.input}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.formlabel}>Food</Text>
        <Input
          placeholder='Eg.₹ 30,000'
          placeholderTextColor={"#C6C6C6"}
          value={state.food}
          onChangeContent={(val) =>
            dispatch({
              type: "SET_FIELD",
              field: "food",
              value: val,
            })
          }
          style={styles.input}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.formlabel}>Health</Text>
        <Input
          placeholder='Eg.₹ 30,000'
          placeholderTextColor={"#C6C6C6"}
          value={state.health}
          onChangeContent={(val) =>
            dispatch({
              type: "SET_FIELD",
              field: "health",
              value: val,
            })
          }
          style={styles.input}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.formlabel}>Miscellaneous</Text>
        <Input
          placeholder='Eg.₹ 30,000'
          placeholderTextColor={"#C6C6C6"}
          value={state.miscellaneous}
          onChangeContent={(val) =>
            dispatch({
              type: "SET_FIELD",
              field: "miscellaneous",
              value: val,
            })
          }
          style={styles.input}
        />
      </View>
    </View>
  )
}

export default Monthlyexpense

const styles = StyleSheet.create({
  container: {
    padding: widthToDP(5)
  },
  formlabel: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    color: "#fff"
  },

  form: {
    flexDirection: "column",
    gap: 16
  },
  input: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: widthToDP(3.5)
  }

})