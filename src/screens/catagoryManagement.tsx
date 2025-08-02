import React, { useState } from "react";
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

interface Category {
  id: string;
  name: string;
  color: string;
  budget: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "1",
      name: "Food",

      color: "#FF6B6B",
      budget: "₹5,000",
    },
    {
      id: "2",
      name: "Investment",
      color: "#4ECDC4",
      budget: "₹5,000",
    },
    {
      id: "3",
      name: "Health",
      color: "#45B7D1",
      budget: "₹5,000",
    },
    {
      id: "4",
      name: "Miscellaneous",
      color: "#96CEB4",
      budget: "₹5,000",
    },
  ]);

  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryBudget, setNewCategoryBudget] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FF6B6B");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleAddCategory = () => {
    if (newCategoryName.trim() && newCategoryBudget.trim()) {
      const newCategory: Category = {
        id: Date.now().toString(),
        name: newCategoryName,
        color: selectedColor,
        budget: `₹${newCategoryBudget}`,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setNewCategoryBudget("");
      setSelectedColor("#FF6B6B");
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
          {categories.map((category) => (
            <View key={category.id} style={styles.categoryItem}>
              <View style={styles.categoryLeft}>
                <Text style={styles.nameText}>{category.name}</Text>
                <View
                  style={[styles.colorBar, { backgroundColor: category.color }]}
                />
              </View>

              <View style={styles.budgetInput}>
                <Text style={styles.budgetText}>{category.budget}</Text>
              </View>
            </View>
          ))}
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
    fontFamily: "PlusJakartaSans-Bold",
  },
  categoriesContainer: {
    marginBottom: hp(4),
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: hp(1),
    paddingVertical: hp(1),
  },
  categoryLeft: {
    width: wp(50),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryIcon: {
    width: wp(6),
    height: wp(6),
    marginRight: wp(2),
    resizeMode: "contain",
  },
  colorBar: {
    width: wp(8),
    height: hp(1),
    borderRadius: wp(0.5),
  },
  budgetInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    minWidth: wp(20),
  },
  budgetText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Medium",
    textAlign: "center",
  },
  nameText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Medium",
    textAlign: "center",
  },
  addCategorySection: {},
  addCategoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: hp(2),
    gap: wp(2),
  },
  nameInputContainer: {
    flex: 1,
  },
  nameInput: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
  colorPickerButton: {
    padding: wp(2),
    alignItems: "center",
    justifyContent: "center",
  },
  budgetInputContainer: {
    flex: 1,
  },
  budgetInputField: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#BCBCBC",
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: hp(1.5),
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Regular",
  },
  addCategoryButton: {
    backgroundColor: "#3b82f6",
    borderRadius: wp(5),
    paddingVertical: hp(1),
    width: wp(40),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp(2),
  },
  addCategoryText: {
    color: "#fff",
    fontSize: wp(4),
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
    fontFamily: "PlusJakartaSans-Regular",
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
