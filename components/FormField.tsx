import {
  View,
  Text,
  Image,
  TextInput,
  TextInputProps,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import { icons } from "../constants";

interface FormField {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  otherStyles: string;
  placeholder?: string;
  keyboardType?: TextInputProps["keyboardType"];
}
const FormField: React.FC<FormField> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,

  ...Props
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium ">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold"
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...Props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6"/>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
