import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import * as Haptics from "expo-haptics"

import { useColorTheme } from "@/context/ColorThemeContext";

import { useRouter } from "expo-router";

const Search = () => {
  const router = useRouter();
  const { colorTheme } = useColorTheme();

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "white" }}>Start Your Workout</Text>

      <TouchableOpacity
        style={[styles.workoutBtn, colorTheme && styles.colorStartBtn]}
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          router.push("/workoutPopUp");
        }}
      >
        <Text style={styles.workoutBtnText}>Quick Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Search

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black"
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white"
  },
  workoutBtn: {
    backgroundColor: "#FF9500",
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    borderRadius: 10,
  },
  workoutBtnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  colorStartBtn: {
    backgroundColor: "#7bafd4",
  },
})