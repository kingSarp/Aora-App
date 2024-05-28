import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "components/FormField";
import CustomButton from "components/CustomButton";
import { Link, router } from "expo-router";
import { createUser, signIn } from "lib/appwrite";

const SignIn: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const Submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all the fields");
      return; // Return early to prevent submission
    }

    setIsSubmitting(true);
    try {
      const result = await signIn({
        email: form.email,
        password: form.password,
      });
      Alert.alert("Success", `User logged in: ${result.userId}`);

      // setUser(true);
      // Navigate to home
      console.log("Navigation to home");
      router.replace("/home");
    } catch (error) {
      //error was asking for type hence this solution
      //Reason: The error object is of type unknown by default.
      //Using instanceof Error type guard ensures that error is treated as an instance of the Error class,
      //allowing access to the message property safely.
      //If the error is not an instance of Error, a generic error message is displayed.
      if (error instanceof Error) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full justify-center min-h-[82vh]  px-4 my-6">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login Into Aora
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: any) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: any) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={Submit}
            containerStyle="mt-7"
            isloading={isSubmitting}
            textStyles={undefined}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Dont have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
