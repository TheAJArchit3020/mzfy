import React, { FC, use, useEffect, useReducer, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Modal,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Input from "../components/reusable/Input";
import Dropdown from "../components/reusable/dropdown";
import Button from "@components/reusable/Button";
import Header from "@components/reusable/header";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import DateTimePicker from "@react-native-community/datetimepicker";
import ColorPicker from "react-native-wheel-color-picker";
import {
  CalendarDaysIcon,
  EyeDropperIcon,
  InformationCircleIcon,
} from "react-native-heroicons/solid";
import { Text } from "react-native";

const initialState = {
  debtName: "",
  creditorName: "",
  principal: "",
  balance: "",
  minPayment: "",
  apr: "",
  nextDueDate: "",
  tagColor: "",
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

const DebtAdd: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [enableKeyBoardAvoidingView, setenableKeyBoardAvoidingView] =
    useState(false);

  useEffect(() => {
    const KeyBoardEnabled = Keyboard.addListener("keyboardDidShow", () => {
      setenableKeyBoardAvoidingView(true);
    });

    const KeyBoardDisabeled = Keyboard.addListener("keyboardDidHide", () => {
      setenableKeyBoardAvoidingView(false);
    });

    return () => {
      KeyBoardEnabled.remove();
      KeyBoardDisabeled.remove();
    };
  }, []);

  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.screenBg}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={"padding"}
          enabled={enableKeyBoardAvoidingView}
        >
          <Header title={"Add a Debt"} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.inputContainer}>
              <Input
                label="Debt name"
                value={state.debtName}
                onChangeContent={(val) =>
                  dispatch({ type: "SET_FIELD", field: "debtName", value: val })
                }
                placeholder="Eg.Education Loan"
                placeholderTextColor={"#C6C6C6"}
              />
              <Input
                label="Creditor Name"
                value={state.creditorName}
                onChangeContent={(val) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "creditorName",
                    value: val,
                  })
                }
                placeholder="Eg.Axis Bank"
                placeholderTextColor={"#C6C6C6"}
              />
              <Input
                label="Principal"
                value={state.principal}
                onChangeContent={(val) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "principal",
                    value: val,
                  })
                }
                placeholderTextColor={"#C6C6C6"}
                textHeader="₹"
              />
              <Input
                label="Balance"
                value={state.balance}
                onChangeContent={(val) =>
                  dispatch({ type: "SET_FIELD", field: "balance", value: val })
                }
                textHeader="₹"
              />
              <Input
                label="Monthly Minimum (EMI)"
                value={state.minPayment}
                placeholderTextColor={"#C6C6C6"}
                onChangeContent={(val) =>
                  dispatch({
                    type: "SET_FIELD",
                    field: "minPayment",
                    value: val,
                  })
                }
                textHeader="₹"
              />
              <Input
                label="APR"
                icon={
                  <InformationCircleIcon
                    size={hp(2)}
                    color={"#fff"}
                    style={{ marginBottom: hp(1.5) }}
                  />
                }
                value={state.apr}
                onChangeContent={(val) =>
                  dispatch({ type: "SET_FIELD", field: "apr", value: val })
                }
                placeholder="Eg. 8"
                keyboardType="numeric"
                placeholderTextColor={"#C6C6C6"}
                children={
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: wp(4.5),
                      marginLeft: wp(1),
                    }}
                  >
                    %
                  </Text>
                }
              />
              <Input
                label="Next due date"
                value={state.nextDueDate}
                onChangeContent={() => {}}
                placeholder="Eg.02/08/2025"
                editable={false}
                placeholderTextColor={"#C6C6C6"}
                children={
                  <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <CalendarDaysIcon
                      color="#fff"
                      size={wp(5)}
                      style={{ marginLeft: wp(1) }}
                    />
                  </TouchableOpacity>
                }
              />
              <Modal visible={showDatePicker} transparent animationType="fade">
                <View style={styles.modalBg}>
                  <DateTimePicker
                    value={
                      state.nextDueDate
                        ? new Date(state.nextDueDate)
                        : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(event, date) => {
                      setShowDatePicker(false);
                      if (date) {
                        dispatch({
                          type: "SET_FIELD",
                          field: "nextDueDate",
                          value: date.toISOString().split("T")[0],
                        });
                      }
                    }}
                  />
                </View>
              </Modal>
              <Input
                label="Tag colour"
                value={state.tagColor}
                onChangeContent={() => {}}
                placeholder="Select a tag colour"
                placeholderTextColor={"#C6C6C6"}
                editable={false}
                children={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {state.tagColor && (
                      <View
                        style={[
                          styles.colorIndicator,
                          { backgroundColor: state.tagColor },
                        ]}
                      />
                    )}
                    <TouchableOpacity onPress={() => setShowColorPicker(true)}>
                      <EyeDropperIcon
                        color="#fff"
                        size={wp(5)}
                        style={{ marginLeft: wp(1) }}
                      />
                    </TouchableOpacity>
                  </View>
                }
              />
              <Modal visible={showColorPicker} transparent animationType="fade">
                <View style={styles.modalBg}>
                  <View style={styles.colorPickerContainer}>
                    <ColorPicker
                      onColorChange={(color) => {
                        dispatch({
                          type: "SET_FIELD",
                          field: "tagColor",
                          value: color,
                        });
                      }}
                      thumbSize={30}
                      sliderSize={30}
                      noSnap={true}
                      row={false}
                      useNativeDriver={true}
                    />
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => setShowColorPicker(false)}
                    >
                      <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal>
              <Button onPress={() => {}} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </Button>
              <Button onPress={() => {}} style={styles.cancelButton}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Button>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  screenBg: {
    flex: 1,
  },
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    marginTop: hp(2),
    width: "100%",
    paddingHorizontal: wp(5),
    paddingBottom: hp(5),
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: "#006FFF",
    paddingVertical: wp(3),
    alignItems: "center",
    borderRadius: wp(5),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: hp(12),
  },
  cancelButton: {
    marginTop: hp(2),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
  },
  colorPickerContainer: {
    height: hp(60),
    padding: wp(5),
    alignItems: "center",
    width: "100%",
  },
  confirmButton: {
    backgroundColor: "#006FFF",
    paddingVertical: wp(3),
    paddingHorizontal: hp(3),
    alignItems: "center",
    borderRadius: wp(5),
    marginTop: hp(2),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
  },
  colorIndicator: {
    width: wp(3),
    height: wp(3),
    borderRadius: wp(1.5),
    marginRight: wp(1),
  },
});

export default DebtAdd;
