import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Image, LogBox, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { createClient, Provider } from 'urql';
import React, {useState, useEffect} from 'react';
import { Link } from 'expo-router';
import { Button } from '../components/button';
import { router } from 'expo-router';
import { defaultPageTheme } from '../utility/style';
import {styles} from '../utility/style';
import { useApiContext } from '../../api/ApiContext';
import { getUserInfo } from '../../api/User';
import CalendarStrip from 'react-native-calendar-strip';


{/*export default function Page() {
  const {authToken} = useApiContext();
  const [useremail, setUserEmail] = useState("nothing here :)");

  return (
    <View style={defaultPageTheme().container}>

      <Image source={requihvfcv gfgfgfg vgfggfgfffgfgffgfggffggfgfggtfre('../../assets/logo.png')} style={styles.logo}/> 
      <Button onPress={()=>{setBidenSize(bidenSize+1);}} title="Go to About"></Button>
      
      <TouchableOpacity style = {styles.loginbutton}>
      <Text  
        onPress={async () => {let user = await getUserInfo(authToken); setUserEmail(useremail);}}
      
      style={styles.login}>Log In</Text>
      </TouchableOpacity>
      {useremail}

      <TouchableOpacity style = {styles.setupbutton}>
      <Text style={styles.signup}>Sign Up</Text>
      </TouchableOpacity>
      
      
      <StatusBar style="auto" />
  </View>
     

  );
}*/}


export default function HomePage() {
  
  return (
    <View style = {styles.heading}>
    <View style = {[styles.header, ]}>
    <Text style = {styles.headerText} >Hello, USER</Text>
    <Image source={require('assets/pfp.png')} style={styles.avatar}/>

    </View>

    <CalendarStrip 
    style = {{height:100, paddingTop:20, paddingBottom:10,  }}
    dateNumberStyle= {[styles.text, {fontSize: 10, fontWeight: 'bold'}]}
    dateNameStyle = {styles.text}
    showMonth= {false}
    updateWeek = {true}
    
    />
    <View
    style = {styles.content}>
        <View style = {styles.row}>
            <Text style = {[styles.text, {fontWeight: 'bold'}]}>Steps</Text>

        </View>
        <View style = {[styles.box, {padding: 40}]}>
        <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold', fontSize: 20}]} >
            8,760
        </Text>
        </View>
  
</View>

<View style={styles.content}>
    <View style={styles.row}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Compared to your friends</Text>
    </View>

    <View style={[styles.box, {width: '100%', padding: 30}]}>
    
            <Text style={[styles.text, {marginRight: 10}]}>Calories Burned</Text>
           
            <View style={styles.bar}></View> 
          
  
  
    </View>
</View>

</View>
  )
}