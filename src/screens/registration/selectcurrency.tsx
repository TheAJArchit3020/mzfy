import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { WheelPicker } from 'react-native-infinite-wheel-picker';
import { widthToDP } from 'react-native-responsive-screens';

const Selectcurrency = () => {
  interface CurrencyOption {
    id: number;
    country: string;
    label: string;   // e.g. "India (INR ₹)"
    value: string;   // e.g. "INR ₹"
    symbol: string;  // e.g. "₹"
  }

  const currencyOptions: CurrencyOption[] = [
    { id: 1, country: "India", label: "India (INR ₹)", value: "INR ₹", symbol: "₹" },
    { id: 2, country: "United States", label: "United States (USD $)", value: "USD $", symbol: "$" },
    { id: 3, country: "United Kingdom", label: "United Kingdom (GBP £)", value: "GBP £", symbol: "£" },
    { id: 4, country: "European Union", label: "European Union (EUR €)", value: "EUR €", symbol: "€" },
    { id: 5, country: "Japan", label: "Japan (JPY ¥)", value: "JPY ¥", symbol: "¥" },
    { id: 6, country: "Canada", label: "Canada (CAD $)", value: "CAD $", symbol: "$" },
    { id: 7, country: "Australia", label: "Australia (AUD $)", value: "AUD $", symbol: "$" },
    { id: 8, country: "Switzerland", label: "Switzerland (CHF CHF)", value: "CHF CHF", symbol: "CHF" },
    { id: 9, country: "China", label: "China (CNY ¥)", value: "CNY ¥", symbol: "¥" },
    { id: 10, country: "Singapore", label: "Singapore (SGD $)", value: "SGD $", symbol: "$" },
    { id: 11, country: "Mexico", label: "Mexico (MXN $)", value: "MXN $", symbol: "$" },
    { id: 12, country: "Brazil", label: "Brazil (BRL R$)", value: "BRL R$", symbol: "R$" },
    { id: 13, country: "South Africa", label: "South Africa (ZAR R)", value: "ZAR R", symbol: "R" },
    { id: 14, country: "UAE", label: "United Arab Emirates (AED د.إ)", value: "AED د.إ", symbol: "د.إ" },
    { id: 15, country: "Saudi Arabia", label: "Saudi Arabia (SAR ر.س)", value: "SAR ر.س", symbol: "ر.س" },
    { id: 16, country: "Russia", label: "Russia (RUB ₽)", value: "RUB ₽", symbol: "₽" },
    { id: 17, country: "Sweden", label: "Sweden (SEK kr)", value: "SEK kr", symbol: "kr" },
    { id: 18, country: "Norway", label: "Norway (NOK kr)", value: "NOK kr", symbol: "kr" },
    { id: 19, country: "Denmark", label: "Denmark (DKK kr)", value: "DKK kr", symbol: "kr" },
    { id: 20, country: "New Zealand", label: "New Zealand (NZD $)", value: "NZD $", symbol: "$" },
  ];

  const wheelData = currencyOptions.map(c => c.value); // array of labels

  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onChange = (index: number, value: string) => {
    setSelectedIndex(index);
    const option = currencyOptions[index];
    setSelectedCurrency(option);
    console.log('picked currency:', option);
  };

  return (
    <View style={styles.container}>
      
      <WheelPicker
        infiniteScroll={false}
        initialSelectedIndex={0}
        data={wheelData}
        restElements={3}
        elementHeight={50}
        onChangeValue={onChange}
        selectedIndex={selectedIndex}
        containerStyle={styles.containerStyle}
        selectedLayoutStyle={styles.selectedLayoutStyle}
        elementTextStyle={styles.elementTextStyle}
      />
      {/* {selectedCurrency && (
        <Text style={{ marginTop: 12, color: '#fff' }}>
          Selected: {selectedCurrency.country} — {selectedCurrency.value}
        </Text>
      )} */}
    </View>
  )
}

export default Selectcurrency

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems:"center",
    justifyContent:"center",
    flex:1
  },
  selectedLayoutStyle: {
    backgroundColor: '#454545',
    borderRadius: widthToDP(2),
  },
  containerStyle: {
    width: 120
  },
  elementTextStyle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "PlusJakartaSans-Bold"
  },
})
