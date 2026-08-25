import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useReducer, useState } from 'react'
import Input from '@components/reusable/Input'
import { widthToDP } from 'react-native-responsive-screens';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/store';
import { setField } from '@redux/user/userSlice';




const Name: FC = () => {


  const dispatch = useDispatch()
  const name = useSelector((state: RootState) => state.user.current.name)

  const [touched, setTouched] = useState(false);
  const empty = (name ?? '').trim().length === 0;

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.formlabel}>Your Name</Text>
        <Input
          value={name}
          onChangeContent={(val: string) => {
            if (!touched) setTouched(true);
            dispatch(setField({ field: 'name', value: val }))
          }
          }
        />
        {touched && empty && <Text style={styles.error}>This field is required.</Text>}

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
  error: {
    color: "#FF6B6B",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold"
  },




})