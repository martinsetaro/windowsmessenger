import React , { useState , useEffect , useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , ImageBackground , SafeAreaView , Image , TextInput , Pressable ,ActivityIndicator , Alert } from 'react-native';
import gradienteBg from './assets/gradienteMessenger.png';
import msg from './assets/msg.png';
import * as Font from 'expo-font';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import * as SplashScreen from 'expo-splash-screen';
import Modal from 'react-native-modal';
import ModalCarga from './src/components/ModalCarga';
import ModalChats from './src/components/ModalChats';
import axios from 'axios';
import { Audio } from 'expo-av';




SplashScreen.preventAutoHideAsync();

export default function App() {

  const[email, setEmail] = useState("");
  const[pass,setPass] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState('Online');
  const [appIsReady, setAppIsReady] = useState(false);
  const [isFirstModalVisible, setFirstModalVisible] = useState(false);
  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  const [sound, setSound] = useState();

  
  

  useEffect(() => {
    async function prepare() {
      try {
        // Carga las fuentes
        await Font.loadAsync({
          'tahoma': require('./assets/fonts/tahoma.ttf'),
        });
        const loadSound = async () => {
          const { sound } = await Audio.Sound.createAsync(
            require('./assets/msnsound.mp3')
          );
          setSound(sound);
          
        };
        loadSound();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();

    return () => {
      // Desmontar el componente y liberar el sonido
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const playSound = async () => {
    if (sound) {
      try {
        await sound.playAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    } else {
      Alert.alert('Error', 'Sound not loaded');
    }
  };

  
 
  
  

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
// muestra los modales
  const toggleFirstModal = () => {
    setFirstModalVisible(!isFirstModalVisible);
     
  };

  const toggleSecondModal = () => {
    setSecondModalVisible(!isSecondModalVisible);
  };

  
  

  // Hace peticion y validacion 

  const postData = async () => {
   
    !loading && setFirstModalVisible(!isFirstModalVisible)
   

    try {
      const response = await axios.post(`https://connectionwindowmsn-d5b9decyd6aqfthq.eastus-01.azurewebsites.net/validateEmail/${email}/${pass}`, null, {
          headers: {
              'Content-Type': 'application/json',
          },
      });

      if (response.status === 200) {
        setFirstModalVisible(false)
        setEmail("");
        setPass("");
        toggleSecondModal();
         
      }
      
  } catch (error) {
      playSound();
      Alert.alert("Error", "Usuario no registrado");
      setFirstModalVisible(false)
        setEmail("");
        setPass("");
  }
}
  

  const handleFetch =  () => {
    postData();
   
  }
  
  
  
  return (
    <ImageBackground
      source={gradienteBg}
      style={styles.background}
      resizeMode='cover'
    >
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <View style={styles.cuadro}>
        <Image
        source={msg}
        style={styles.imagen}
        />
        </View>
        <View style={styles.contenedorInputs}>
        <Text style={{marginLeft:-170,fontSize: 16,color:'darkblue',fontFamily:'tahoma'}}>E-mail address:</Text>
        <TextInput
          style={styles.input}
          onChangeText={newText => setEmail(newText)}
          value={email}
        />
        <Text style={{marginLeft:-210,fontSize: 16,color:'darkblue',fontFamily:'tahoma',marginTop:20}}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={newText => setPass(newText)}
          value={pass}
          secureTextEntry={true}
        />
       <View style={styles.statusContainer}>
          <Text style={{fontSize: 16,color:'darkblue',fontFamily:'tahoma',marginTop:20}}>Status:</Text>
          <Picker
            selectedValue={status}
            style={{ height: 50, width: 150, marginTop: 20 }}
            onValueChange={(itemValue) => setStatus(itemValue)}
          >
            <Picker.Item label="Online" value="Online" />
            <Picker.Item label="Offline" value="Offline" />
            <Picker.Item label="Work" value="Work" />
          </Picker>
        </View>
        </View>
        <View style={styles.contenedorCheckBox}>
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? '#4630EB' : undefined}
        style={{backgroundColor:'white'}}
      />
      <Text style={{fontFamily:'tahoma', color:'darkblue', marginLeft:10}}>Remember Me</Text>
    </View>
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? '#4630EB' : undefined}
        style={{backgroundColor:'white'}}
      />
      <Text style={{fontFamily:'tahoma', color:'darkblue', marginLeft:10}}>Remember My Password</Text>
    </View>
    <View style={styles.checkboxContainer}>
      <Checkbox
        value={isChecked}
        onValueChange={setIsChecked}
        color={isChecked ? '#4630EB' : undefined}
        style={{backgroundColor:'white'}}
      />
      <Text style={{fontFamily:'tahoma', color:'darkblue', marginLeft:10}}>Sign me in automatically</Text>
    </View>
  </View>
  <View>
  <Pressable style={styles.outerButton} onPress={handleFetch}>
        <View style={styles.innerButton}>
          <Text style={styles.buttonText}>Sign In</Text>
        </View>
      </Pressable>
  </View>
  
        <StatusBar style="auto" />
      </SafeAreaView>
      <Modal isVisible={isFirstModalVisible}
       style={{ margin: 0 }}
      >
        <View style={styles.modalContentLogin}>
         <ModalCarga/>
        </View>
      </Modal>

      <Modal isVisible={isSecondModalVisible}
       style={{ margin: 0 }}
      >
        <View style={styles.modalContentLogin}>
          <ModalChats
          btnEnviar={toggleSecondModal}
          />
        </View>
      </Modal>
    </ImageBackground>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
  },
  imagen :{
    width:120,
    height:110,
  
    
  },
  cuadro:{
    borderColor:'#000',
    borderRadius:10,
    borderWidth:1,
    width:150,
    height:150,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#ededed'
    
    
   
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    width: '80%',
    backgroundColor: 'white',
  },
  contenedorInputs:{
    width:350,
    height:300,
    marginTop:40,
    alignItems:'center'
  },
  contenedorCheckBox:{
    width:240,
    height:100,
    flexDirection:'column',
    marginTop:-30
    
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    height:40,
    marginLeft:-80
  },
  outerButton: {
    borderWidth: 2,
    borderColor: 'darkblue',
    width:135,
    height:55,
    marginTop:30
    
    
  },
  innerButton: {
    borderWidth: 2,
    borderColor: 'darkorange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff', // Light blue color
    justifyContent: 'center',
    alignItems: 'center',
    width:130,
    height:50,
   
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 16,
    fontFamily:'tahoma'
  },
  modalContentLogin: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    
  },
});
