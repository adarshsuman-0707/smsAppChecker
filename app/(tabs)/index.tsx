import { Image, StyleSheet, Platform, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function HomeScreen() {
  const navigation = useNavigation(); // To navigate to other screens when needed

  const handleCheckSpam = () => {
    navigation.navigate('explore'); // Navigate to the Explore tab or any screen you want
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/emailspam.webp')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title" style={styles.welcomeText}>Welcome to SMS Spam Detector!</ThemedText>
        <HelloWave />
      </ThemedView>

      <View style={styles.infoContainer}>
        <ThemedText style={styles.introText}>
          SMS spam can clutter your inbox with unwanted messages, often containing promotional content or even malicious links.
          Our app uses machine learning to analyze incoming messages and detect whether they are spam or not.
        </ThemedText>
      </View>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Input SMS</ThemedText>
        <ThemedText>
          Enter the text of an SMS message you received, and the app will check if it's spam.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Analyze Spam</ThemedText>
        <ThemedText>
          Once you input the message, click "Check Spam" and let the app analyze it using a trained machine learning model.
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: View Results</ThemedText>
        <ThemedText>
          After analysis, the app will tell you whether the message is spam or not. You can easily manage your inbox.
        </ThemedText>
      </ThemedView>

      <View style={styles.ctaContainer}>
        <TouchableOpacity style={styles.ctaButton} onPress={handleCheckSpam}>
          <IconSymbol size={24} name="paperplane.fill" color="white" />
          <ThemedText style={styles.ctaButtonText}>Check SMS for Spam</ThemedText>
        </TouchableOpacity>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 50, // Adjust margin for better visibility
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2D3A3A',
    textAlign: 'center',
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  introText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#555',
    marginBottom: 15,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 20,
  },
  reactLogo: {
   width:'100%',
   height:'100%',
  },
  ctaContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: '#1D3D47',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButtonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
    fontWeight: 'bold',
  }
});
