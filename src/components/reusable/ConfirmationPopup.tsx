import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";

export interface ConfirmationPopupProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmationPopup: React.FC<ConfirmationPopupProps> = ({
  visible,
  onClose,
  onConfirm,
  message,
  confirmText = "OK",
  cancelText = "Cancel",
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Centered popup container */}
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {/* Content Area */}
          <View style={styles.contentArea}>
            {message && <Text style={styles.message}>{message}</Text>}
          </View>

          {/* Separator Line */}
          <View style={styles.separator} />

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelButtonText}>{cancelText}</Text>
            </TouchableOpacity>

            {/* Button Separator */}
            <View style={styles.buttonSeparator} />

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmButtonText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  centeredView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: wp(80),
    backgroundColor: "#2A2A2A",
    borderRadius: wp(6),
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: "hidden",
  },
  contentArea: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(2.5),
    alignItems: "center",
  },
  message: {
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
    lineHeight: hp(2),
  },
  separator: {
    height: 1,
    backgroundColor: "#C0C0C0",
  },
  buttonContainer: {
    flexDirection: "row",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    paddingVertical: hp(1),
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  buttonSeparator: {
    width: 1,
    backgroundColor: "#C0C0C0",
  },
  confirmButton: {
    flex: 1,
    backgroundColor: "#2A2A2A",
    paddingVertical: hp(1),
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default ConfirmationPopup;
