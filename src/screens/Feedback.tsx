import React, { useReducer, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import Header from "@components/reusable/header";
import Input from "@components/reusable/Input";
import RadioInput from "@components/reusable/radioinput";
import Button from "@components/reusable/button";
import { Cog6ToothIcon, StarIcon } from "react-native-heroicons/solid";

// Feedback form state interface
interface FeedbackState {
  challenges: challengePayload;
  features: string[];
  trackingFrequency: string | null;
  mainGoal: string;
  confidenceRating: number;
  premiumFeature: string | null;
  additionalFeedback: string;
}

type challengePayload = {
  payload: string;
  isOtherSelected: boolean;
};
// Action types for useReducer
type FeedbackAction =
  | { type: "SET_CHALLENGES"; payload: challengePayload }
  | { type: "SET_FEATURES"; payload: string[] }
  | { type: "SET_TRACKING_FREQUENCY"; payload: string }
  | { type: "SET_MAIN_GOAL"; payload: string }
  | { type: "SET_CONFIDENCE_RATING"; payload: number }
  | { type: "SET_PREMIUM_FEATURE"; payload: string }
  | { type: "SET_ADDITIONAL_FEEDBACK"; payload: string }
  | { type: "RESET_FORM" };

// Initial state
const initialState: FeedbackState = {
  challenges: { payload: "", isOtherSelected: false },
  features: [],
  trackingFrequency: null,
  mainGoal: "",
  confidenceRating: 0,
  premiumFeature: null,
  additionalFeedback: "",
};

// Reducer function
const feedbackReducer = (
  state: FeedbackState,
  action: FeedbackAction
): FeedbackState => {
  switch (action.type) {
    case "SET_CHALLENGES":
      return {
        ...state,
        challenges: {
          payload: action.payload.payload,
          isOtherSelected: action.payload.isOtherSelected,
        },
      };
    case "SET_FEATURES":
      return { ...state, features: action.payload };
    case "SET_TRACKING_FREQUENCY":
      return { ...state, trackingFrequency: action.payload };
    case "SET_MAIN_GOAL":
      return { ...state, mainGoal: action.payload };
    case "SET_CONFIDENCE_RATING":
      return { ...state, confidenceRating: action.payload };
    case "SET_PREMIUM_FEATURE":
      return { ...state, premiumFeature: action.payload };
    case "SET_ADDITIONAL_FEEDBACK":
      return { ...state, additionalFeedback: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

// Question options
const challengeOptions = [
  { label: "Debt payoff", value: "debt_payoff" },
  { label: "Sticking to a budget", value: "sticking_to_a_budget" },
  { label: "Tracking expenses", value: "tracking_expenses" },
  { label: "Saving for emergencies", value: "saving_for_emergencies" },
  { label: "Insurance Management", value: "insurance_management" },
];

const featureOptions = [
  { label: "Expense Tracker", value: "expense_tracker" },
  { label: "Progress Reminders & Alerts", value: "progress_reminders_alerts" },
  {
    label:
      "AI Assistant - A personal assistant which can give you lot of insights on your financial goals and a debt free life",
    value: "ai_assistant_financial_insights",
  },
];

const trackingFrequencyOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "I don’t track it", value: "i_dont_track_it" },
];

const premiumFeatureOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Maybe, depends on price", value: "maybe_depends_on_price" },
  { label: "Lets Try it out first", value: "lets_try_it_out_first" },
];

// Custom Star Rating Component
const StarRating = ({
  rating,
  onRatingChange,
}: {
  rating: number;
  onRatingChange: (rating: number) => void;
}) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onRatingChange(star)}
          activeOpacity={0.7}
        >
          <StarIcon
            size={wp(8)}
            color={star <= rating ? "#FFD700" : "#666"}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const Feedback = () => {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);
  const [keyboardEnabled, setKeyboardEnabled] = useState(false);
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardEnabled(true);
    });

    const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardEnabled(false);
    });

    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleFeatureToggle = (featureValue: string) => {
    const currentFeatures = state.features;
    if (currentFeatures.includes(featureValue)) {
      dispatch({
        type: "SET_FEATURES",
        payload: currentFeatures.filter((f) => f !== featureValue),
      });
    } else {
      dispatch({
        type: "SET_FEATURES",
        payload: [...currentFeatures, featureValue],
      });
    }
  };

  const handleSubmit = () => {
    console.log("Feedback submitted:", state);
    // Here you can add API call to submit feedback
    dispatch({ type: "RESET_FORM" });
  };

  const isFormValid = () => {
    return (
      state.challenges &&
      state.features.length > 0 &&
      state.trackingFrequency &&
      state.mainGoal.trim() &&
      state.confidenceRating > 0 &&
      state.premiumFeature &&
      state.additionalFeedback.trim()
    );
  };

  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      {/* Question 1: Challenges */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled={keyboardEnabled}
      >
        <Header title="Feedback" />
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              1.What’s your biggest money-related challenge right now? *
            </Text>
            <RadioInput
              options={challengeOptions}
              selectedValue={state.challenges?.payload}
              onValueChange={(value) =>
                dispatch({
                  type: "SET_CHALLENGES",
                  payload: { payload: value, isOtherSelected: false },
                })
              }
              containerStyle={styles.radioContainer}
              optionStyle={styles.radioOption}
              labelStyle={styles.radioLabel}
              selectedOptionStyle={styles.selectedRadioOption}
              labelSelectedStyle={styles.lableSelected}
            />
            <Input
              value={
                state.challenges.isOtherSelected
                  ? state.challenges?.payload
                  : ""
              }
              onChangeContent={(text) =>
                dispatch({
                  type: "SET_CHALLENGES",
                  payload: { payload: text, isOtherSelected: true },
                })
              }
              placeholder="Other (please specify)"
              multiline
              textAlignVertical="top"
              style={styles.customInput}
              containerStyle={styles.inputContainer2}
              inputWrapperStyle={styles.inputWrapper}
            />
          </View>

          {/* Question 2: Features */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              2. Which feature would you like to see?
              <Text style={styles.questionText2}>
                (You can select multiple){" "}
              </Text>
              *
            </Text>
            {featureOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.checkboxOption,
                  state.features.includes(option.value) &&
                    styles.checkboxOptionSelected,
                ]}
                onPress={() => handleFeatureToggle(option.value)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.checkbox,
                    state.features.includes(option.value) &&
                      styles.checkboxSelected,
                  ]}
                >
                  {state.features.includes(option.value) && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text
                  style={[
                    styles.checkboxLabel,
                    state.features.includes(option.value) &&
                      styles.lableSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Question 3: Tracking Frequency */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              3. How often do you currently track your spending? *
            </Text>
            <RadioInput
              options={trackingFrequencyOptions}
              selectedValue={state.trackingFrequency}
              onValueChange={(value) =>
                dispatch({ type: "SET_TRACKING_FREQUENCY", payload: value })
              }
              containerStyle={styles.radioContainer}
              optionStyle={styles.radioOption}
              labelStyle={styles.radioLabel}
              selectedOptionStyle={styles.selectedRadioOption}
              labelSelectedStyle={styles.lableSelected}
            />
          </View>

          {/* Question 4: Main Goal */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              4. What's your main goal for using Moneezify? *
            </Text>
            <Input
              value={state.mainGoal}
              onChangeContent={(text) =>
                dispatch({ type: "SET_MAIN_GOAL", payload: text })
              }
              placeholder="Describe your answer.."
              multiline
              textAlignVertical="top"
              style={styles.customInput}
              containerStyle={styles.inputContainer}
              inputWrapperStyle={styles.inputWrapper}
            />
          </View>

          {/* Question 5: Confidence Rating */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              5. On a scale of 1-5, how confident are you in reaching your
              financial debts? *
            </Text>
            <View style={styles.ratingContainer}>
              <StarRating
                rating={state.confidenceRating}
                onRatingChange={(rating) =>
                  dispatch({ type: "SET_CONFIDENCE_RATING", payload: rating })
                }
              />
              <View style={styles.ratingLabels}>
                <Text style={styles.ratingLabel}>Not confident</Text>
                <Text style={styles.ratingLabel}>Very confident</Text>
              </View>
            </View>
          </View>

          {/* Question 6: Premium Feature */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              6.Would you be open to premium features later (e.g. AI Debt free
              plan Generator - Generate a plan which is personalized and changes
              according to your expenses)?*
            </Text>
            <RadioInput
              options={premiumFeatureOptions}
              selectedValue={state.premiumFeature}
              onValueChange={(value) =>
                dispatch({ type: "SET_PREMIUM_FEATURE", payload: value })
              }
              containerStyle={styles.radioContainer}
              optionStyle={styles.radioOption}
              labelStyle={styles.radioLabel}
              selectedOptionStyle={styles.selectedRadioOption}
              labelSelectedStyle={styles.lableSelected}
            />
          </View>

          {/* Question 7: Additional Feedback */}
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>
              7. Anything else you’d love to see in a Financial Companion app?*
            </Text>
            <Input
              value={state.additionalFeedback}
              onChangeContent={(text) =>
                dispatch({ type: "SET_ADDITIONAL_FEEDBACK", payload: text })
              }
              placeholder="Describe your answer.."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.customInput}
              containerStyle={styles.inputContainer}
              inputWrapperStyle={styles.inputWrapper}
            />
          </View>

          {/* Submit Button */}
          <View style={styles.submitContainer}>
            <Button
              onPress={handleSubmit}
              style={[
                styles.submitButton,
                !isFormValid() && styles.submitButtonDisabled,
              ]}
              disabled={!isFormValid()}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: wp(4),
  },
  questionContainer: {
    marginBottom: hp(4),
  },
  questionText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    marginBottom: hp(2),
    lineHeight: wp(5),
  },
  questionText2: {
    fontSize: hp(1.5),
    fontFamily: "PlusJakartaSans-Regular",
  },
  radioContainer: {
    gap: hp(2),
  },
  radioOption: {
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
  },
  radioLabel: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Medium",
  },
  selectedRadioOption: {
    backgroundColor: "rgba(247, 247, 247, 0.2)",
  },
  lableSelected: {
    fontFamily: "PlusJakartaSans-Bold",
  },
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
  },
  checkboxOptionSelected: {
    backgroundColor: "rgba(247, 247, 247, 0.2)",
  },
  checkbox: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(0.5),
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: wp(3),
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxSelected: {
    backgroundColor: "#3A7BFF",
    borderWidth: 0,
    borderRadius: wp(1),
  },
  checkmark: {
    color: "#fff",
    fontSize: wp(2.5),
    fontWeight: "bold",
  },
  checkboxLabel: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Medium",
    flex: 1,
  },
  customInput: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Regular",
    height: hp(15),
    paddingTop: hp(2),
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: wp(2.5),
  },
  inputContainer2: {
    marginTop: hp(2),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    borderRadius: wp(2.5),
  },
  inputWrapper: {
    paddingVertical: hp(0),
    borderWidth: 0,
  },
  ratingContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: wp(90),
  },
  star: {
    marginHorizontal: wp(0.5),
  },
  ratingLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: hp(1),
  },
  ratingLabel: {
    color: "#fff",
    fontSize: wp(3),
    fontFamily: "PlusJakartaSans-Regular",
  },
  submitContainer: {
    paddingVertical: hp(4),
    alignItems: "center",
  },
  submitButton: {
    backgroundColor: "#006FFF",
    borderRadius: wp(6),
    paddingVertical: hp(1.5),
    width: wp(90),
  },
  submitButtonDisabled: {
    backgroundColor: "#666",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
  },
});

export default Feedback;
