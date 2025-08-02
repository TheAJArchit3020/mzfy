import { StyleSheet, Text, View } from 'react-native'
import React, { useReducer } from 'react'
import Input from '@components/reusable/Input'
import { widthToDP } from 'react-native-responsive-screens';



const initialState = {
  name: "",

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

const Name = () => {


  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formlabel}>Your Name</Text>
        <Input
          value={state.name}
          onChangeContent={(val) =>
            dispatch({
              type: "SET_FIELD",
              field: "name",
              value: val,
            })
          }
        />
      </View>
    </View>
  )
}

export default Name

const styles = StyleSheet.create({
  container:{
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



})