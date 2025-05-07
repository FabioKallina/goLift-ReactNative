import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, ImageBackground, Button } from "react-native";
import { useState } from "react";

import { icons } from '@/constants/icons';
import { exercises } from "@/constants/exercises";
import { images } from "@/constants/images";

import * as Haptics from 'expo-haptics'; //Haptic feedback

const muscleGroups = ["chest", "back", "legs", "abs", "biceps", "triceps", "shoulders"];

export default function Index() {

  const [selectedGroup, setSelectedGroup] = useState("chest");
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);

  const filteredExercises = selectedGroup
    ? exercises.filter(ex => ex.category === selectedGroup)
    : [];

  return (
    <ScrollView style={{ flex: 1 }} bounces={false}>

      <ImageBackground source={require("@/assets/images/cloud-bg.jpg")} style={{ flex: 1 }} resizeMode="cover">

    <View style={styles.container}>

      <Text style={styles.headerText}>Go Lift</Text>
      <Image source={icons.gym} style={styles.logo}/>

      {/* Muscle group buttons*/}
      <View style={styles.groupButtons}>
        {muscleGroups.map(group => (
          <TouchableOpacity
            key={group}
            style={[
              styles.groupBtn,
              selectedGroup === group && styles.activeGroupBtn
            ]}
            onPress={() => { 
              setSelectedGroup(group);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Text style={[styles.groupBtnText, selectedGroup === group && styles.activeGroupText]}>{group}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exercise Cards */}
      {filteredExercises.map((exercise, index) => (
        <View key={index} style={styles.card}>
          <Image source={exercise.image} style={styles.cardImage} />
          <Text style={styles.cardTitle}>{exercise.name}</Text>
          <TouchableOpacity style={styles.infoBtn} onPress={() => { 
            setExpandedCardIndex(expandedCardIndex === index ? null : index)
            Haptics.selectionAsync();
            }}>
            <Text style={styles.cardText}>{expandedCardIndex === index ? "-" : "?"}</Text>
          </TouchableOpacity>
          {expandedCardIndex === index && (
              <Text style={styles.infoText}>{exercise.instructions || "No intructions available"}</Text>
            )}
        </View>
      ))}

    </View>

    </ImageBackground>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 60,
    backgroundColor: "black",
  },
  headerText: {
    color: "white",
    fontSize: 38,
    paddingTop: 10,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: 10,
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white"
  },
  groupButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
    gap: 10,
  },
  groupBtn: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  activeGroupBtn: {
    backgroundColor: "#FF9500",
    color: "black",
  },
  activeGroupText: {
    color: "black"
  },
  groupBtnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "black",
    padding: 20,
    marginTop: 10,
    borderTopColor: "#333",
    borderWidth: 1,
    width: "100%",
    alignSelf: "center",
  },
  cardImage: {
    width: "100%",
    height: 210,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
    alignSelf: "center",
  },
  infoBtn: {
    backgroundColor: "#FF9500",
    width: "10%",
    position: "absolute",
    borderRadius: 20,
    padding: 5,
    right: 30,
    top: 40,
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
  },
  infoText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 16,
  }

})
