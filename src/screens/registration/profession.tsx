import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC, useState } from 'react'
import { widthToDP } from 'react-native-responsive-screens';
import { useDispatch, useSelector } from 'react-redux';
import { setField } from '@redux/user/userSlice';
import { RootState } from '@redux/store';

const Profession: FC = () => {

  const dispatch = useDispatch()
  const selectedprofession = useSelector((state: RootState) => state.user.current.profession)

  const option = [
    { id: 1, label: "Government Employee", value: "Government Employee" },
    { id: 2, label: "Banker / Financial Analyst", value: "Banker / Financial Analyst" },
    { id: 3, label: "Software Engineer / IT Professional", value: "Software Engineer / IT Professional" },
    { id: 4, label: "Doctor / Medical Professional", value: "Doctor / Medical Professional" },
    { id: 5, label: "HR / Recruiter", value: "HR / Recruiter" },
    { id: 6, label: "Marketing / Sales Executive", value: "Marketing / Sales Executive" },
    { id: 7, label: "Others", value: "Others" },
  ]



  const handleSelect = (val: string) => {
    console.log('Selected profession:', val);
    dispatch(setField({ field: 'profession', value: val }))
  };

  return (


    <View style={styles.container}>
      <View style={styles.containerWrapper} >
        {option.map(opt => {
          const isSelected = selectedprofession === opt.value;
          return (
            <TouchableOpacity
              key={opt.id}
              style={styles.optionRow}
              activeOpacity={0.7}
              onPress={() => handleSelect(opt.value)}
            >
              <View style={styles.radioWrapper}>
                <View style={[styles.outer, isSelected && styles.outerSelected]}>
                  {isSelected && <View style={styles.inner} />}
                </View>
              </View>
              <View style={styles.titleGroup}>
                <Text style={styles.title} numberOfLines={1}>
                  {opt.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}

      </View>
    </View>


  )
}

export default Profession

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontFamily: "PlusJakartaSans-Bold",
  },

  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
    borderWidth: 0.5,
    padding: widthToDP(2),
    borderRadius: 12,
    borderColor: "#C0C0C0"
  },
  radioWrapper: {
    padding: 4,
  },
  outer: {
    width: 16,
    height: 16,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
  },
  outerSelected: {
    borderColor: '#006FFF',
  },
  inner: {
    width: 9,
    height: 9,
    borderRadius: 6,
    backgroundColor: '#006FFF',
  },
  titleGroup: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'PlusJakartaSans-Bold',
  },
  containerWrapper: {
  }


})