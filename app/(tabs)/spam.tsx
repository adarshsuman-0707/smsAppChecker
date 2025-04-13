// import React, { useState, useEffect } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import axios from 'axios';
// import SmsRetriever from 'react-native-sms-retriever';

// export default function App() {
//   const [sms, setSms] = useState('');
//   const [result, setResult] = useState('');
//   const [spamList, setSpamList] = useState([]);

//   useEffect(() => {
//     const startSmsListener = async () => {
//       try {
//         if (Platform.OS !== 'android') {
//           Alert.alert('Not Supported', 'SMS auto-detection only works on Android.');
//           return;
//         }

//         const hasPermission = await SmsRetriever.requestPermission();
//         if (!hasPermission) {
//           Alert.alert('Permission Denied', 'Please allow SMS permissions in settings.');
//           return;
//         }

//         let message = await SmsRetriever.startSmsRetriever();
//         if (message) {
//           setSms(message);
//           checkSpam(message);
//         } else {
//           Alert.alert('SMS Error', 'No SMS retrieved.');
//         }
//       } catch (error) {
//         console.error('SMS Retriever Error:', error);
//         Alert.alert('Error', 'Failed to retrieve SMS. Run on a real Android device.');
//       }
//     };

//     startSmsListener();
//   }, []);

//   const checkSpam = async (message) => {
//     try {
//       const response = await axios.post('https://smsspam-a9ln.onrender.com/predict', {
//         message: message
//       });

//       const prediction = response.data.prediction;
//       setResult(prediction);

//       if (prediction.toLowerCase() === 'spam') {
//         setSpamList(prev => [...prev, message]);
//       }

//     } catch (error) {
//       console.error('Backend Error:', error.message);
//       Alert.alert('Backend Error', 'Could not connect to backend. Check server & IP.');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView style={{ width: '100%' }} contentContainerStyle={{ alignItems: 'center' }}>
//         <Text style={styles.title}>📩 SMS Spam Detector</Text>

//         <View style={styles.smsContainer}>
//           <Text style={styles.label}>Received SMS:</Text>
//           <Text style={styles.smsText}>{sms || 'Waiting for SMS...'}</Text>
//         </View>

//         {result ? (
//           <Text
//             style={[
//               styles.result,
//               result.toLowerCase() === 'spam' ? styles.spam : styles.notSpam,
//             ]}
//           >
//             This SMS is: {result}
//           </Text>
//         ) : null}

//         <View style={styles.spamListContainer}>
//           <Text style={styles.spamListTitle}>Spam Messages:</Text>
//           {spamList.length === 0 ? (
//             <Text style={styles.noSpam}>No spam detected yet.</Text>
//           ) : (
//             spamList.map((msg, index) => (
//               <View key={index} style={styles.spamItem}>
//                 <Text style={styles.spamText}>{msg}</Text>
//               </View>
//             ))
//           )}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f0f4f7',
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginVertical: 20,
//     textAlign: 'center',
//   },
//   smsContainer: {
//     width: '100%',
//     padding: 15,
//     borderColor: '#aaa',
//     borderWidth: 1,
//     borderRadius: 10,
//     backgroundColor: 'white',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 8,
//   },
//   smsText: {
//     fontSize: 16,
//     fontWeight: '400',
//     color: '#333',
//   },
//   result: {
//     marginTop: 20,
//     fontSize: 20,
//     fontWeight: 'bold',
//     padding: 10,
//     borderRadius: 10,
//     color: 'white',
//     textAlign: 'center',
//   },
//   spam: {
//     backgroundColor: 'red',
//   },
//   notSpam: {
//     backgroundColor: 'green',
//   },
//   spamListContainer: {
//     marginTop: 30,
//     width: '100%',
//   },
//   spamListTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   noSpam: {
//     color: '#555',
//   },
//   spamItem: {
//     backgroundColor: '#fff0f0',
//     padding: 10,
//     marginBottom: 10,
//     borderRadius: 6,
//     borderColor: 'red',
//     borderWidth: 1,
//   },
//   spamText: {
//     color: 'red',
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Alert,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import SmsListener from 'react-native-android-sms-listener';

import axios from 'axios';

export default function App() {
  const [smsList, setSmsList] = useState([]);
  const [spamList, setSpamList] = useState([]);
  const [manualMessage, setManualMessage] = useState('');
  const [manualResult, setManualResult] = useState('');

  let subscription;

  useEffect(() => {
    const requestSMSPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
            PermissionsAndroid.PERMISSIONS.READ_SMS,
          ]);

          if (
            granted['android.permission.RECEIVE_SMS'] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted['android.permission.READ_SMS'] !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            Alert.alert('Permission denied', 'SMS permissions are required.');
            return;
          }

          await startListening();
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestSMSPermission();

    return () => {
      if (subscription) subscription.remove();
    };
  }, []);
let body="s";
  const startListening =  () => {
    subscription = SmsListener.addListener(async (message) => {
     body = message.body;
      setSmsList(prev => [body, ...prev]);
     await checkSpam(body);
    });
  };

  const checkSpam = async (message, isManual = false) => {
    if (!message.trim()) {
      Alert.alert('Enter a message', 'Message cannot be empty.');
      return;
    }

    try {
      const response = await axios.post('https://smsspam-a9ln.onrender.com/predict', {
        message,
      });

      const prediction = response.data.prediction;

      if (isManual) {
        setManualResult(prediction);
      }

      if (prediction.toLowerCase() === 'spam') {
        setSpamList(prev => [message, ...prev]);
      }
    } catch (err) {
      console.error('API Error:', err.message);
      Alert.alert('Error', 'Could not connect to the spam classifier backend.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>📩 SMS Spam Detector</Text>

      <Text style={styles.sectionTitle}>All Received SMS:</Text>
      {smsList.map((msg, idx) => (
        <Text key={idx} style={styles.message}>{msg}</Text>
      ))}

      <Text style={styles.sectionTitle}>🚫 Spam Messages:</Text>
      {spamList.length === 0 ? (
        <Text style={styles.noSpam}>No spam detected yet.</Text>
      ) : (
        spamList.map((msg, idx) => (
          <Text key={idx} style={styles.spam}>{msg}</Text>
        ))
      )}

      <Text style={styles.sectionTitle}>📝 Check Manually:</Text>
      <TextInput
        style={styles.input}
        placeholder="Type a message to check..."
        value={manualMessage}
        onChangeText={setManualMessage}
        multiline
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => checkSpam(manualMessage, true)}
      >
        <Text style={styles.buttonText}>Predict</Text>
      </TouchableOpacity>

      {manualResult ? (
        <Text
          style={[
            styles.manualResult,
            manualResult.toLowerCase() === 'spam' ? styles.spamResult : styles.notSpamResult,
          ]}
        >
          This message is: {manualResult}
        </Text>
      ) : null}

      <Text>{body} show your actual mssg pass </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: 40,
    backgroundColor: 'res',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'red'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
  },
  message: {
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  spam: {
    padding: 10,
    backgroundColor: '#ffe5e5',
    color: 'red',
    marginVertical: 5,
    borderRadius: 6,
    borderColor: 'red',
    borderWidth: 1,
  },
  noSpam: {
    color: '#555',
    marginVertical: 10,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  manualResult: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
  },
  spamResult: {
    backgroundColor: 'red',
  },
  notSpamResult: {
    backgroundColor: 'green',
  },
});
