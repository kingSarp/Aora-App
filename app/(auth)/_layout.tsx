import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

/**
 * This is the component that is used as the layout for all of the screens
 * in the authentication flow. It is responsible for rendering the content
 * of the various screens, and it's also responsible for hiding the splash
 * screen after the fonts have finished loading.
 *
 * The component is very simple, it just renders a View with a Text component
 * inside it. The Text component displays the string "_layout", which is just
 * a placeholder string to help me debug.
 *
 * The use case for this component is to take advantage of the
 * "useFonts" hook from the "expo-font" package. This hook allows me to load
 * all of my custom fonts when my app starts, and it also allows me to
 * wait until all of the fonts have finished loading before I render the
 * content of my app.
 *
 * By using this component as the layout for all of my authentication
 * screens, I can be sure that all of the fonts will be loaded and ready
 * to use before any of the screens are rendered. This helps ensure a
 * good user experience, because the user won't see any content until
 * all of the fonts have finished loading.
 */
const Authlayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar
      backgroundColor="#161622" style="light"
      />
    </>
  );
};

export default Authlayout;
