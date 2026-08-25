// screens/Feedback.tsx
import React, { useEffect, useMemo, useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { widthToDP as wp, heightToDP as hp } from 'react-native-responsive-screens'
import Header from '@components/reusable/header'
import Input from '@components/reusable/Input'
import Button from '@components/reusable/button'
import { StarIcon } from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@redux/store'
import { addFeedback } from '@redux/feedbacks/feedbackSlices'

type SingleAnswer = { option: string; other?: string }
type Answers = Record<string, string | string[] | number | SingleAnswer>

const isOtherLabel = (label: string) => label?.toLowerCase?.().includes('other')

const StarRating = ({
  rating,
  min = 1,
  max = 5,
  onRatingChange,
}: {
  rating: number
  min?: number
  max?: number
  onRatingChange: (rating: number) => void
}) => {
  const stars = Array.from({ length: max - min + 1 }, (_, i) => i + min)
  return (
    <View style={styles.starContainer}>
      {stars.map((star) => (
        <TouchableOpacity key={star} onPress={() => onRatingChange(star)} activeOpacity={0.7}>
          <StarIcon size={wp(8)} color={star <= rating ? '#FFD700' : '#666'} style={styles.star} />
        </TouchableOpacity>
      ))}
    </View>
  )
}

const Feedback = () => {
  const dispatch = useDispatch<AppDispatch>()
  // const isSubmitting = useSelector()

  const surveyData = {
    "version": 1,
    "count": 7,
    "questions": [
      {
        "_id": "68a8562d466d467eac9cc7fb",
        "version": 1,
        "key": "biggest_challenge",
        "__v": 0,
        "allowOther": true,
        "createdAt": "2025-08-22T11:36:13.349Z",
        "help": "Identifies top pain point to prioritize features.",
        "isActive": true,
        "maxLength": 1000,
        "maxSelections": 1,
        "minLength": 0,
        "options": [
          "Debt payoff",
          "Sticking to a budget",
          "Tracking expenses",
          "Saving for emergencies",
          "Investment Management",
          "Insurance Management",
          "Other (please specify)"
        ],
        "order": 1,
        "placeholder": "",
        "ratingMax": 5,
        "ratingMaxLabel": "",
        "ratingMin": 1,
        "ratingMinLabel": "",
        "required": true,
        "text": "What’s your biggest money-related challenge right now?",
        "textVariant": "short",
        "type": "single",
        "updatedAt": "2025-08-22T11:36:13.349Z"
      },
      {
        "_id": "68a8562d466d467eac9cc7fc",
        "version": 1,
        "key": "feature_use_most",
        "__v": 0,
        "allowOther": false,
        "createdAt": "2025-08-22T11:36:13.390Z",
        "help": "Validates which modules real users value.",
        "isActive": true,
        "maxLength": 1000,
        "maxSelections": 2,
        "minLength": 0,
        "options": [
          "Expense Tracker",
          "Progress Reminders & Alerts",
          "AI Debt-Free Plan Generator (personalized and adjusts with expenses)"
        ],
        "order": 2,
        "placeholder": "",
        "ratingMax": 5,
        "ratingMaxLabel": "",
        "ratingMin": 1,
        "ratingMinLabel": "",
        "required": true,
        "text": "Which feature would you use most? (choose up to 2)",
        "textVariant": "short",
        "type": "multi",
        "updatedAt": "2025-08-22T11:36:13.390Z"
      },
      {
        "_id": "68a8562d466d467eac9cc7fd",
        "version": 1,
        "key": "spend_tracking_frequency",
        "__v": 0,
        "allowOther": false,
        "createdAt": "2025-08-22T11:36:13.397Z",
        "help": "Helps you tune notification cadence.",
        "isActive": true,
        "maxLength": 1000,
        "maxSelections": 1,
        "minLength": 0,
        "options": [
          "Daily",
          "Weekly",
          "Monthly",
          "I don’t track it"
        ],
        "order": 3,
        "placeholder": "",
        "ratingMax": 5,
        "ratingMaxLabel": "",
        "ratingMin": 1,
        "ratingMinLabel": "",
        "required": true,
        "text": "How often do you currently track your spending?",
        "textVariant": "short",
        "type": "single",
        "updatedAt": "2025-08-22T11:36:13.397Z"
      },
      {
        "_id": "68a8562d466d467eac9cc7fe",
        "version": 1,
        "key": "main_goal_text",
        "__v": 0,
        "allowOther": false,
        "createdAt": "2025-08-22T11:36:13.407Z",
        "help": "Captures qualitative goals for future user stories.",
        "isActive": true,
        "maxLength": 280,
        "maxSelections": 1,
        "minLength": 0,
        "options": [],
        "order": 4,
        "placeholder": "Type your goal…",
        "ratingMax": 5,
        "ratingMaxLabel": "",
        "ratingMin": 1,
        "ratingMinLabel": "",
        "required": true,
        "text": "What’s your main goal for using Moneezify? (e.g., “Pay off my credit card in 6 months,” “Understand where my money goes”)",
        "textVariant": "short",
        "type": "text",
        "updatedAt": "2025-08-22T11:36:13.407Z"
      },
      {
        "_id": "68a8562d466d467eac9cc7ff",
        "version": 1,
        "key": "debt_confidence_rating",
        "__v": 0,
        "allowOther": false,
        "createdAt": "2025-08-22T11:36:13.417Z",
        "help": "Baselines user self-efficacy and tracks improvement.",
        "isActive": true,
        "maxLength": 1000,
        "maxSelections": 1,
        "minLength": 0,
        "options": [],
        "order": 5,
        "placeholder": "",
        "ratingMax": 5,
        "ratingMaxLabel": "Very confident",
        "ratingMin": 1,
        "ratingMinLabel": "Not confident",
        "required": true,
        "text": "On a scale of 1–5, how confident are you in managing your debts?",
        "textVariant": "short",
        "type": "rating",
        "updatedAt": "2025-08-22T11:36:13.417Z"
      },
      {
        "_id": "68a8562d466d467eac9cc800",
        "version": 1,
        "key": "premium_openness",
        "__v": 0,
        "allowOther": false,
        "createdAt": "2025-08-22T11:36:13.425Z",
        "help": "Early gauge of willingness-to-pay.",
        "isActive": true,
        "maxLength": 1000,
        "maxSelections": 1,
        "minLength": 0,
        "options": [
          "Yes",
          "No",
          "Maybe, depends on price",
          "Let’s try it out first"
        ],
        "order": 6,
        "placeholder": "",
        "ratingMax": 5,
        "ratingMaxLabel": "",
        "ratingMin": 1,
        "ratingMinLabel": "",
        "required": true,
        "text": "Would you be open to premium features later (e.g., AI Debt-Free Plan Generator that adapts to your expenses)?",
        "textVariant": "short",
        "type": "single",
        "updatedAt": "2025-08-22T11:36:13.425Z"
      },
      {
        "_id": "68a8562d466d467eac9cc801",
        "version": 1,
        "key": "open_feedback",
        "__v": 0,
        "allowOther": false,
        "createdAt": "2025-08-22T11:36:13.431Z",
        "help": "Open feedback for future roadmap ideas.",
        "isActive": true,
        "maxLength": 1000,
        "maxSelections": 1,
        "minLength": 0,
        "options": [],
        "order": 7,
        "placeholder": "Share your thoughts (optional)…",
        "ratingMax": 5,
        "ratingMaxLabel": "",
        "ratingMin": 1,
        "ratingMinLabel": "",
        "required": false,
        "text": "Anything else you’d love to see in a Financial Companion app?",
        "textVariant": "long",
        "type": "text",
        "updatedAt": "2025-08-22T11:36:13.431Z"
      }
    ]
  }

  const [keyboardEnabled, setKeyboardEnabled] = useState(false)
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () => setKeyboardEnabled(true))
    const hide = Keyboard.addListener('keyboardDidHide', () => setKeyboardEnabled(false))
    return () => {
      show.remove()
      hide.remove()
    }
  }, [])

  const questions = useMemo(() => [...surveyData?.questions].filter(q => q.isActive).sort((a, b) => a.order - b.order), [])

  // Init answers per question type
  const [answers, setAnswers] = useState<Answers>(() => {
    const init: Answers = {}
    for (const q of questions) {
      switch (q.type) {
        case 'single': init[q.key] = { option: '' } as SingleAnswer; break
        case 'multi': init[q.key] = [] as string[]; break
        case 'text': init[q.key] = ''; break
        case 'rating': init[q.key] = 0; break
        default: init[q.key] = ''
      }
    }
    return init
  })

  // ---- Handlers
  const setSingle = (key: string, option: string, allowOther?: boolean) => {
    setAnswers(prev => ({
      ...prev,
      [key]: {
        option,
        other: allowOther && isOtherLabel(option) ? (prev[key] as SingleAnswer)?.other ?? '' : undefined,
      } as SingleAnswer
    }))
  }

  const setOtherText = (key: string, text: string) => {
    setAnswers(prev => {
      const curr = (prev[key] as SingleAnswer) || { option: '' }
      return { ...prev, [key]: { ...curr, other: text } }
    })
  }

  const toggleMulti = (key: string, option: string, maxSelections: number) => {
    setAnswers(prev => {
      const curr = new Set<string>((prev[key] as string[]) ?? [])
      if (curr.has(option)) curr.delete(option)
      else {
        if (curr.size >= maxSelections) return prev // cap
        curr.add(option)
      }
      return { ...prev, [key]: Array.from(curr) }
    })
  }

  const setText = (key: string, text: string) => setAnswers(prev => ({ ...prev, [key]: text }))
  const setRating = (key: string, value: number) => setAnswers(prev => ({ ...prev, [key]: value }))

  // ---- Validation
  const isQuestionValid = (q: typeof questions[number]): boolean => {
    if (!q.required) return true
    const a = answers[q.key]

    switch (q.type) {
      case 'single': {
        const { option, other } = (a as SingleAnswer) ?? { option: '' }
        if (!option) return false
        if (q.allowOther && isOtherLabel(option)) {
          const min = Math.max(1, q.minLength ?? 0)
          return !!(other && other.trim().length >= min)
        }
        return true
      }
      case 'multi': {
        const arr = (a as string[]) ?? []
        return arr.length >= 1
      }
      case 'text': {
        const t = (a as string) ?? ''
        const len = t.trim().length
        if ((q.minLength ?? 0) > 0 && len < q.minLength) return false
        if ((q.maxLength ?? 0) > 0 && len > q.maxLength) return false
        return len > 0
      }
      case 'rating': {
        const r = Number(a ?? 0)
        return r >= (q.ratingMin ?? 1) && r <= (q.ratingMax ?? 5)
      }
      default:
        return true
    }
  }

  const isFormValid = () => questions.every(isQuestionValid)

  // ---- Submit ----

  const handleSubmit = async () => {
    const payload = {
      answers: questions.map((q) => {
        const a = answers[q.key]
        let value: string | string[] | number = ''

        switch (q.type) {
          case 'single': {
            const { option, other } = (a as SingleAnswer) ?? { option: '' }
            value = (q.allowOther && isOtherLabel(option)) ? (other ?? '').trim() : option
            break
          }
          case 'multi': value = Array.isArray(a) ? (a as string[]) : []; break
          case 'text': value = String(a ?? ''); break
          case 'rating': value = Number(a ?? 0); break
          default: value = String(a ?? '')
        }
        return { questionId: q._id, answer: value }
      })
    }


    await dispatch(addFeedback(payload)).unwrap().then((res) => {
      console.log("res", res)

    })
  }

  return (
    <LinearGradient
      colors={['#463C9F', '#3A346E', '#23234B', '#2B293E', '#272631']}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled={keyboardEnabled}>
        <Header title="Feedback" />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>

          {questions.map((q, idx) => {
            const idxText = `${idx + 1}. `
            if (q.type === 'single') {
              const curr = (answers[q.key] as SingleAnswer) ?? { option: '' }
              const selected = curr.option
              const showOther = q.allowOther && isOtherLabel(selected)

              return (
                <View key={q._id} style={styles.questionContainer}>
                  <Text style={styles.questionText}>{idxText}{q.text} {q.required ? '*' : ''}</Text>
                  {q.options.map((opt: any) => {
                    const isSelected = selected === opt
                    return (
                      <TouchableOpacity
                        key={opt}
                        style={[styles.radioOption, isSelected && styles.selectedRadioOption]}
                        onPress={() => setSingle(q.key, opt, q.allowOther)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.checkbox, { borderRadius: wp(3), width: wp(4.5), height: wp(4.5), borderWidth: 2 }]}>
                          {isSelected && <View style={styles.radioDot} />}
                        </View>
                        <Text style={[styles.radioLabel, isSelected && styles.lableSelected]}>{opt}</Text>
                      </TouchableOpacity>
                    )
                  })}
                  {showOther && (
                    <Input
                      value={curr.other ?? ''}
                      onChangeContent={(t) => setOtherText(q.key, t)}
                      placeholder={q.placeholder || 'Other (please specify)'}
                      multiline
                      textAlignVertical="top"
                      style={styles.customInput}
                      containerStyle={styles.inputContainer2}
                      inputWrapperStyle={styles.inputWrapper}
                    />
                  )}
                  {/* {!isQuestionValid(q) && <Text style={styles.errorText}>This field is required.</Text>} */}
                </View>
              )
            }

            if (q.type === 'multi') {
              const selected = (answers[q.key] as string[]) ?? []
              return (
                <View key={q._id} style={styles.questionContainer}>
                  <Text style={styles.questionText}>{idxText}{q.text} {q.required ? '*' : ''}</Text>
                  {q.options.map((opt: any) => {
                    const isSelected = selected.includes(opt)
                    return (
                      <TouchableOpacity
                        key={opt}
                        style={[styles.checkboxOption, isSelected && styles.checkboxOptionSelected]}
                        onPress={() => toggleMulti(q.key, opt, q.maxSelections ?? 999)}
                        activeOpacity={0.7}
                      >
                        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                          {isSelected && <Text style={styles.checkmark}>✓</Text>}
                        </View>
                        <Text style={[styles.checkboxLabel, isSelected && styles.lableSelected]}>{opt}</Text>
                      </TouchableOpacity>
                    )
                  })}
                  <Text style={styles.helperText}>Select up to {q.maxSelections ?? '…'}. Chosen: {selected.length}</Text>
                  {/* {!isQuestionValid(q) && <Text style={styles.errorText}>Pick at least one option.</Text>} */}
                </View>
              )
            }

            if (q.type === 'text') {
              const val = (answers[q.key] as string) ?? ''
              return (
                <View key={q._id} style={styles.questionContainer}>
                  <Text style={styles.questionText}>{idxText}{q.text} {q.required ? '*' : ''}</Text>
                  <Input
                    value={val}
                    onChangeContent={(t) => setText(q.key, t)}
                    placeholder={q.placeholder || 'Type your answer…'}
                    multiline
                    textAlignVertical="top"
                    style={[styles.customInput, q.textVariant === 'long' && { height: hp(18) }]}
                    containerStyle={styles.inputContainer}
                    inputWrapperStyle={styles.inputWrapper}
                    placeholderTextColor={"#fff"}
                  />
                  {/* {!isQuestionValid(q) && <Text style={styles.errorText}>This field is required.</Text>} */}
                </View>
              )
            }

            if (q.type === 'rating') {
              const ratingMin = q.ratingMin ?? 1
              const ratingMax = q.ratingMax ?? 5
              const rating = Number(answers[q.key] ?? 0)
              return (
                <View key={q._id} style={styles.questionContainer}>
                  <Text style={styles.questionText}>{idxText}{q.text} {q.required ? '*' : ''}</Text>
                  <View style={styles.ratingContainer}>
                    <StarRating rating={rating} min={ratingMin} max={ratingMax} onRatingChange={(val) => setRating(q.key, val)} />
                    <View style={styles.ratingLabels}>
                      <Text style={styles.ratingLabel}>{q.ratingMinLabel || 'Not confident'}</Text>
                      <Text style={styles.ratingLabel}>{q.ratingMaxLabel || 'Very confident'}</Text>
                    </View>
                    {/* {!isQuestionValid(q) && <Text style={[styles.errorText, { marginTop: hp(1) }]}>Please select a rating.</Text>} */}
                  </View>
                </View>
              )
            }

            return null
          })}

          <View style={styles.submitContainer}>
            <Button
              onPress={handleSubmit}
              style={[styles.submitButton, (!isFormValid()) && styles.submitButtonDisabled]}
              disabled={!isFormValid()}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </Button>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1, paddingHorizontal: wp(4), paddingTop: hp(2) },
  questionContainer: { marginBottom: hp(4) },
  questionText: {
    color: '#fff',
    fontSize: wp(4),
    fontFamily: 'PlusJakartaSans-Bold',
    marginBottom: hp(2),
    lineHeight: wp(5.2),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#C0C0C0',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginBottom: hp(1.5),
  },
  radioLabel: {
    color: '#C6C6C6',
    fontSize: wp(3.4),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: -3
  },
  selectedRadioOption: {
    backgroundColor: 'rgba(247, 247, 247, 0.2)',
    color: '#fff',
    fontSize: wp(3.4),
    fontFamily: 'PlusJakartaSans-Medium',
  },
  lableSelected: {
    fontFamily: 'PlusJakartaSans-Bold',
    color: "#F7F7F7",
    fontSize: wp(3.4),
  },

  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: '#C0C0C0',
    paddingVertical: hp(1.5),
    paddingHorizontal: wp(3),
    marginBottom: hp(2),
  },
  checkboxOptionSelected: { backgroundColor: 'rgba(247, 247, 247, 0.2)' },
  checkbox: {
    width: wp(4),
    height: wp(4),
    borderRadius: wp(0.5),
    borderWidth: 2,
    borderColor: '#fff',
    marginRight: wp(3),
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: { backgroundColor: '#3A7BFF', borderWidth: 0, borderRadius: wp(1) },
  checkmark: { color: '#fff', fontSize: wp(2.5), fontWeight: 'bold' },

  customInput: {
    color: '#fff',
    fontSize: wp(3.5),
    fontFamily: 'PlusJakartaSans-Regular',
    height: hp(15),
    paddingTop: hp(2),
  },
  inputContainer: { borderWidth: 1, borderColor: '#C0C0C0', borderRadius: wp(2.5) },
  inputContainer2: { marginTop: hp(2), borderWidth: 1, borderColor: '#C0C0C0', borderRadius: wp(2.5) },
  inputWrapper: { paddingVertical: hp(0), borderWidth: 0 },

  ratingContainer: { alignItems: 'center', marginTop: hp(1) },
  starContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: wp(90) },
  star: { marginHorizontal: wp(0.5) },
  ratingLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: hp(1) },
  ratingLabel: { color: '#fff', fontSize: wp(3), fontFamily: 'PlusJakartaSans-Regular' },

  helperText: { color: '#C0C0C0', fontSize: wp(3), marginTop: hp(0.5) },
  errorText: { color: '#FFBABA', fontSize: wp(3), marginTop: hp(1) },

  submitContainer: { paddingVertical: hp(4), alignItems: 'center', marginBottom: hp(5) },
  submitButton: { backgroundColor: '#006FFF', borderRadius: wp(6), paddingVertical: hp(1.5), width: wp(90) },
  submitButtonDisabled: { backgroundColor: '#666' },
  submitButtonText: { color: '#fff', fontSize: wp(4), fontFamily: 'PlusJakartaSans-Bold', textAlign: 'center' },
  radioDot: { width: wp(2.2), height: wp(2.2), backgroundColor: '#3A7BFF', borderRadius: wp(2) },

  checkboxLabel: {
    color: '#C6C6C6',
    fontSize: wp(3.4),
    fontFamily: 'PlusJakartaSans-Medium',
    marginTop: -3,
    width: "90%"
  }

})

export default Feedback
