import * as React from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { FirebaseRecaptchaVerifierModal, FirebaseRecaptchaBanner } from 'expo-firebase-recaptcha';
import * as firebase from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, PhoneAuthProvider, signInWithCredential ,} from 'firebase/auth';
import { storeData } from './dataFunctions';


// Initialize Firebase JS SDK >=9.x.x
// https://firebase.google.com/docs/web/setup
try {
  firebase.initializeApp({
    apiKey: "AIzaSyB69Np-K-toJHI2hYJAHQFhEFFvICFiYLI",
    authDomain: "okhtoapp.firebaseapp.com",
    projectId: "okhtoapp",
    storageBucket: "okhtoapp.appspot.com",
    messagingSenderId: "317798037204",
    appId: "1:317798037204:web:cdccc81b36eb4bf40c6d41",
    measurementId: "G-MTHZRVBZHH"
  });
} catch (err) {
  // ignore app already initialized error in snack
  console.log(err)
}
// Firebase references
const app = firebase.getApp();
const auth = getAuth();
// const handleSignUp = () => {
//   auth
//     .create(email, password)
//     .then(userCredentials => {
//       const user = userCredentials.user;
//       console.log('Registered with:', user.email);
//     })
//     .catch(error => alert(error.message))
// }
// Double-check that we can run the example
if (!app?.options || Platform.OS === 'web') {
  throw new Error('This example only works on Android or iOS, and requires a valid Firebase config.');
}

export default function Test({navigation}) {
  // Ref or state management hooks
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();
  const [lang,setLang]=React.useState('ar')
  const [config,setConfig]=React.useState(null)
  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;
  React.useEffect(()=>{
    async function getData(){
      try {
          await AsyncStorage.getItem('lang').then((value)=>{
              if (value){
                  // console.log(JSON.parse(value))
                  setLang(JSON.parse(value))
                  
                  }
          })
      }catch(e){
        console.log(e)
      }
    }
    getData()
  },[])

  return (
    <View style={{ flex: 1, justifyContent: "center", alignContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.3 }}><View style={{ height: '100%', width: '100%', backgroundColor: 'black', opacity: 0.3 }} /></TouchableWithoutFeedback>
    <View style={{ position: 'absolute', flex: 1, width: '80%', backgroundColor: "white", borderRadius: 15 }}>

      <FirebaseRecaptchaVerifierModal
      languageCode={lang}
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
      />
      <View>
        <Text style={{ flex: 1, justifyContent: lang === 'ar' ? 'flex-end' : 'flex-start', fontSize: 20, margin: 18, fontWeight: 'bold' }}>{lang == 'fr' ? "Veillez d'entrer votre numéro de téléphone :" : 'المرجو ادخال رقم هاتفكم :'}</Text>
        <View style={{ flexDirection: 'row', margin: 0, alignItems: 'center' ,alignSelf:'center'}}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, margin: 5 }}>+212</Text>
            <View style={{ borderWidth: 0.8, minWidth: 150, margin: 5 }}>
              <TextInput
                style={{ flex: 1, marginLeft: 8, textAlign: 'left',fontSize:17 }}
                placeholder="666666666"
                autoFocus
                autoCompleteType="tel"
                keyboardType="phone-pad"
                textContentType="telephoneNumber"
                onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
              />            
            </View>
        </View>
      </View>
      <View style={{width:'90%',justifyContent:'center',alignSelf:'center',marginTop:20,marginBottom:10}}>
        <Button
          title={lang==='ar'?'ارسال رمز التاكيد' :'Envoyer le code de verification'}
        
          disabled={phoneNumber.length!==9}
          onPress={async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            
            try {
              const phoneProvider = new PhoneAuthProvider(auth);
              const verificationId = await phoneProvider.verifyPhoneNumber('+212'+phoneNumber, recaptchaVerifier.current);
              
              // const phoneProvider = new PhoneAuthProvider(auth);
              // const verificationId = await phoneProvider.verifyPhoneNumber(
              //   phoneNumber,
              //   recaptchaVerifier.current
              // );
              setVerificationId(verificationId);
              showMessage({
                text: lang==='ar'?'لقد تم ارسال رمز الى رقمكم. انقر من اجل ادخال الرمز' : "Le code est envoyé par SMS, taper sur l'écran pour confirmer",
              });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }
          }}
        />
      </View>
      <View>
        <Text style={{ marginTop: 20,margin:15,fontSize:17,fontWeight:'bold' }}>{lang==='ar'?'المرجو ادخال رمز التحقق :':'Veillez entrer le code de verification :'}</Text>
        <View style={{ borderWidth: 0.8, justifyContent:'center',alignSelf:'center',width:'50%', margin: 5 }}>
          <TextInput
            style={{ flex: 1, textAlign: 'center',fontSize:17 }}
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          />
        </View>
      </View>
      <View style={{width:'90%',alignSelf:'center',margin:16}}>
        <Button
          title={lang==='ar'?'تاكيد':"Confirmer"}
          disabled={!verificationId}
          onPress={async () => {
            try {
              const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );

              await signInWithCredential(auth, credential);
              storeData('num',phoneNumber)
              storeData('credit',credential)
              navigation.navigate('Poissons')
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: 'red' });
            }
          }}
        />
      </View>
      {message ? (
        <TouchableOpacity
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: 0xffffffee, justifyContent: 'center' },
          ]}
          onPress={() => showMessage(undefined)}>
          <Text
            style={{
              color: message.color || 'blue',
              fontSize: 17,
              textAlign: 'center',
              margin: 20,
            }}>
            {message.text}
          </Text>
        </TouchableOpacity>
      ) : (
        undefined
      )}
      {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
    </View>
    </View>
  );
}
