import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useState } from 'react'
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { widthToDP } from 'react-native-responsive-screens';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '@redux/user/userSlice';
import { RootState } from '@redux/store';


const Age: FC = () => {

  const initialData: number[] = Array.from({ length: 100 }, (_, i) => i + 1);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const dispatch = useDispatch()
  const age = useSelector((state: RootState) => state.user.current.age)

  

  return (
    <View style={styles.container}>
      <WheelPicker
        infiniteScroll={false}
        initialSelectedIndex={0}
        data={initialData}
        restElements={2}
        elementHeight={50}
        onChangeValue={(index, value) => {
          console.log(value)
          dispatch(setField({ field: 'age', value: value }))
          setSelectedIndex(index);
        }}
        selectedIndex={selectedIndex}
        containerStyle={styles.containerStyle}
        selectedLayoutStyle={styles.selectedLayoutStyle}
        elementTextStyle={styles.elementTextStyle}
      />
    </View>
  )
}

export default Age

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedLayoutStyle: {
    backgroundColor: '#454545',
    borderRadius: widthToDP(2),
  },
  containerStyle: {
    width: 120
  },
  elementTextStyle: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold"
  },
})