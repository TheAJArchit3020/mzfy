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
  updateCategoriesAsync,
} from "@redux/expenseSlice/expenseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@redux/store";
import { LogExpenseCategoryItem } from "src/commonTypes";
import Popup from "@components/reusable/popup";
import ConfirmationPopup from "@components/reusable/ConfirmationPopup";

const CategoryManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [originalData, setOriginalData] = useState<LogExpenseCategoryItem[]>(
    []
  );
  const [categories, setCategories] = useState<LogExpenseCategoryItem[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const [showSaveConfirmation, setShowSaveConfirmation] = useState(false);
  const [modifiedCategories, setModifiedCategories] = useState<
    LogExpenseCategoryItem[]
  >([]);
  const catagoriesData = useSelector(
    (state: RootState) => state.expenses.getCatogories
  );

  useEffect(() => {
    fetchData();
  }, []);

  // Keep local categories in sync with store updates
  useEffect(() => {
    if (catagoriesData && catagoriesData.length > 0) {
      setCategories(catagoriesData);
      setOriginalData(catagoriesData);
    }
  }, [catagoriesData]);

  const fetchData = async () => {
    let result;
    result = await dispatch(fetchExpenseCategories()).unwrap();
    console.log("result", result);
    
    // Check for duplicate IDs
    if (result && Array.isArray(result)) {
      const ids = result.map(cat => getCategoryId(cat));
      const uniqueIds = new Set(ids);
      if (ids.length !== uniqueIds.size) {
        console.warn("Duplicate IDs found in categories:", ids);
      }
    }
    
    setCategories(result || []);
    setOriginalData(result || []);
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
          id: result._id || Date.now().toString(), // Use response ID or fallback
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
        setShowAddPopup(false);
      } catch (error) {
        console.error("Failed to add category:", error);
        // You can add error handling here (show alert, etc.)
      }
    }
  };

  // Helper function to get the correct ID from category
  const getCategoryId = (category: LogExpenseCategoryItem): string => {
    return category.id || category._id || "";
  };

  // Helper function to get the correct ID from category (for state updates)
  const getCategoryIdForState = (category: LogExpenseCategoryItem): string | null => {
    return category.id || category._id || null;
  };

  const handleSave = async () => {
    if (modifiedCategories.length > 0) {
      try {
        // Format the data to match the required API structure
        const updateData = modifiedCategories.map((category) => {
          const updateItem: any = {
            id: getCategoryId(category),
            budget: category.budget,
          };
          
          // Include color if it has been modified
          if (category.color) {
            updateItem.color = category.color;
          }
          
          return updateItem;
        });

        console.log("Saving modified data:", updateData);
        console.log("Modified categories:", modifiedCategories);
        const result = await dispatch(
          updateCategoriesAsync(updateData)
        ).unwrap();
        console.log("Categories updated successfully:", result);

        // Clear the modified categories and reset the edited state
        setModifiedCategories([]);
        setIsEdited(false);

        // Refresh the data to get the latest from server
        await fetchData();
      } catch (error) {
        console.error("Failed to update categories:", error);
        // You can add error handling here (show alert, etc.)
      }
    }
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
          {categories.map((category, index) => {
            const isPredefined = [
              "food",
              "investment",
              "health",
              "miscellaneous",
            ].includes(category?.name?.toLowerCase());

            return (
              <View key={`${getCategoryId(category)}-${category.name}-${index}`} style={styles.categoryItem}>
                <View style={styles.categoryLeft}>
                  <View style={styles.categoryIconContainer}>
                    {isPredefined && <CategoryIcon category={category.name} />}
                    <Text style={styles.categoryName}>{category.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={[
                      styles.colorBar,
                      { backgroundColor: category.color },
                    ]}
                    onPress={() => {
                      setSelectedColor(category.color || "#FF6B6B");
                      setEditingCategoryId(getCategoryIdForState(category));
                      setShowColorPicker(true);
                    }}
                    activeOpacity={0.8}
                  />
                </View>
                <Input
                  value={category.budget.toString()}
                  onChangeContent={(value) => {
                    setCategories((prev) =>
                      prev.map((item) =>
                        item.name === category.name
                          ? { ...item, budget: Number(value) }
                          : item
                      )
                    );
                    originalData.forEach((item) => {
                      if (item.name === category.name) {
                        if (item.budget !== Number(value)) {
                          setIsEdited(true);
                        } else {
                          setIsEdited(false);
                        }
                      }
                    });

                    setModifiedCategories((prev) => {
                      const categoryId = getCategoryId(category);
                      const existingIndex = prev.findIndex(
                        (item) => getCategoryId(item) === categoryId
                      );

                      // Check if the new value matches the original
                      const originalCategory = originalData.find(
                        (item) => getCategoryId(item) === categoryId
                      );
                      const isBackToOriginal =
                        originalCategory &&
                        originalCategory.budget === Number(value) &&
                        (!originalCategory.color ||
                          originalCategory.color === category.color);

                      if (isBackToOriginal) {
                        // Remove from modified categories if back to original
                        const filtered = prev.filter(
                          (item) => getCategoryId(item) !== categoryId
                        );
                        // Check if there are any other modifications
                        const hasOtherModifications = filtered.length > 0;
                        setIsEdited(hasOtherModifications);
                        return filtered;
                      } else if (existingIndex >= 0) {
                        // Update existing entry
                        const updated = [...prev];
                        updated[existingIndex] = {
                          ...updated[existingIndex],
                          budget: Number(value),
                        };
                        return updated;
                      } else {
                        // Add new entry
                        return [
                          ...prev,
                          {
                            id: categoryId,
                            name: category.name,
                            budget: Number(value),
                            color: category.color,
                          },
                        ];
                      }
                    });
                  }}
                  placeholder=""
                  textHeader="₹"
                  containerStyle={styles.budgetInputContainer}
                  inputWrapperStyle={styles.budgetInput}
                  type="number"
                />
              </View>
            );
          })}
        </View>

        {/* Add New Category Section */}
        <View style={styles.addCategorySection}>
          <TouchableOpacity
            style={styles.addCategoryButton}
            onPress={() => setShowAddPopup(true)}
            activeOpacity={0.8}
          >
            <PlusCircleIcon size={hp(3)} color="#fff" />
            <Text style={styles.addCategoryText}>Add category</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      {isEdited && (
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
      )}

      {/* Add Category Popup */}
      <Popup
        visible={showAddPopup}
        onClose={() => setShowAddPopup(false)}
        onConfirm={handleAddCategory}
        buttonText="OK"
        containerStyle={{ backgroundColor: "#2A2A2A", paddingTop: hp(2) }}
        titleStyle={{ color: "#fff" }}
        buttonTextStyle={{ color: "#222" }}
        isDisable={!newCategoryName.trim() || !newCategoryBudget.trim()}
        color1="#00C853"
        color2="#B2FF59"
      >
        <View style={styles.addPopupContent}>
          <Input
            label="Enter category name"
            value={newCategoryName}
            onChangeContent={setNewCategoryName}
            placeholder=""
            containerStyle={{}}
          />

          <Input
            label="Enter budget/month"
            textHeader="₹"
            value={newCategoryBudget}
            onChangeContent={setNewCategoryBudget}
            placeholder=""
            containerStyle={{}}
            type="number"
          />
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Select tag colour</Text>
            <TouchableOpacity
              style={styles.colorPickerField}
              onPress={() => setShowColorPicker(true)}
              activeOpacity={0.8}
            >
              <View
                style={[styles.colorSwatch, { backgroundColor: selectedColor }]}
              />
              <EyeDropperIcon size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
      </Popup>

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
                onColorChange={(color) => {
                  setSelectedColor(color);
                  // Update the category color in the local state
                  setCategories((prev) =>
                    prev.map((item) =>
                      getCategoryId(item) === editingCategoryId
                        ? { ...item, color: color }
                        : item
                    )
                  );

                  // Check if the color has changed from original
                  const originalCategory = originalData.find(
                    (item) => getCategoryId(item) === editingCategoryId
                  );
                  const currentCategory = categories.find(
                    (c) => getCategoryId(c) === editingCategoryId
                  );

                  // Check if the new value matches the original
                  const isBackToOriginal =
                    originalCategory &&
                    originalCategory.color === color &&
                    originalCategory.budget === (currentCategory?.budget || 0);

                  if (isBackToOriginal) {
                    // Remove from modified categories if back to original
                    setModifiedCategories((prev) =>
                      prev.filter((item) => getCategoryId(item) !== editingCategoryId)
                    );
                    // Check if there are any other modifications
                    const hasOtherModifications = modifiedCategories.some(
                      (item) => getCategoryId(item) !== editingCategoryId
                    );
                    setIsEdited(hasOtherModifications);
                  } else if (
                    originalCategory &&
                    originalCategory.color !== color
                  ) {
                    setIsEdited(true);

                    // Add to modified categories
                    setModifiedCategories((prev) => {
                      const existingIndex = prev.findIndex(
                        (item) => getCategoryId(item) === editingCategoryId
                      );
                      if (existingIndex >= 0) {
                        // Update existing entry
                        const updated = [...prev];
                        updated[existingIndex] = {
                          ...updated[existingIndex],
                          color: color,
                          budget:
                            currentCategory?.budget ||
                            updated[existingIndex].budget,
                        };
                        return updated;
                      } else {
                        // Add new entry
                        return [
                          ...prev,
                          {
                            id: editingCategoryId!,
                            name: currentCategory?.name || "",
                            color: color,
                            budget: currentCategory?.budget || 0,
                          },
                        ];
                      }
                    });
                  }
                }}
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
  },
  categoryLeft: {
    flexDirection: "row",
    alignItems: "center",
    width: wp(50),
    justifyContent: "space-between",
    marginBottom: hp(1.5),
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
  budgetInputContainer: {
    backgroundColor: "transparent",
    borderRadius: wp(2),
    width: wp(30),
  },
  budgetInput: {
    paddingVertical: hp(0.5),
    borderColor: "#C0C0C0",
    borderWidth: 1,
    borderRadius: wp(2),
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
  addPopupContent: {
    paddingHorizontal: wp(4),
  },
  fieldContainer: {},
  fieldLabel: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Medium",
    marginBottom: hp(0.8),
  },
  budgetRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1),
  },
  rupeeLeft: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  budgetTextInput: {
    flex: 1,
    color: "#fff",
    fontSize: wp(4),
    paddingHorizontal: wp(2),
  },
  slashRight: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  colorPickerField: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
  },
  colorSwatch: {
    width: wp(8),
    height: hp(2),
    borderRadius: wp(4),
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
