import { StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';


/**
 * 
 * DO NOT USE THIS FILE FOR COLORS!!!!!!!!! 
 * 
 * Store colors in theme. Use this file for everything else CSS related
 * 
*/



/** Formatting Constants */
const fontSmall:number = 10;
const fontMedium:number = 13;
const fontLarge:number = 16;
const fontTitle:number = 24;

const paddingSmall:number = 6;
const paddingMedium:number = 12;
const paddingLarge:number = 24;
const paddingExtraLarge:number = 48;



export const styles = StyleSheet.create({
  /** TextBox Component */
  textboxContainer: { 
    flexDirection: 'row', 
    alignItems:'center',
    justifyContent:'space-evenly',
    width:600, 
    margin:5,
  },
  textboxDefault: {
    flex:1,
    padding: paddingSmall
  },
  textboxField: {
    //backgroundColor: '#F0F0F0',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    height: 30,
    fontSize: fontLarge,
  },
  textboxErrorText: {
    flexWrap:'wrap',
    fontSize: fontSmall
  },

  /** Popup Component */
  popupBackground: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    flex: 1,
    flexDirection: 'column',
    width: '75%',
    minHeight: 200,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 50,
    padding: 20,
    borderRadius: 10,
  },
  popupBody: {
    flex: 1,
    padding: paddingMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupClose: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /** Button Component */
  buttonContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    //height: 40,
    borderRadius: 9999, // perfectly round
    paddingHorizontal: paddingExtraLarge,
    paddingVertical: paddingSmall,
  },
  buttonText:{
    fontSize: fontLarge,
    fontWeight: 'bold'
  },

  /** Plan CSS */
  planPopupText: {
    fontSize: fontTitle,
    fontWeight: 'bold'
  },

  
  /** FIX PLEASE!!!!! */
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  charts: {
    alignItems: 'center', 
    justifyContent: 'center',
    padding: paddingMedium,
  },
  logo: {
    width: 130,
    height: 130,     
  },
  signup: {
    color: '#00B5EE',
    marginTop: 10,
    padding: paddingLarge,
    fontSize: fontTitle,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  login: {
    color: 'white',
    marginTop: 10,
    fontSize: fontTitle,
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  loginbutton: {
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: paddingExtraLarge,
    borderRadius: 50,
    alignItems:'center',
  },
  setupbutton: {
    backgroundColor: '#00B5EE',
    marginTop: 10,
    marginBottom: 5,
    paddingHorizontal: paddingExtraLarge,
    borderRadius: 50,
    alignItems:'center',
  },
  heading: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: paddingLarge,
    paddingLeft: paddingMedium,
    paddingRight: paddingMedium
  },
  header: {
    padding: paddingMedium,
    justifyContent: 'space-between',
    flexDirection : 'row', 
    alignItems: 'center'
  },
  headerText: {
    fontSize: fontTitle,
    fontWeight: 'bold'
  },
  content: {
    flex: 1,
    padding: paddingLarge,
    gap: 20,
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
    padding: paddingMedium,
    alignItems: 'center',
    flex: 0.17,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '30%'
  },
  // wdym padding?
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
  chartContainer: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  buttonGroupContainer: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
  }
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