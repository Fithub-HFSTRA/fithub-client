// ThemeContext.tsx
import React, { createContext, useContext, ReactNode, useState } from 'react';
import { router } from 'expo-router';
import { ApiContextType } from './ApiContext';
import { workout_category } from './Workouts';
import { ExpectedExercise } from './Workouts';
function differenceInMinutes(date1?: Date, date2?: Date): number {
  if(!date1 || !date2){
    return 0
  }
  const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  const diffInMinutes = diffInMilliseconds / (1000 * 60);
  return diffInMinutes;
}

export function string_to_date(input: string): Date | undefined {
  // Parse the input string into a Date object
  const date = new Date(input);

  // Check if the parsed date is valid
  if (isNaN(date.getTime())) {
    // If the parsed date is invalid, throw an error
    return undefined;
  }

  // Return the parsed Date object
  return date;
}

export interface exerciseType{
  start: Date | undefined,
  workout_type: WorkoutTypeType
  end: Date | undefined,
  expectedTime:number,
  avg_heartrate?:number
}
function isSameDay(date1?: Date, date2?: Date): boolean {
  if(!date1 || !date2){
    return false
  }
  return (
    date1?.getDay() === date2?.getDay()
  );
}

export function getTimeofExcercisesDone(exercises: exerciseType[], day: Date): number {
  let totalTime = 0;
  console.log(exercises)
  const exercisesDoneToday = exercises.filter((exercise) => {
    const exerciseDate = exercise.start;
    console.log("ex data day",exerciseDate?.getDay())
    console.log("ex data day",day?.getDay())
    return (
      exerciseDate &&
      exerciseDate.getDay() == day.getDay()
    );
  });

  exercisesDoneToday?.forEach((exercise) => {
     console.log("PING")
      const startTime = exercise.start;
      const endTime = exercise.end || new Date(); // If end time is undefined, use the current date/tim
      const duration = differenceInMinutes(endTime, startTime);
      totalTime += duration;

  });
  console.log("exercises",exercises)
  console.log("TOTAL TIME",totalTime)
  return totalTime;
}

export const getUserGender = (context:ApiContextType) => {
  context
  if (!context) {
    throw new Error('getApiKey must be used within a ApiProvider');
  }
  return context;
};

enum BloodType {
  AP = 'A+',
  AN = 'A-',
  BP = 'B+',
  BN = 'B-',
  ABP = 'AB+',
  ABN = 'AB-',
  OP = 'O+',
  ON = 'O-',
}

export interface Plan{
  workout_days:Array<Array<ExpectedExercise>>;
  difficulty_level?:string;
  plan_name?:string;
  description?:string;
}


export interface WorkoutTypeType {
  name: string;
  category: workout_category;
}

export const getNextExercises = (plan_data: Plan | null, ex_data: exerciseType[]): ExpectedExercise[] => {
  if (!plan_data) {
    return [];
  }
  
  const currentDate = new Date();
  const day_data: ExpectedExercise[] = plan_data.workout_days[currentDate.getDay()];
  
  // Filter ex_data to get exercises done on the same day
  const exercisesDoneToday = ex_data.filter((exercise) => {
    const exerciseDate = exercise.start;
    return (
      exerciseDate &&
      exerciseDate.getFullYear() === currentDate.getFullYear() &&
      exerciseDate.getMonth() === currentDate.getMonth() &&
      exerciseDate.getDate() === currentDate.getDate()
    );
  });

  // Create a copy of day_data to avoid modifying the original array
  const remainingExercises = [...day_data];

  // Iterate over each completed exercise
  exercisesDoneToday.forEach((completedExercise) => {
    
    
    let completedTime = 0;

    if (completedExercise.start && completedExercise.end) {
      completedTime = completedExercise.end.getTime() - completedExercise.start.getTime();
    } else {
      completedTime = -1;
    }
    completedTime = completedTime/ 60000
     // Find the index of the expected exercise with the largest time that is still lower than the completed time
    let indexToRemove = -1;
    let maxTime = -30;
    remainingExercises.forEach((expectedExercise, index) => {
      if (
        expectedExercise.name.trim() === completedExercise.workout_type.name.trim() &&
        expectedExercise.time <= completedTime &&
        expectedExercise.time > maxTime
      ) {
        console.log(completedExercise,"WE've FOUND ONE ")
        indexToRemove = index;
        maxTime = expectedExercise.time;
      } 
    });

    // Remove the expected exercise from remainingExercises if a match is found
    if (indexToRemove !== -1) {
      remainingExercises.splice(indexToRemove, 1);
    }
  });
  return remainingExercises;
};

export function workout_category_to_color(category: workout_category) {
  switch (category) {
    case workout_category.cardio:
      return '#FF0000';
    case workout_category.flexibility:
      return '#00FF00';
    case workout_category.strength:
      return '#0000FF';
  }

}

export const endExercise = async(token:string,avg_heartrate?:number) =>{
  try{
    console.log("HERE IS THE BIG MONEY",avg_heartrate);
      const response = await fetch('https://fithub-backend-d06l.onrender.com/users/end_ex/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          body: JSON.stringify({avg_heartrate:avg_heartrate}),
          });
      if (!response.ok) {
          console.error("Failed to fetch token.");
          console.log("WHAT");
          return null;
      }
        const data = await response.json();
        console.log("PLANNNN",data);
        return data;
  }catch(error:any){
      console.log(error);
      console.log("WHAT1");
      return null;
  }
}

interface exportedExercise {
  name?: string;
  type?: string;
  time?: number;
  days?: number;
}


export const setUserPlan = async(token:string,plan:Plan) =>{
  let errorMessage = "success"
  let real_work:exportedExercise[] = []
  for(let i =0;i<plan.workout_days.length;i++){
    for(let j=0;j<plan.workout_days[i].length;j++){
      let expect:ExpectedExercise = plan.workout_days[i][j]
      let real = real_work.find((val)=> (val.name == expect.name) && val.time == expect.time)
      if(!real){
        real_work.push({
          name: expect.name,
          type: expect.type,
          days: 1 << i,
          time: expect.time
        });
      }else{
        if(real.days){
          real.days |= 1 << i;
        }
      }        
    }
  }
  
  let final_val = {
    workout_days:real_work,
    difficulty_level:plan.difficulty_level,
    plan_name:plan.plan_name,
    description:plan.description
  }

  try{
      const response = await fetch('https://fithub-backend-d06l.onrender.com/users/plan/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          body: JSON.stringify(final_val),
          });
      if (!response.ok) {
          console.error("Failed to fetch token.");
          return null;
      }
        const data = await response.json();
        console.log(data);
        return "success!";
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return null;
  }
}

export const getExercise = async(token:string) =>{
  let errorMessage = "success"
  try{
      const response = await fetch('https://fithub-backend-d06l.onrender.com/users/exercise_all/', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          }
          });
      if (!response.ok) {
          console.error("Failed to fetch token.");
          return [];
      } 
        const data = await response.json();
        let return_list:exerciseType[] = []
        for (let i=0;i<data.ex.length;i++){
          let ex =data.ex[i];
          let return_item:exerciseType = {
            start:string_to_date(ex.start),
            end:string_to_date(ex.end),
            workout_type:{
              name:ex.name,
              category:ex.category
            },
            expectedTime:ex.fuffilment,
            avg_heartrate:ex.avg_heartrate
          }
          return_list.push(return_item)
        }
        return return_list;
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return [];
  }
}



export const startExerciseDirect = async(token:string,exp:ExpectedExercise) =>{
  let errorMessage = "success"
  try{
      const response = await fetch('https://fithub-backend-d06l.onrender.com/users/strt_ex/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer "  + token
          },
          body: JSON.stringify(exp),
          });
      if (!response.ok) {
          console.error("Failed to fetch token.");
          return null;
      } 
        const data = await response.json();
        let return_list:exerciseType[] = []
        for (let i=0;i<data.ex.length;i++){
          let ex =data.ex[i];
          let return_item:exerciseType = {
            start:string_to_date(ex.start),
            end:string_to_date(ex.end),
            workout_type:{
              name:ex.name,
              category:ex.category
            },
            expectedTime:ex.fuffilment
          }
          return_list.push(return_item)
        }
        return return_list;
  }catch(error:any){
      console.log(error);
      errorMessage = error;
      return null;
  }
}
