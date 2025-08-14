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
import Button from "@components/reusable/button";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@redux/store";
import { setField } from "@redux/user/userSlice";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { addDebts } from "@redux/debts/debtsSlice";
import { RootStackParams } from "@managers/routing";

type DebtForm = {
  name: string;
  creditorName: string;
  principal: number;
  balance: number;
  minPaymentAmount: number;
  apr: any;
  nextDueDate: string;
  tagColor: string;
};

const initialForm: DebtForm = {
  name: "",
  creditorName: "",
  principal: 0,
  balance: 0,
  minPaymentAmount: 0,
  apr: "",
  nextDueDate: "",
  tagColor: "",
};

type Action =
  | {
    type: "SET_FIELD";
    field: keyof DebtForm;
    value: string | number;
  }
  | { type: "RESET" };

function reducer(state: DebtForm, action: Action): DebtForm {
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        [action.field]: action.value as any,
      };
    case "RESET":
      return initialForm;
    default:
      return state;
  }
}

type routeProps = RouteProp<RootStackParams, 'adddebtscreen'>;

const DebtAdd: FC = () => {

  const navigation = useNavigation();
  const route = useRoute<routeProps>();


  const dispatch = useDispatch<AppDispatch>();
  const debtArray = useSelector((s: RootState) => s.user.current.debts) ?? [];
  const currency = useSelector((state: RootState) => state.user.current?.currency)
  const currency2 = useSelector((state: RootState) => state.user.items[0]?.selectedCurrency)

  // local form state
  const [form, formDispatch] = useReducer(reducer, initialForm);


  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAprInfo, setShowAprInfo] = useState(false);
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


  const handleSave = () => {
    // build new array
    const newDebts = [
      ...debtArray,
      {
        name: form.name,
        creditorName: form.creditorName,
        principal: form.principal,
        balance: form.balance,
        minPaymentAmount: form.minPaymentAmount,
        apr: form.apr,
        nextDueDate: form.nextDueDate,
        tagColor: form.tagColor,
      },
    ];

    console.log("newDebts : ", newDebts)

    // write back into Redux
    dispatch(setField({ field: "debts", value: newDebts }));
    // clear the form
    formDispatch({ type: "RESET" });

    navigation.goBack()

  };

  const submitFormHandler = async () => {
    if (route?.params?.screen === 1) {
      handleSave();
    } else {

      console.log("form : ", form)
      try {
        await dispatch(addDebts(form)).unwrap();
        navigation.goBack();
      } catch (err) {
        console.log("Error adding user:", err);
      }
    }
  }

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
                value={form.name}
                onChangeContent={(val) =>
                  formDispatch({ type: "SET_FIELD", field: "name", value: val })
                }
                placeholder="Eg.Education Loan"
                placeholderTextColor={"#C6C6C6"}
              />
              <Input
                label="Creditor Name"
                value={form.creditorName}
                onChangeContent={(val) =>
                  formDispatch({
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
                value={form.principal}
                onChangeContent={(val) =>
                  formDispatch({
                    type: "SET_FIELD",
                    field: "principal",
                    value: val === "" ? 0 : parseFloat(val),
                  })
                }
                placeholderTextColor={"#C6C6C6"}
                textHeader={currency ? currency : currency2}
              />
              <Input
                label="Balance"
                value={form.balance}
                onChangeContent={(val) =>
                  formDispatch({ type: "SET_FIELD", field: "balance", value: val === "" ? 0 : parseFloat(val) })
                }
                textHeader={currency ? currency : currency2}
              />
              <Input
                label="Monthly Minimum (EMI)"
                value={form.minPaymentAmount}
                placeholderTextColor={"#C6C6C6"}
                onChangeContent={(val) =>
                  formDispatch({
                    type: "SET_FIELD",
                    field: "minPaymentAmount",
                    value: val === "" ? 0 : parseFloat(val),
                  })
                }
                textHeader={currency ? currency : currency2}
              />
              <View style={styles.aprContainer}>
                <Input
                  label="APR"
                  icon={
                    <InformationCircleIcon
                      size={hp(2)}
                      color={"#fff"}
                      style={{ marginBottom: hp(1.5) }}
                    />
                  }
                  onIconPress={() => setShowAprInfo((prev) => !prev)}
                  iconDisabled={false}
                  value={form.apr.toString()}
                  onChangeContent={(val) =>
                    formDispatch({ type: "SET_FIELD", field: "apr", value: val })
                  }
                  placeholder="Eg. 8"
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
                {showAprInfo && (
                  <View style={styles.aprInfoContainer}>
                    <Text style={styles.aprInfoText}>
                      APR (Annual Percentage Rate) shows the yearly cost of your
                      loan, including interest and fees.
                    </Text>
                  </View>
                )}
              </View>
              <Input
                label="Next due date"
                value={form.nextDueDate}
                onChangeContent={() => { }}
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
              {showDatePicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={form.nextDueDate ? new Date(form.nextDueDate) : new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(_, date) => {
                    setShowDatePicker(false);
                    if (date) {

                      console.log("date : ", date)
                      formDispatch({
                        type: "SET_FIELD",
                        field: "nextDueDate",
                        value: date.toISOString().split("T")[0],
                      });
                    }
                  }}
                />
              )}
              {Platform.OS === "ios" && (
                <Modal
                  visible={showDatePicker}
                  transparent
                  animationType="slide"
                  onRequestClose={() => setShowDatePicker(false)}
                >
                  <View style={styles.modalBg}>
                    {/* <View style={styles.pickerWrapper}> */}
                    <DateTimePicker
                      value={form.nextDueDate ? new Date(form.nextDueDate) : new Date()}
                      mode="date"
                      display="spinner"
                      onChange={(_, date) => {
                        if (date) {
                          formDispatch({
                            type: "SET_FIELD",
                            field: "nextDueDate",
                            value: date.toISOString().split("T")[0],
                          });
                        }
                      }}
                    />
                    <Button onPress={() => setShowDatePicker(false)} style={styles.confirmButton}>
                      <Text style={styles.buttonText}>Done</Text>
                    </Button>
                    {/* </View> */}
                  </View>
                </Modal>
              )}
              <Input
                label="Tag colour"
                value={form.tagColor}
                onChangeContent={() => { }}
                placeholder="Select a tag colour"
                placeholderTextColor={"#C6C6C6"}
                editable={false}
                children={
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {form.tagColor && (
                      <View
                        style={[
                          styles.colorIndicator,
                          { backgroundColor: form.tagColor },
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
                        formDispatch({
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
              <Button onPress={submitFormHandler} style={styles.saveButton}>
                <Text style={styles.buttonText}>Save</Text>
              </Button>
              <Button onPress={() => formDispatch({ type: "RESET" })} style={styles.cancelButton}>
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
    // flex: 1,
    // backgroundColor: "rgba(0,0,0,0.5)",
    // justifyContent: "center",
    // alignItems: "center",
    // zIndex: 0
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
  aprContainer: {},
  aprInfoContainer: {
    position: "absolute",
    backgroundColor: "#2A2A2A",
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(8),
    borderWidth: 1,
    borderColor: "#F7F7F7",
    top: hp(-6.5),
  },
  aprInfoText: {
    color: "#fff",
    fontSize: wp(3),
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "left",
  },
});

export default DebtAdd;
