import { theme } from '@/constants';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown as DropdownCore } from 'react-native-element-dropdown';

const Dropdown = ({
  value,
  onChange,
  options,
}: {
  value: string | string[];
  onChange: (item: string) => void;
  options: Array<{ label: string; value: string }>;
}) => {
  return (
    <DropdownCore
      style={[styles.dropdown, { backgroundColor: "transparent" }]}
      containerStyle={{
        backgroundColor: theme.primary.brand950,
        borderRadius: 8,
        borderWidth: 1,
        marginTop: 10,
      }}
      selectedTextStyle={{
        color: theme.base.white,
        borderRadius: 0,
      }}
      activeColor={theme.primary.brand900}
      inputSearchStyle={[styles.inputSearchStyle, { color: theme.base.white }]}
      iconStyle={styles.iconStyle}
      itemContainerStyle={{
        backgroundColor: theme.primary.brand950,
        borderRadius: 8,
      }}
      itemTextStyle={{
        color: theme.base.white,
      }}
      placeholderStyle={{ color: theme.gray.gray400 }}
      data={options}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Seleccionar"
      searchPlaceholder="Buscar..."
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
    width: 150,
    height: 40,
    paddingHorizontal: 10,
    borderColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
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
  iconStyle: {
    width: 20,
    height: 20,
    color: 'white',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderWidth: 0,
  },
});
