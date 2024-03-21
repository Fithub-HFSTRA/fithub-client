import { StyleSheet, Text, View,Image } from 'react-native';
import React from 'react';
import { useTheme } from './ThemeContext';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 130,
      height: 130,     
    },
    signup: {
      color: '#00B5EE',
      marginTop: 10,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',  

    },
    login: {
      color: 'white',
      marginTop: 10,
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      textAlignVertical: 'center',

    },
    loginbutton: {
      backgroundColor: 'white',
      marginTop: 10,
      marginBottom: 5,
      paddingHorizontal: 50,
      borderRadius: 50,
      alignItems:'center',
    },

    setupbutton: {
      backgroundColor: '#00B5EE',
      marginTop: 10,
      marginBottom: 5,
      paddingHorizontal: 50,
      borderRadius: 50,
      alignItems:'center',
  },
  heading: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingLeft: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
    flexDirection : 'row', 
    alignItems: 'center'
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  text: {
    color: '#777'
  },
  
  avatar: {

    height: 40,
    width: 40,
    borderRadius: 20
  },
  box: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flex: 0.17,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '30%'
  },
  padding: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  

bar: {
    flex: 1,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'lightblue',
},

});

export function defaultPageTheme() {
  const {theme} = useTheme();
  let styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    
    

  });
  return styles
}