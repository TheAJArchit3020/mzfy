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
import { appEvents } from "@components/events/appEvents";

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
  const { captureEvent } = appEvents();


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


    // write back into Redux
    dispatch(setField({ field: "debts", value: newDebts }));
    // clear the form
    formDispatch({ type: "RESET" });

    navigation.goBack()

  };

  type Touched = Record<keyof DebtForm, boolean>;

  const [touched, setTouched] = useState<Touched>({
    name: false,
    creditorName: false,
    principal: false,
    balance: false,
    minPaymentAmount: false,
    apr: false,
    nextDueDate: false,
    tagColor: false,
  });

  const markTouched = (field: keyof DebtForm) =>
    setTouched(prev => ({ ...prev, [field]: true }));

  const touchAll = () =>
    setTouched({
      name: true,
      creditorName: true,
      principal: true,
      balance: true,
      minPaymentAmount: true,
      apr: true,
      nextDueDate: true,
      tagColor: true,
    });


  const errors = React.useMemo(() => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) e.name = "Debt name is required.";
    if (!form.creditorName.trim()) e.creditorName = "Creditor name is required.";
    if (!form.principal || form.principal <= 0) e.principal = "Principal is required.";
    if (!form.balance || form.balance <= 0) e.balance = "Balance is required.";
    if (!form.minPaymentAmount || form.minPaymentAmount <= 0) e.minPaymentAmount = "Monthly minimum is required.";
    if (!form.apr || String(form.apr).trim() === "") e.apr = "APR is required.";
    if (!form.nextDueDate) e.nextDueDate = "Next due date is required.";
    if (!form.tagColor) e.tagColor = "Tag colour is required.";

    return e;
  }, [form]);

  const isFormValid = React.useMemo(
    () => Object.keys(errors).length === 0,
    [errors]
  );


  const submitFormHandler = async () => {
    if (!isFormValid) return;
    if (route?.params?.screen === 1) {
      handleSave();
    } else {

      try {
        await dispatch(addDebts(form)).unwrap();
        captureEvent({
          eventName: 'add_debts',
          payload: {},
        });
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
                onBlur={() => markTouched("name")}
              />
              {touched.name && errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}

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
                onBlur={() => markTouched("creditorName")}
              />
              {touched.creditorName && errors.creditorName ? <Text style={styles.errorText}>{errors.creditorName}</Text> : null}
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
                onBlur={() => markTouched("principal")}
                textHeader={currency ? currency : currency2}
              />
              {touched.principal && errors.principal ? <Text style={styles.errorText}>{errors.principal}</Text> : null}
              <Input
                label="Balance"
                value={form.balance}
                onChangeContent={(val) =>
                  formDispatch({ type: "SET_FIELD", field: "balance", value: val === "" ? 0 : parseFloat(val) })
                }
                textHeader={currency ? currency : currency2}
              />
              {touched.principal && errors.principal ? <Text style={styles.errorText}>{errors.balance}</Text> : null}
              <Input
                label="Monthly Minimum (EMI)"
                value={form.minPaymentAmount}
                placeholderTextColor={"#C6C6C6"}
                onBlur={() => markTouched("minPaymentAmount")}
                onChangeContent={(val) =>
                  formDispatch({
                    type: "SET_FIELD",
                    field: "minPaymentAmount",
                    value: val === "" ? 0 : parseFloat(val),
                  })
                }
                textHeader={currency ? currency : currency2}
              />
              {touched.minPaymentAmount && errors.minPaymentAmount ? <Text style={styles.errorText}>{errors.minPaymentAmount}</Text> : null}
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
                  onBlur={() => markTouched("apr")}
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
                {touched.apr && errors.apr ? <Text style={styles.errorText}>{errors.apr}</Text> : null}
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
                onBlur={() => markTouched("nextDueDate")}
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
              {touched.nextDueDate && errors.nextDueDate ? <Text style={styles.errorText}>{errors.nextDueDate}</Text> : null}
              {showDatePicker && Platform.OS === "android" && (
                <DateTimePicker
                  value={form.nextDueDate ? new Date(form.nextDueDate) : new Date()}
                  mode="date"
                  display="calendar"
                  onChange={(_, date) => {
                    setShowDatePicker(false);
                    if (date) {

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
                onBlur={() => markTouched("tagColor")}
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
              {touched.tagColor && errors.tagColor ? <Text style={styles.errorText}>{errors.tagColor}</Text> : null}
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
              <Button onPress={submitFormHandler} disabled={!isFormValid} style={[styles.saveButton, !isFormValid && styles.saveButtonDisabled]}
              >
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
    marginTop: hp(10),
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
  errorText: {
    color: "red",
    fontSize: wp(3),
    fontFamily: "PlusJakartaSans-Bold",
    marginTop: hp(-1),
    marginBottom: hp(1.5),

  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  formgroup: {
    flexDirection: "column",
  }
});

export default DebtAdd;
