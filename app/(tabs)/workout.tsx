import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import { useApiContext } from '../../api/ApiContext';
import useHealthData from '../../api/HealthKit';
import { exerciseType } from '../../api/Exercise';
import { getTimeofExcercisesDone } from '../../api/Exercise';
import { feedType, getFriendFeed } from '../../api/Feed';
const styles = StyleSheet.create({
  heading: {
    flex: 1,
    backgroundColor: '#F6F7FB'
  },
  header: {
    backgroundColor: '#00B5EE',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20
  },
  box: {
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 30,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    color: '#000'
  },
  heartRateContainer: {
    backgroundColor: 'red',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 10,
  },
  heartRateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  workoutItem: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  boldText: {
    fontWeight: 'bold',
  },
  progressBar: {
    height: 7,  
    backgroundColor: '#00B5EE',  
    borderRadius: 2,  
  },
  progressBarContainer: {
    backgroundColor: 'red',  
    borderRadius: 2,
    overflow: 'hidden', 
    height: 4,
    marginVertical: 9,
    justifyContent: 'space-between'
  }
});

function renderWorkoutItem(item: exerciseType) {
  return (
    <View style={styles.workoutItem}>
    <Text style={[styles.text, styles.boldText]}>{item.workout_type.name}</Text>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <Text style={styles.text}>Start: {item.start?.toLocaleTimeString()}</Text>
        {item.end && <Text style={styles.text}>End: {item.end.toLocaleTimeString()}</Text>}
        <Text style={styles.text}>Duration: {item.expectedTime} min</Text>
      </View>
      <View style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Text style={styles.text}>Heart Rate</Text>
        <View style={styles.heartRateContainer}>
          <Text style={styles.heartRateText}>{item.avg_heartrate}</Text>
        </View>
      </View>
    </View>
  </View>
    );
}

function getIndexOfDay(inputDate: Date): number {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const inputDateOnly = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
  const timeDiff = today.getTime() - inputDateOnly.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

  if (daysDiff < 0 || daysDiff > 30) {
    throw new Error("Input date is outside the range of the last 30 days.");
  }
  console.log("DAYS DIFF",daysDiff)
  return 30 - daysDiff;
}

export default function WorkoutPage() {
  const { exercises,exercisePlan,authToken,userData } = useApiContext();
  const [currentDate, setCurrentDate] = useState(new Date());
  const { steps,dailySteps } = useHealthData();
  const [friendFeed, setFriendFeed] = useState<feedType[]>([]);
  const screenWidth = Dimensions.get('window').width;

  const handleDateSelected = (date) => {
    setCurrentDate(new Date(date));
  };


  const isSameDay = (d1, d2) => {
    return new Date(d1).toDateString() === new Date(d2).toDateString();
  };
  

  useEffect(() => {
    console.log("EXERCISE DATA HERE:", (getTimeofExcercisesDone(exercises, currentDate) / getTimeofExcercisesDone(friendFeed, currentDate)));
    setCurrentDate(new Date());
  }, [exercises]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feed = await getFriendFeed(authToken);
        setFriendFeed(feed);
      } catch (error) {
        console.error('Error fetching friend feed:', error);
      }
    };
    fetchFeed();
  }, [userData]);

  return (
    <ScrollView style={styles.heading}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Health Data</Text>
      </View>
      <CalendarStrip
        style={{ height: 100, paddingTop: 20, paddingBottom: 10 }}
        dateNumberStyle={[styles.text, { fontSize: 10, fontWeight: 'bold' }]}
        dateNameStyle={styles.text}
        showMonth={false}
        updateWeek={true}
        selectedDate={currentDate}
        onDateSelected={handleDateSelected}
      />
      {exercises
        .filter(val => val.start && val.end && isSameDay(val.start, currentDate))
        .map(renderWorkoutItem)}
      <View style={styles.box}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Steps</Text>
        <Text style={[styles.text, {marginTop: 5, fontWeight: 'bold', fontSize: 20}]}>
          {dailySteps?.datasets[0].data[getIndexOfDay(currentDate)]}
        </Text>
      </View>

  
      <View >
        <View >
          <Text style={[styles.text, { fontWeight: 'bold' }]}>Compared to your friends</Text>
        </View>
      </View>
      <View style={styles.box}>
        <Text style={[styles.text, {fontWeight: 'bold'}]}>Time Spent Working Out</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar,{width: `${(getTimeofExcercisesDone(exercises, currentDate) / getTimeofExcercisesDone(friendFeed, currentDate)) * 100}%`}]}>
</View>
        </View>
      </View>
      <View style={{height: 20}}></View>
    </ScrollView>
  );
}

