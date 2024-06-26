import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Modal, Image, Text, View, TouchableOpacity, ScrollView, GestureResponderEvent } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from '../components/button';
import { defaultPageTheme, styles } from '../utility/style';
import { ApiContext, useApiContext } from '../../api/ApiContext';
import { useTheme } from '../utility/ThemeContext';
import { getWorkoutTypes, WorkoutTypeType,workout_category,workout_category_to_color,ExpectedExercise,Plan,setUserPlan} from '../../api/Workouts';
import { Ionicons } from '@expo/vector-icons';


export function returnDayAsNumber(day:string) {
  let daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return daylist.indexOf(day);
}

export function returnNumberAsDay(day:number) {
  let daylist = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  return daylist[day];
}

function returnTimeAsNumber(time:string | undefined){
  if(!time){
    return 0;
  }
  let timelist = {
    "30s":0.5,
    "30min":30,
    "1hr":60,
    "1hr 30min":90,
    "2hr":120,
  }
  return timelist[time];
}

export function returnNumberAsTime(time:number | undefined){
  if(!time){
    return "ERR";
  }
  let timelist = {
    0.5:"30s",
    30:"30 min",
    60:"1hr",
    90:"1hr 30min",
    120:"2hr",
  }
  return timelist[time];
}


export function EmojiPicker({ isVisible, children, ...props }) {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    modalContent: {
      height: '40%',
      width: '100%',
      backgroundColor: theme.colors?.background || '#FFFFFF',
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      position: 'absolute',
      bottom: '30%', 
      padding: 20,
      justifyContent: 'center', 
    },
    modalText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: theme.colors?.text || '#000000',
      textAlign: 'center',
      marginBottom: 10,
    }
  });

  return (
    <Modal {...props} animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        {children}
      </View>
    </Modal>
  );
}



function renderClickableSelector(name: string, color: string, onPressFunc: (name: string) => void) {
  const {theme} = useTheme();
  const style = StyleSheet.create({
    button: {
      backgroundColor: '#00B5EE',
      borderRadius: 15,
      margin: 10,
      padding: 10,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
    }
  });

  return (
    <TouchableOpacity onPress={() => onPressFunc(name)} style={style.button}>
      <Text style={style.buttonText}>{name}</Text>
    </TouchableOpacity>
  )
}

function renderPlanMaker(workout_types:WorkoutTypeType[],plans:Plan | null,authToken:string,updateUserData:()=>Promise<String|null>) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState(''); 
  const [WorkoutType, setWorkoutType] = useState<WorkoutTypeType|null>(null);
  const [day, setDay] = useState<string|null>(null);
  const [time, setTime] = useState<string|null>(null);
  const [modalChildren,setModalChildren] = useState<string|null>(null);


  function workout_type_onPress(name: string){
    let workoutType = workout_types.find((val) => val.name === name);
    if (workoutType) {
      setWorkoutType(workoutType);
    }
    setIsModalVisible(false);
  }
  

  function date_onPress(name: string){
    setDay(name);
    setIsModalVisible(false);
  }

  function time_onPress(name: string){
    setTime(name);
    setIsModalVisible(false);
  }



  function workoutCategoryToColor(category) {
    const categoryColors = {
      'Strength': 'red',  
      'Cardio': 'red',   
      'Flexibility': 'red', 
      'Balance': 'red'    
    };
  
    return categoryColors[category] || '#00B5EE'; 
  }
  

  function renderModalChildren() {
    const {theme} = useTheme();
    if (modalChildren === "workoutTypes") {
      return workout_types.map((val, idx) => 
        renderClickableSelector(val.name, workoutCategoryToColor(val.category), workout_type_onPress)
      );
    } else if (modalChildren === "days") {
      const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const dayButtonStyle = StyleSheet.create({
        container: {
          flexDirection: 'row', 
          flexWrap: 'wrap', 
          justifyContent: 'center', 
          padding: 10,
        },
        button: {
          paddingHorizontal: 50,
          paddingVertical: 50,
          backgroundColor: theme.colors?.primary || '#007AFF', 
          width: '13%', 
          margin: 4,
          paddingVertical: 10,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 1.5,
          elevation: 3,
        },
        buttonText: {
          color: '#FFFFFF', 
          fontSize: 16,
          fontWeight: '500',
        }
      });
  
      return (
        <View style={dayButtonStyle.container}>
          {daysOfWeek.map((day, idx) => (
            <TouchableOpacity key={idx} style={dayButtonStyle.button} onPress={() => date_onPress(day)}>
              <Text style={dayButtonStyle.buttonText}>{day}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    } else if (modalChildren === "time") {
      return ["30s","30min", "1hr", "1hr 30min", "2hr"].map((val, idx) => 
        renderClickableSelector(val, '#007AFF', time_onPress)
      );
    } else {
      return null;
    }
  }
  

  

  function renderButtonSelector(onPress_func:((event: GestureResponderEvent) => void), text?:String | null) {
    let clickStyle = {
      height: 35, //temp
      backgroundColor: theme.colors.primary,
      minWidth: 39, //temp
      borderRadius: 20,
      margin:3,
      padding:5
  };
    return(
    <TouchableOpacity onPress={onPress_func} style={clickStyle}>
      <View style={{justifyContent:'center',flex:1}}>
        {text ? <Text style={styles.newPopupText}>{text}</Text> : <Text></Text>}
      </View>
    </TouchableOpacity>
    )
  }
 
  async function resetPlan(){
   
      let submit_item:ExpectedExercise = {name:WorkoutType.name,time:returnTimeAsNumber(time),type:WorkoutType.name} 

      let submit_blank:ExpectedExercise[][] = [[],[],[],[],[],[],[]]
      let day_index = returnDayAsNumber(day);

      let new_plan:any = {
          workout_days:submit_blank
        }

      
      new_plan.workout_days = submit_blank;


      if(!new_plan.plan_name){
        new_plan.plan_name ="test"
      }
      new_plan.time = returnTimeAsNumber(time);

      await setUserPlan(authToken,new_plan);
      await updateUserData(); 
    

  }

  async function addToPlan(){
    if(WorkoutType && day && time){
      let submit_item:ExpectedExercise = {name:WorkoutType.name,time:returnTimeAsNumber(time),type:WorkoutType.name} 
      let new_plan = JSON.parse(JSON.stringify(plans));

      let submit_blank:ExpectedExercise[][] = [[],[],[],[],[],[],[]]
      let day_index = returnDayAsNumber(day);
      if(!new_plan){
        new_plan = {
          workout_days:submit_blank
        }
      }
      
      if(new_plan && new_plan.workout_days){
        new_plan.workout_days[day_index].push(submit_item);
      }else{
        submit_blank[day_index].push(submit_item);
        new_plan.workout_days = submit_blank;
      }

      if(!new_plan.plan_name){
        new_plan.plan_name ="test"
      }
      new_plan.time = returnTimeAsNumber(time);

      await setUserPlan(authToken,new_plan);
      await updateUserData(); 
    }
      console.log("Submitting plan")
  }
  const onModalClose = () => {
    setIsModalVisible(false);
  };
  let {theme} = useTheme();

  let clickStyle = {
      height: 100, //temp 
      backgroundColor: theme.colors.primary,
      minWidth: 32, //temp
      borderRadius: 20,
  };
  return (
    <View style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
    }}>
      <Text style={styles.planPopupText}>I </Text>
      {(WorkoutType && day && time) ? <Text onPress={async ()=>{
        await addToPlan();
        setDay(null);
        setTime(null);
        setWorkoutType(null);
      }} style={[styles.planPopupText,{color:'green'}]}>want </Text> : <Text style={styles.planPopupText}>want </Text>}
      <Text style={styles.planPopupText}>to do </Text>
      {renderButtonSelector(()=>{setModalChildren("workoutTypes");setIsModalVisible(true);return;}, WorkoutType?.name )}
      <Text style={styles.planPopupText}> every </Text>
      {renderButtonSelector(()=>{setModalChildren("days");setIsModalVisible(true);return;}, day )}
      <Text style={styles.planPopupText}> for </Text>
      {renderButtonSelector(()=>{setModalChildren("time");setIsModalVisible(true);return;}, time )}
      <TouchableOpacity onPress={() => resetPlan()}>
          <Ionicons name="close-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        {renderModalChildren()}
      </EmojiPicker>
    </View>
  );
}

function renderDay(ex:ExpectedExercise[],index:number){
  return(
    <View>
    {ex.map((val, idx) => (
      <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        {RenderE(val, index)}
        
      </View>
    ))}
  </View>
  )
}

function RenderE(ex:ExpectedExercise,index:number){
  const {theme} = useTheme();
  let fontStyle = {
    fontSize: 15, //temp
  };

  return(
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 20,
    }}>
      <Text style = {fontStyle}>I will do </Text>
      <Text style={fontStyle}>{ex.name}</Text>
      <Text style={fontStyle}>On</Text>
      <Text style={fontStyle}>{returnNumberAsDay(index)}</Text>
      <Text style={fontStyle}> For </Text>
      <Text style={fontStyle}>{returnNumberAsTime(ex?.time)}</Text>
    </View>
  );
}


export default function Page() {
  const {authToken,exercisePlan,updateUserData} = useApiContext();
  const [WorkoutTypes, setWorkoutTypes] = useState<WorkoutTypeType[]>([]);
  useEffect(() => {
    const getTypesType = async () => {
      try {
        let work = await getWorkoutTypes(authToken);
        if(work){
          setWorkoutTypes(work);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    getTypesType();
  }, []);


  async function removeDay(index: number) {
    if (exercisePlan) {
      const newPlan = JSON.parse(JSON.stringify(exercisePlan));
      newPlan.workout_days[index] = [];
      await setUserPlan(authToken, newPlan);
      await updateUserData();
    }
  }

  return (
    <View style = {styles.heading}>
          <View style = {[styles.header, ]}>
          <Text style = {styles.headerText} >Plans</Text>
         </View>
      {renderPlanMaker(WorkoutTypes,exercisePlan,authToken,updateUserData)}
      <ScrollView>
        {exercisePlan?.workout_days.map((val, idx) => (
          <View key={idx}>{renderDay(val, idx)}</View>
        ))}
      </ScrollView>
    </View>
  )
} 