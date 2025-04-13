import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/image.png')} // image path
          style={styles.headerImage}
        />
      }>

      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">📩 SMS Spam Detector</ThemedText>
      </ThemedView>

      <ThemedText>
        This app uses machine learning to detect whether an SMS message is spam or not. By simply entering any SMS message, the app will analyze the text and provide feedback on whether it's spam. The app uses a trained model to analyze patterns in the SMS, such as certain keywords or structures commonly found in spam messages, to determine if the message is spam.
      </ThemedText>

      <ThemedText>
        To use the app, simply type or paste an SMS message in the input field and press the "Check Spam" button. The app will then check the message and display the result, letting you know whether it's spam or not. It’s a quick and easy way to keep your inbox clean!
      </ThemedText>

      <ThemedText>
        The app connects to a backend built with Flask and utilizes a machine learning model to process and classify SMS messages in real-time. This ensures that users can get accurate and fast results on whether their SMS messages are spam.
      </ThemedText>

      <ThemedText>
        This app is compatible with Android, iOS, and web platforms. You can use the same functionality on any device, making it easy to check SMS messages for spam across different platforms. Whether you're on a phone or browsing on the web, the app works seamlessly.
      </ThemedText>

      <ThemedText>
        Additionally, the app provides support for static images. You can use image suffixes like <ThemedText type="defaultSemiBold">@2x</ThemedText> and <ThemedText type="defaultSemiBold">@3x</ThemedText> to provide files for different screen densities. The app also supports custom fonts, and you can modify the layout to add custom fonts such as <ThemedText style={{ fontFamily: 'SpaceMono' }}>SpaceMono</ThemedText>.
      </ThemedText>

      <ThemedText>
        The app adjusts its UI based on light and dark modes, ensuring that it provides a comfortable viewing experience regardless of the user’s preferred theme.
      </ThemedText>

      <ThemedText>
        The app also includes animations for a smoother user experience. For example, the app uses a <ThemedText type="defaultSemiBold">ParallaxScrollView</ThemedText> component to create a parallax effect for the header image, providing a visually engaging experience for users on iOS.
      </ThemedText>

      <Collapsible title="How it works">
        <ThemedText>
          The app uses a trained machine learning model to detect spam in SMS messages based on common spam patterns.
        </ThemedText>
      </Collapsible>

      <Collapsible title="How to use the app">
        <ThemedText>
          Simply input an SMS message and click the "Check Spam" button to determine if the message is spam.
        </ThemedText>
      </Collapsible>

      <Collapsible title="Learn more">
        <ExternalLink href="https://github.com/adarshsuman-0707/smsSpam">
          <ThemedText type="link">Learn more about Sms Spam Detection</ThemedText>
        </ExternalLink>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    width: '100%', 
    height: '100%', 
    resizeMode: 'cover', 
    position: 'absolute',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
