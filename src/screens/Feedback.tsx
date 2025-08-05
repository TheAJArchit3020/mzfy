import React, { useReducer } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
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
  challenges: string | null;
  features: string[];
  trackingFrequency: string | null;
  mainGoal: string;
  confidenceRating: number;
  premiumFeature: string | null;
  additionalFeedback: string;
}

// Action types for useReducer
type FeedbackAction =
  | { type: "SET_CHALLENGES"; payload: string }
  | { type: "SET_FEATURES"; payload: string[] }
  | { type: "SET_TRACKING_FREQUENCY"; payload: string }
  | { type: "SET_MAIN_GOAL"; payload: string }
  | { type: "SET_CONFIDENCE_RATING"; payload: number }
  | { type: "SET_PREMIUM_FEATURE"; payload: string }
  | { type: "SET_ADDITIONAL_FEEDBACK"; payload: string }
  | { type: "RESET_FORM" };

// Initial state
const initialState: FeedbackState = {
  challenges: null,
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
      return { ...state, challenges: action.payload };
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
  { label: "Wallet top-up", value: "wallet_topup" },
  { label: "Debt management", value: "debt_management" },
  { label: "Tracking expenses", value: "tracking_expenses" },
  { label: "Saving for a large goal", value: "saving_goal" },
  { label: "Investment strategies", value: "investment_strategies" },
  { label: "Something else (fill in)", value: "something_else" },
];

const featureOptions = [
  {
    label:
      "Budgeting tools (e.g. daily/weekly/monthly spending limits, alerts for overspending, and insights into spending patterns)",
    value: "budgeting_tools",
  },
  { label: "Reporting feature", value: "reporting_feature" },
  { label: "Progress tracking of goals", value: "progress_tracking" },
];

const trackingFrequencyOptions = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Occasionally", value: "occasionally" },
  { label: "Never", value: "never" },
];

const premiumFeatureOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Maybe, I'd like to learn more", value: "maybe" },
  { label: "I'm not sure/Prefer not to say", value: "not_sure" },
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
      <Header title="Feedback" />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Question 1: Challenges */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            1.What’s your biggest money-related challenge right now? *
          </Text>
          <RadioInput
            options={challengeOptions}
            selectedValue={state.challenges}
            onValueChange={(value) =>
              dispatch({ type: "SET_CHALLENGES", payload: value })
            }
            containerStyle={styles.radioContainer}
            optionStyle={styles.radioOption}
            labelStyle={styles.radioLabel}
          />
          {state.challenges === "something_else" && (
            <Input
              value={state.challenges === "something_else" ? "" : ""}
              onChangeContent={(text) =>
                dispatch({ type: "SET_CHALLENGES", payload: text })
              }
              placeholder="Describe your answer.."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              style={styles.customInput}
              inputWrapperStyle={styles.customInputWrapper}
            />
          )}
        </View>

        {/* Question 2: Features */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            2. Which feature would you like to see? (You can select multiple) *
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
              <Text style={styles.checkboxLabel}>{option.label}</Text>
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
            numberOfLines={4}
            textAlignVertical="top"
            style={styles.customInput}
            inputWrapperStyle={styles.customInputWrapper}
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
            inputWrapperStyle={styles.customInputWrapper}
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
  radioContainer: {
    gap: hp(1),
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
  checkboxOption: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginBottom: hp(1),
  },
  checkboxOptionSelected: {
    backgroundColor: "rgba(247, 247, 247, 0.2)",
    borderColor: "#3A7BFF",
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
    backgroundColor: "rgba(247, 247, 247, 0.2)",
    borderColor: "#3A7BFF",
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
  customInputWrapper: {
    borderRadius: wp(2),
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingHorizontal: wp(3),
  },
  ratingContainer: {
    alignItems: "center",
    marginTop: hp(2),
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(1),
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
    fontFamily: "PlusJakartaSans-Medium",
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
