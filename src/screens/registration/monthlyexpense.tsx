import { StyleSheet, Text, View } from 'react-native'
import React, { FC, useMemo, useState } from 'react'
import { widthToDP } from 'react-native-responsive-screens';
import Input from '@components/reusable/Input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { setField } from '@redux/user/userSlice';

const Monthlyexpense: FC = () => {

  const CATEGORIES = ['investment', 'food', 'health', 'miscellaneous'] as const;

  const dispatch = useDispatch()
  const expenseByCategory = useSelector((s: RootState) => s.user.current.expenseByCategory) || {}

  const [touched, setTouched] = useState(false);

  const handleChange = (key: string, raw: string) => {

    if (!touched) setTouched(true);
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

  const hasAnyAmount = useMemo(
    () => CATEGORIES.some(k => Number(expenseByCategory?.[k]) > 0),
    [expenseByCategory]
  );

  return (
    <View style={styles.container}>
      {CATEGORIES.map(cat => (
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
      {touched && !hasAnyAmount && (
        <Text style={styles.error}>Please enter at least one amount.</Text>
      )}
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
  },
  error: {
    color: '#FF6B6B',
    fontSize: 16,
    fontFamily: 'PlusJakartaSans-Bold',
  },
})
