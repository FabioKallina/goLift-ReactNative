import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import React from 'react'

import { Ionicons } from "@expo/vector-icons";

import { useColorTheme } from '@/context/ColorThemeContext';

const SearchBar = ({ value, onChangeText }) => {

  const { colorTheme } = useColorTheme();

  return (
    <View style={{ flexDirection: "row", justifyContent: "center"}}>
        <TextInput style={styles.input} placeholder="Search for an exercise..." placeholderTextColor="#888" value={value} onChangeText={onChangeText}/>
        <TouchableOpacity style={[styles.searchBtn, colorTheme && styles.colorSearchBtn]}>
          <Ionicons name="search" size={29} color="#000"/>
        </TouchableOpacity>
      </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
    input: {
        height: 50,
        fontSize: 18,
        width: 300,
        margin: 12,
        borderWidth: 0,
        padding: 15,
        backgroundColor: "#333",
        color: "#fff",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
      },
      searchBtn: {
        backgroundColor: "#FF9500",
        marginTop: 12,
        marginBottom: 12,
        marginLeft: -15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 15,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
      },
      colorSearchBtn: {
        backgroundColor: "#7bafd4"
      },
})