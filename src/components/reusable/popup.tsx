// components/Popup.tsx
import React, { ReactNode } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";

export interface PopupProps {
  visible: boolean
  onClose: () => void
    onConfirm?: () => void
  onClose2?: () => void
  title?: string
  children: ReactNode
  containerStyle?: ViewStyle
  titleStyle?: TextStyle
  buttonText?: string
  color1?: string
  color2?: string
  buttonTextStyle?: any
  isDisable?: any
}

const Popup: React.FC<PopupProps> = ({
  visible,
  onClose,
    onConfirm,
  onClose2,
  title,
  children,
  containerStyle,
  titleStyle,
  buttonText = 'OK',
  color1 = '#B2FF59',
  color2 = '#00C853',
  buttonTextStyle,
  isDisable = false
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose2}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose2}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Centered popup container */}
      <View style={styles.centeredView}>
        <View style={[styles.modalView, containerStyle]}>
          {title && <Text style={[styles.modalTitle, titleStyle]}>{title}</Text>}
          <View style={styles.modalContent}>{children}</View>
          <LinearGradient
            colors={[color1, color2]}
            locations={[0, 1]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <TouchableOpacity onPress={onConfirm ? onConfirm : onClose} disabled={isDisable} style={[styles.closeButton, isDisable && { backgroundColor: "#666666" }]}>
              <Text style={[styles.closeButtonText, buttonTextStyle]}>{buttonText}</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </View>
    </Modal>
  )
}

export default Popup;

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
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 24,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: "hidden",
  },
  modalTitle: {
    marginBottom: 12,
  },
  modalContent: {
    marginBottom: 20,
  },
  closeButton: {
    padding: 12,
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    textAlign: "center",
  },
});
