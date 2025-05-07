import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { exercises } from "@/constants/exercises"
import { Ionicons } from '@expo/vector-icons'

import * as Haptics from "expo-haptics"
import { SwipeListView } from 'react-native-swipe-list-view';


const SetCard = ({ exercise, sets, onUpdateSets, onRemove }) => {

    const handleAddSet = () => {
        const newSets = [
            ...sets,
            { id: `${Date.now()}-${Math.floor(Math.random() * 1000)}`, weight: "", reps: "", completed: false }
        ];
        onUpdateSets(newSets);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }

    const handleDeleteSet = (index) => {
        const updatedSets = sets.filter((_, i) => i !== index);
        onUpdateSets(updatedSets);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    };

    const handleChange = (index, field, value) => {
        const updatedSets = [...sets]
        updatedSets[index][field] = value;
        onUpdateSets(updatedSets);
    }
    const handleConfirm = (index) => {
        const updatedSets = [...sets]
        updatedSets[index].completed = !updatedSets[index].completed;
        onUpdateSets(updatedSets);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{exercise.name}</Text>
            
            <TouchableOpacity style={styles.closeExerciseBtn} onPress={onRemove}>
                <Ionicons name="close" size={30} color="rgb(255, 0, 0)" />
            </TouchableOpacity>

            <SwipeListView
                data={sets}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => (
                    <View style={{ backgroundColor: "#000" }}>
                        <View style={[styles.inputPair, item.completed && { backgroundColor: "rgba(46, 125, 50, 0.5)" }]}>
                            <View style={[styles.setNumber, item.completed && { backgroundColor: "#256628", borderColor: "#000" }]}>
                                <Text style={{ color: "#fff", alignSelf: "center", marginTop: 4, fontSize: 18 }}>{index + 1}</Text>
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.labelText}>lbs</Text>
                                <TextInput
                                    style={[styles.input, item.completed && { backgroundColor: "#256628" }]}
                                    keyboardType="numeric"
                                    value={item.weight}
                                    onChangeText={(text) => handleChange(index, "weight", text)}
                                />
                            </View>

                            <View style={styles.inputGroup}>
                                <Text style={styles.labelText}>reps</Text>
                                <TextInput
                                    style={[styles.input, item.completed && { backgroundColor: "#256628" }]}
                                    keyboardType="numeric"
                                    value={item.reps}
                                    onChangeText={(text) => handleChange(index, "reps", text)}
                                />
                            </View>

                            <TouchableOpacity
                                style={[styles.confirmBtn, item.completed && { backgroundColor: "#256628" }]}
                                onPress={() => handleConfirm(index)}
                            >
                                <Ionicons name="checkmark" size={28} style={styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                renderHiddenItem={({ item, index }) => (
                    <View style={styles.rowBack}>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteSet(index)}
                        >
                            <Ionicons name="trash-outline" size={28} color="#fff" style={{ marginRight: 20 }} />
                        </TouchableOpacity>
                    </View>
                )}


                rightOpenValue={-70}          // Amount to swipe left to show delete
                previewRowKey={sets[0]?.id}   // Optional: shows preview animation on 1st row
                previewOpenValue={-80}        // Optional: how much to preview open
                previewOpenDelay={1000}       // Optional: delay before preview shows
                disableRightSwipe={true}      // Only allow left swipe
                friction={10}                 // Makes swipe slower/smoother
                tension={10}                  // Adds resistance to swipe
                stopRightSwipe={-70}          // Prevent over-swiping
                closeOnRowPress={true}       // Don't auto-close on press
                closeOnRowOpen={false}        // Keeps row open until manually closed
            />


            <TouchableOpacity style={styles.addSetBtn} onPress={handleAddSet}>
                <Ionicons name="add" size={28} color="#FF9500" style={{ alignSelf: "center" }} />
            </TouchableOpacity>

        </View>
    )
}

export default SetCard

const styles = StyleSheet.create({
    container: {
        width: 390,
        alignItems: "center",
        backgroundColor: "#000",
    },
    headerText: {
        fontSize: 22,
        color: "#FF9500",
        alignSelf: "flex-start",
        fontWeight: "semibold",
        marginVertical: 15,
        marginLeft: 10,
    },
    closeExerciseBtn: {
        position: "absolute",
        top: 15,
        right: 10,
        backgroundColor: "rgba(255, 0, 0, 0.3)",
        borderRadius: 5,
    },
    inputPair: {
        flexDirection: "row",
        gap: 20,
        width: 390,
        justifyContent: "center",
        backgroundColor: "#000",
    },
    setNumber: {
        color: "#fff",
        backgroundColor: "#333",
        height: 30,
        width: 30,
        alignSelf: "center",
        borderRadius: 40,
        marginTop: 23,
    },
    inputGroup: {
        marginVertical: 10,
    },
    labelText: {
        color: "#fff",
        fontSize: 16,
        alignSelf: "center",
        marginBottom: 5,
        fontWeight: "bold",
    },
    input: {
        height: 30,
        minWidth: 120,
        backgroundColor: "#333",
        borderRadius: 20,
        fontSize: 25,
        color: "#fff",
        textAlign: "center"
    },
    confirmBtn: {
        backgroundColor: "green",
        height: 40,
        width: 40,
        alignSelf: "center",
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 21,
    },
    icon: {
        color: "white"
    },
    addSetBtn: {
        backgroundColor: "#333",
        alignSelf: "center",
        width: "80%",
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 10,
    },
    removeExerciseBtn: {
        backgroundColor: "#333",
        alignSelf: "center",
        width: "80%",
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    rowBack: {
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "#000",
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        paddingRight: 5,
        borderRadius: 5,
        width: "100%",
    },
    deleteButton: {
        backgroundColor: "#E34234",
        width: "100%",
        height: "100%",
        alignItems: "flex-end",
        justifyContent: "center",
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },

})