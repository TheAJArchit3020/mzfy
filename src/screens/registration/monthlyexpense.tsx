import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { widthToDP } from 'react-native-responsive-screens';
import Input from '@components/reusable/Input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setField } from '@redux/user/userSlice';

const Monthlyexpense: FC = () => {
  const dispatch = useDispatch()
  const expenseByCategory = useSelector((s: RootState) => s.user.current.expenseByCategory) || {}

  const handleChange = (key: string, raw: string) => {
    // remove any non-digit/non-dot, and ensure only one dot
    let sanitized = raw.replace(/[^0-9.]/g, '')
    const parts = sanitized.split('.')
    if (parts.length > 2) {
      // more than one dot? keep first dot only
      sanitized = parts.shift()! + '.' + parts.join('')
    }
    // parse to float, or 0 if empty
    const num = sanitized === '' ? 0 : parseFloat(sanitized)
    dispatch(
      setField({
        field: 'expenseByCategory',
        value: { ...expenseByCategory, [key]: num },
      })
    )
  }

  return (
    <View style={styles.container}>
      {(['investment', 'food', 'health', 'miscellaneous'] as const).map(cat => (
        <View style={styles.form} key={cat}>
          <Text style={styles.formlabel}>
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </Text>
          <Input
            placeholder={`e.g. 30000`}
            placeholderTextColor="#C6C6C6"
            keyboardType="decimal-pad"
            value={
              expenseByCategory[cat] != null
                ? expenseByCategory[cat].toString()
                : ''
            }
            onChangeContent={val => handleChange(cat, val)}
            style={styles.input}
          />
        </View>
      ))}
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
