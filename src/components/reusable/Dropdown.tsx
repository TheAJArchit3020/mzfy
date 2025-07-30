import React, { memo, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

interface Option {
  label: string;
  value: string | number;
}

interface DropdownProps {
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  placeholder?: string;
  style?: any;
  label?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  style,
  label,
}) => {
  const [visible, setVisible] = useState(false);
  const selected = options.find(opt => opt.value === value);

  return (
    <View style={{ marginBottom: 16 }}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.dropdown, style]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={{ color: selected ? '#000' : '#888' }}>
          {selected ? selected.label : placeholder}
        </Text>
      </TouchableOpacity>
      <Modal visible={visible} transparent animationType="fade">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={item => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#fff',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: '#333',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    maxHeight: 300,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default memo(Dropdown);