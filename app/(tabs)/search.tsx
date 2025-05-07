import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import WorkoutPopUp from '@/app/workoutPopUp'

import * as Haptics from "expo-haptics"
import { Link } from 'expo-router'

const Search = () => {

  const [popUp, setPopUp] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30, color: "white", justifyContent: "center", alignContent: "center" }}>Start Your Workout</Text>

      <Link href="/workoutPopUp" asChild>
        <TouchableOpacity style={styles.workoutBtn} onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }}>
          <Text style={styles.workoutBtnText}>Quick Start</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}

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
})