
import { Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'

import { Ionicons } from "@expo/vector-icons";

import { useColorTheme } from '@/context/ColorThemeContext';

const _layout = () => {

    const { colorTheme } = useColorTheme();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: "black",
                    borderTopColor: colorTheme ? "#7bafd4" : "orange",
                    borderTopWidth: 1,
                    height: 90,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: "#FF9500",
                tabBarInactiveTintColor: '#fff',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={28}
                            color={focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            fontSize: 16,
                            color: focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff",
                            fontWeight: focused ? "bold" : "normal"
                        }}>
                            Home
                        </Text>
                    )
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                    title: "Start",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "barbell" : "barbell-outline"}
                            size={28}
                            color={focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            fontSize: 16,
                            color: focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff"
                        }}>
                            Start
                        </Text>
                    )
                }}

            />
            <Tabs.Screen
                name="history"
                options={{
                    title: "History",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "calendar" : "calendar-outline"}
                            size={28}
                            color={focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            fontSize: 16,
                            color: focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff"
                        }}>
                            History
                        </Text>
                    )
                }}

            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={28}
                            color={focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff"}
                        />
                    ),
                    tabBarLabel: ({ focused }) => (
                        <Text style={{
                            fontSize: 16,
                            color: focused
                                ? (colorTheme ? "#7bafd4" : "#FF9500")
                                : "#fff"
                        }}>
                            Profile
                        </Text>
                    )
                }}

            />
        </Tabs>
    )
}

export default _layout