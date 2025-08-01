import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  widthToDP as wp,
  heightToDP as hp,
} from "react-native-responsive-screens";
import { BookmarkIcon, PencilIcon } from "react-native-heroicons/solid";
import LinearGradient from "react-native-linear-gradient";
import Button from "@components/reusable/Button";

interface NoteProps {
  onNoteChange?: (note: string) => void;
}

const Note: FC<NoteProps> = ({ onNoteChange }) => {
  const [noteText, setNoteText] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveNote = () => {
    if (noteText.trim()) {
      setSavedNote(noteText);
      setNoteText("");
      setIsEditing(false);
      onNoteChange?.(noteText);
    }
  };

  const handleEditNote = () => {
    setNoteText(savedNote);
    setIsEditing(true);
  };

  return (
    <View style={styles.container}>
      {!savedNote || isEditing ? (
        // Note Input Section
        <View style={styles.inputSection}>
          <TextInput
            style={styles.textInput}
            placeholder="Add a note...."
            placeholderTextColor="#999"
            value={noteText}
            onChangeText={setNoteText}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <Button
            onPress={handleSaveNote}
            style={{ width: wp(35), alignSelf: "flex-end" }}
          >
            <View style={styles.buttonContent}>
              <BookmarkIcon
                color="#fff"
                size={wp(4.5)}
                style={{ marginRight: wp(2) }}
              />
              <Text style={styles.saveButtonText}>Save note</Text>
            </View>
          </Button>
        </View>
      ) : (
        <View style={styles.displaySection}>
          <Text style={styles.noteLabel}>{savedNote}</Text>
          <Button
            onPress={handleEditNote}
            style={{ width: wp(35), alignSelf: "flex-end" }}
          >
            <View style={styles.buttonContent}>
              <PencilIcon
                color="#fff"
                size={wp(4.5)}
                style={{ marginRight: wp(2) }}
              />
              <Text style={styles.editButtonText}>Edit note</Text>
            </View>
          </Button>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: wp(5),
    padding: wp(4),
  },
  inputSection: {
    gap: hp(2),
  },
  textInput: {
    backgroundColor: "#3A3A3A",
    borderRadius: wp(3),
    borderWidth: 1,
    borderColor: "#C0C0C0",
    padding: wp(3),
    color: "#fff",
    fontSize: wp(3.5),
    fontFamily: "PlusJakartaSans-Regular",
    height: hp(15),
  },
  saveButton: {
    borderRadius: wp(10),
    paddingVertical: hp(1.5),
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: wp(2),
    paddingHorizontal: hp(1),
    borderRadius: wp(5),
    backgroundColor: "#006FFF",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
  displaySection: {
    gap: hp(2),
  },
  noteLabel: {
    color: "#fff",
    fontSize: wp(4),
    textAlign: "justify",
    fontFamily: "PlusJakartaSans-Bold",
  },
  editButton: {
    borderRadius: wp(10),
    paddingVertical: hp(1.5),
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontSize: wp(4),
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default Note;
