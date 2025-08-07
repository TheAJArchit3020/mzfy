import { StyleSheet, Text, View } from 'react-native'
import React, { useReducer } from 'react'
import Input from '@components/reusable/Input'
import { widthToDP } from 'react-native-responsive-screens';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { setField } from '@redux/user/userSlice';




const Name = () => {


  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.user.current.name)

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formlabel}>Your Name</Text>
        <Input
          value={name}
          onChangeContent={(val: string) =>
            dispatch(setField({ field: 'name', value: val }))
          }
        />
      </View>
    </View>
  )
}

export default Name

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



})