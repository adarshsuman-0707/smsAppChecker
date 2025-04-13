import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, View, Text, Button, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

// Importing MaterialCommunityIcons from @expo/vector-icons
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function WelcomePage() {
  const [showTabs, setShowTabs] = useState(false); // State to toggle between welcome screen and tabs
  const colorScheme = useColorScheme();

  if (!showTabs) {
    return (
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to the SMS Spam Detector!</Text>
        <Text style={styles.description}>
          This app uses machine learning to detect if SMS messages are spam. Let’s get started!
        </Text>
        <Button
          title="Start Exploring"
          onPress={() => setShowTabs(true)} // Show the tabs after the button is pressed
        />
      </View>
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="spam"
        options={{
          title: 'Spam',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="shield-alert" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f7',
    padding: 20,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
    color: 'red',
  },
});
