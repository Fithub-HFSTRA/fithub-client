import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Text, View, TouchableOpacity, ScrollView } from 'react-native';

import { Button } from '../components/button';
import { defaultPageTheme, styles } from '../utility/style';
import { ApiContext, useApiContext } from '../../api/ApiContext';

export default function ProfilePage() {
    
  return (
      <View style = {styles.heading}>
          <View style = {[styles.header, ]}>
          <Text style = {styles.headerText} >Profile Settings</Text>
          <TouchableOpacity>
            <Image source={require('assets/pfp.png')} style={styles.avatar}/>
          </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator = {false}>
          <View style = {styles.content}>
              <View style = {styles.row}>
                  <Text style = {styles.text}>Username</Text>
                  <TouchableOpacity>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Edit</Text>
                  </TouchableOpacity>

              </View>
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                  USER
              </Text>
            <View style = {{marginVertical: 10}}></View>

              <View style = {styles.row}>
                  <Text style = {styles.text}>Password</Text>
                  <TouchableOpacity>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Change</Text>
                  </TouchableOpacity>

              </View>
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                  PASSWORD

              </Text>
               <View style = {{marginVertical: 10}}></View>

              <View style = {styles.row}>
                  <Text style = {styles.text}>Privacy</Text>
                  <TouchableOpacity>
                  <Text style = {[styles.text, {fontWeight: 'bold',color: '#00B5EE'}]}>Manage</Text>
                  </TouchableOpacity>

              </View>
              <Text style = {[styles.text, {marginTop: 5, fontWeight: 'bold'}]} >
                  CURRENT SETTINGS

              </Text>

          </View>
      </ScrollView>
    </View>

  )
}