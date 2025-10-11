import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown as DropdownCore } from 'react-native-element-dropdown';

const Dropdown = ({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (item: string) => void;
  options: Array<{ label: string; value: string }>;
}) => {
  return (
    <DropdownCore
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={options}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      searchPlaceholder="Search..."
      value={value}
      onChange={(item) => {
        onChange(item.value);
      }}
    />
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdown: {
    width: 125,
    height: 40,
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 0.5,
    color: 'white',
  },
  icon: {
    marginHorizontal: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: 'white',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black2b',
  },
});
