import React, { FC, useReducer } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Input from "../components/reusable/Input";
import Dropdown from "../components/reusable/Dropdown";
import Button from "../components/reusable/Button";

const categoryOptions = [
  { label: "Car loan", value: "car" },
  { label: "Home loan", value: "home" },
  { label: "Personal loan", value: "personal" },
  { label: "EMI", value: "emi" },
  { label: "Other", value: "other" },
];
const tagColorOptions = [
  { label: "Red", value: "red" },
  { label: "Blue", value: "blue" },
  { label: "Green", value: "green" },
  { label: "Yellow", value: "yellow" },
];

const initialState = {
  debtName: "",
  category: null as string | null,
  creditorName: "",
  currentBalance: "",
  minPayment: "",
  interestRate: "",
  annualInterestRate: "",
  nextDueDate: "",
  tagColor: "",
};

type State = typeof initialState;
type Action =
  { type: "SET_FIELD"; field: keyof State; value: any }
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

const DebtAdd: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <View style={styles.screenBg}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          <Input
            label="Debt name"
            value={state.debtName}
            onChangeContent={val => dispatch({ type: "SET_FIELD", field: "debtName", value: val })}
            placeholder="Enter debt name"
          />
          <Dropdown
            label="Category"
            options={categoryOptions}
            value={state.category}
            onChange={val => dispatch({ type: "SET_FIELD", field: "category", value: val })}
            placeholder="Select category"
          />
          <Input
            label="Creditor Name"
            value={state.creditorName}
            onChangeContent={val => dispatch({ type: "SET_FIELD", field: "creditorName", value: val })}
            placeholder="Enter creditor name"
          />
          <Input
            label="Current balance"
            value={state.currentBalance}
            onChangeContent={val => dispatch({ type: "SET_FIELD", field: "currentBalance", value: val })}
            placeholder="Enter current balance"
            type="number"
          />
          <Input
            label="Min payment amount"
            value={state.minPayment}
            onChangeContent={val => dispatch({ type: "SET_FIELD", field: "minPayment", value: val })}
            placeholder="Enter min payment"
            type="number"
          />
          <Input
            label="Annual interest rate"
            value={state.annualInterestRate}
            onChangeContent={val => dispatch({ type: "SET_FIELD", field: "annualInterestRate", value: val })}
            placeholder="Enter interest rate"
            type="number"
          />
          <Input
            label="Next due date"
            value={state.nextDueDate}
            onChangeContent={val => dispatch({ type: "SET_FIELD", field: "nextDueDate", value: val })}
            placeholder="Next due date"
          />
          <Dropdown
            label="Select a tag colour"
            options={tagColorOptions}
            value={state.tagColor}
            onChange={val => dispatch({ type: "SET_FIELD", field: "tagColor", value: val })}
            placeholder="Select a tag colour"
          />
          <Button
            title="Save"
            onPress={() => {}}
            style={styles.saveButton}
          />
          <Button
            title="Cancel"
            onPress={() => dispatch({ type: "RESET" })}
            style={styles.cancelButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenBg: {
    flex: 1,
    backgroundColor: "#23234B",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
  },
  card: {
    width: "92%",
    backgroundColor: "#2C2C54",
    borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    marginTop: 16,
  },
  cancelButton: {
    backgroundColor: "#444",
    marginTop: 0,
  },
});

export default DebtAdd;
