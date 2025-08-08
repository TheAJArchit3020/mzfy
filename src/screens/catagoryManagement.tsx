import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import LinearGradient from "react-native-linear-gradient";
import Header from "@components/reusable/header";
import Input from "@components/reusable/Input";
import ColorPicker from "react-native-wheel-color-picker";
import { PlusCircleIcon, EyeDropperIcon } from "react-native-heroicons/solid";
import {
  fetchExpenseCategories,
  addCategoryAsync,
} from "@redux/expenseSlice/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { LogExpenseCategoryItem } from "src/commonTypes";

const CategoryManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [categories, setCategories] = useState<LogExpenseCategoryItem[]>([]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const catagoriesData = useSelector(
    (state: RootState) => state.expenses.getCatogories
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let result;
    console.log("called");
    if (catagoriesData.length <= 0) {
      result = await dispatch(fetchExpenseCategories()).unwrap();
      console.log("result", result);
      setCategories(result || []);
    } else {
      result = catagoriesData;
      setCategories(result || []);
    }
  };

  const CategoryIcon = ({ category }: { category: string }) => {
    let iconSource;

    switch (category.trim().toLowerCase()) {
      case "food":
        iconSource = require("../assets/images/Expenses/Items/food.png");
        break;
      case "investment":
        iconSource = require("../assets/images/Expenses/Items/Investment.png");
        break;
      case "health":
        iconSource = require("../assets/images/Expenses/Items/Health.png");
        break;
      case "miscellaneous":
        iconSource = require("../assets/images/Expenses/Items/Miscellaneous.png");
        break;
    }

    return (
      <Image
        source={iconSource}
        style={styles.categoryIcon}
        resizeMode="contain"
      />
    );
  };

  const handleAddCategory = async () => {
    if (newCategoryName.trim() && newCategoryBudget.trim()) {
      try {
        const categoryData = {
          name: newCategoryName,
          color: selectedColor,
          budget: newCategoryBudget,
        };

        console.log("Adding category:", categoryData);
        const result = await dispatch(addCategoryAsync(categoryData)).unwrap();
        console.log("Category added successfully:", result);

        // Add the newly created category to the local state
        const newCategory: LogExpenseCategoryItem = {
          _id: result._id || Date.now().toString(), // Use response ID or fallback
          user: result.user || "",
          name: result.name || newCategoryName,
          color: result.color || selectedColor,
          budget: result.budget || Number(newCategoryBudget),
          isDefault: result.isDefault || false,
          __v: result.__v || 0,
          createdAt: result.createdAt || new Date().toISOString(),
          updatedAt: result.updatedAt || new Date().toISOString(),
        };

        setCategories((prev) => [...prev, newCategory]);

        // Clear form
        setNewCategoryName("");
        setNewCategoryBudget("");
        setSelectedColor("#FF6B6B");
      } catch (error) {
        console.error("Failed to add category:", error);
        // You can add error handling here (show alert, etc.)
      }
    }
  };

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving categories:", categories);
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Canceling changes");
  };

  return (
    <LinearGradient
      colors={["#463C9F", "#3A346E", "#23234B", "#2B293E", "#272631"]}
      locations={[0, 0.64, 0.76, 0.87, 1]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <Header title="Category management" />

      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Budget/Month Label */}
        <View style={styles.budgetLabelContainer}>
          <Text style={styles.budgetLabel}>Budget/month</Text>
        </View>

        {/* Existing Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map((category) => {
            console.log("categories", categories);
            const isPredefined = [
              "food",
              "investment",
              "health",
              "miscellaneous",
            ].includes(category?.name?.toLowerCase());

            return (
              <View key={category._id} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={styles.categoryIconContainer}>
                    {isPredefined && <CategoryIcon category={category.name} />}
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <View
                    style={[
                      styles.colorBar,
                      { backgroundColor: category.color },
                    ]}
                  />
                </View>
                <View style={styles.budgetInput}>
                  <Text style={styles.budgetText}>{category.budget}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Add New Category Section */}
        <View style={styles.addCategorySection}>
          <View style={styles.addCategoryRow}>
            <View style={styles.nameInputContainer}>
              <TextInput
                style={styles.nameInput}
                value={newCategoryName}
                onChangeText={setNewCategoryName}
              />
            </View>

            <TouchableOpacity
              style={styles.colorPickerButton}
              onPress={() => setShowColorPicker(true)}
            >
              <EyeDropperIcon size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.budgetInputContainer}>
              <TextInput
                style={styles.budgetInputField}
                value={newCategoryBudget}
                onChangeText={setNewCategoryBudget}
                keyboardType="numeric"
              />
            </View>
          </View>

          <TouchableOpacity
            style={styles.addCategoryButton}
            onPress={handleAddCategory}
            activeOpacity={0.8}
          >
            <PlusCircleIcon size={hp(3)} color="#fff" />
            <Text style={styles.addCategoryText}>Add category</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          activeOpacity={0.8}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={handleCancel}
          activeOpacity={0.8}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
      </View>

      {/* Color Picker Modal */}
      <Modal
        visible={showColorPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowColorPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.colorPickerContainer}>
            <View style={styles.colorPickerHeader}>
              <Text style={styles.colorPickerTitle}>Select Color</Text>
              <TouchableOpacity
                onPress={() => setShowColorPicker(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.colorPickerContent}>
              <ColorPicker
                color={selectedColor}
                onColorChange={setSelectedColor}
                thumbSize={30}
                sliderSize={20}
                noSnap={true}
                row={false}
              />
            </View>

            <View style={styles.selectedColorPreview}>
              <View
                style={[
                  styles.colorPreview,
                  { backgroundColor: selectedColor },
                ]}
              />
              <Text style={styles.colorValue}>{selectedColor}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(15),
  },
  budgetLabelContainer: {
    alignItems: "flex-end",
    marginBottom: hp(2),
  },
  budgetLabel: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Medium",
  },
  categoriesContainer: {
    marginBottom: hp(1),
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(0.3),
    paddingVertical: hp(1),
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(50),
    justifyContent: "space-between",
  },
  categoryIconContainer: {
    flexDirection: "row",
    gap: wp(1),
  },
  categoryName: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Medium",
  },
  categoryIcon: {
    width: wp(4),
    height: wp(4),
    resizeMode: "contain",
    marginTop: hp(0.3),
  },
  colorBar: {
    width: wp(7),
    height: hp(1.2),
    borderRadius: wp(1),
    marginRight: wp(3),
  },
  budgetInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    width: wp(30),
  },
  budgetText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Medium",
    textAlign: "center",
  },
  addCategorySection: {},
  addCategoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(2.5),
  },
  nameInputContainer: {
    width: wp(30),
  },
  nameInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(2),
    paddingVertical: hp(0.5),
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Medium",
  },
  colorPickerButton: {},
  budgetInputContainer: {
    width: wp(30),
  },
  budgetInputField: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(2),
    paddingHorizontal: wp(1.5),
    paddingVertical: hp(0.5),
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Medium",
  },
  addCategoryButton: {
    backgroundColor: "#006FFF",
    borderRadius: wp(5),
    paddingVertical: hp(1),
    width: wp(38),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp(2),
  },
  addCategoryText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
  },
  actionButtons: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: wp(5),
    paddingVertical: hp(3),
    backgroundColor: "transparent",
  },
  saveButton: {
    backgroundColor: "#3b82f6",
    borderRadius: wp(5),
    paddingVertical: hp(1),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(1),
  },
  saveButtonText: {
    color: "#fff",
    fontSize: wp(4.5),
    fontFamily: "PlusJakartaSans-Bold",
  },
  cancelButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: hp(1),
  },
  cancelButtonText: {
    color: "#888",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  colorPickerContainer: {
    backgroundColor: "#1a1a2e",
    borderRadius: wp(4),
    padding: wp(4),
    width: wp(90),
    maxHeight: hp(70),
  },
  colorPickerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  colorPickerTitle: {
    color: "#fff",
    fontSize: wp(5),
    fontFamily: "PlusJakartaSans-Bold",
  },
  closeButton: {
    backgroundColor: "#3b82f6",
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
  },
  closeButtonText: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
  },
  colorPickerContent: {
    height: hp(40),
    marginBottom: hp(2),
  },
  selectedColorPreview: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp(2),
  },
  colorPreview: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    borderWidth: 2,
    borderColor: "#BCBCBC",
  },
  colorValue: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
});

export default CategoryManagement;
