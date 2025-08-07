import React, { useState, useRef, FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParams } from "@managers/routing";
import { useNavigation } from "@react-navigation/native";

type navProps = NativeStackNavigationProp<RootStackParams>

const Intro:FC = () => {
  const navigation = useNavigation<navProps>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const introData = [
    {
      id: 1,
      image: require("../assets/images/AppIntro/1o.png"),
      title: "Get clear on \nyour debts.",
      description:
        "Track all your loans and payments \n in one simple dashboard.",
    },
    {
      id: 2,
      image: require("../assets/images/AppIntro/2o.png"),
      title: "Plan your path to  \nfreedom.",
      description:
        "Smart strategies help you repay faster and \nsave on interest.",
    },
    {
      id: 3,
      image: require("../assets/images/AppIntro/3o.png"),
      title: "Take Control of \nYour Spending",
      description:
        "Track where your money goes and manage \nexpenses with ease.",
    },
  ];
  const imageOpacities = useRef(
    introData.map((_, index) => new Animated.Value(index === 0 ? 1 : 0))
  ).current;

  const handleNext = () => {
    if (currentIndex < introData.length - 1) {
      const nextIndex = currentIndex + 1;

      // Animate next image opacity from 0 -> 1
      Animated.timing(imageOpacities[nextIndex], {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setCurrentIndex(nextIndex);
    } else {
      console.log("Intro completed");
      navigation.navigate('loginscreen')
    }
  };

  const handleSkip = () => {
    console.log("Intro skipped");
    navigation.navigate('loginscreen')
  };

  const currentSlide = introData[currentIndex];

  return (
    <View style={styles.container}>
      {/* Stack All Images */}
      <View style={styles.imageContainer}>
        {introData.map((item, index) => (
          <Animated.Image
            key={item.id}
            source={item.image}
            style={[styles.backgroundImage, { opacity: imageOpacities[index] }]}
          />
        ))}
      </View>

      {/* Content (Always Visible) */}
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{currentSlide.title}</Text>
          <Text style={styles.description}>{currentSlide.description}</Text>
        </View>

        {/* Navigation */}
        <View style={styles.navigation}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
            <ChevronRightIcon size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2a2a2a",
  },
  imageContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  content: {
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    position: "relative",
    top: hp(70),
    height: hp(30),
  },
  textContainer: {
    justifyContent: "center",
  },
  title: {
    fontSize: wp(8),
    fontWeight: "700",
    color: "#F7F7F7",
    marginBottom: hp(2),
    lineHeight: wp(10),
    fontFamily: "PlusJakartaSans-Bold",
  },
  description: {
    fontSize: wp(4.5),
    color: "#ffffff",
    lineHeight: wp(6),
    opacity: 0.9,
    fontFamily: "PlusJakartaSans-Regular",
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(5),
  },
  skipButton: {
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
  },
  skipText: {
    fontSize: wp(4),
    color: "#B6B6B6",
    opacity: 0.8,
    borderBottomWidth: 1,
    borderBottomColor: "#B6B6B6",
    paddingBottom: wp(0.1),
    fontFamily: "PlusJakartaSans-Regular",
  },
  nextButton: {
    width: wp(12),
    height: wp(12),
    borderRadius: wp(6),
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Intro;
