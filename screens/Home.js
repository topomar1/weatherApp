import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity,RefreshControl} from 'react-native';
import { FontAwesome5, EvilIcons,Ionicons } from '@expo/vector-icons';


export default function Home(params) {
    const [weatherData, setWeatherData] = useState();
    
    async function getWeather(city = "Accra") {
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be34bce58d100edcccbd5177b4b4dc89`
        )
          .then((response) => response.json())
          .then((response) => {
            setWeatherData(response);
            console.log(response);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    
      const cities = ["Accra", "Kumasi", "London", "Tamale", "Berlin", "Denver"];
    
      function FTC(temp) {
        return temp - 273.15;
      }
    
      useEffect(() => {
        getWeather();
      }, []);


    
  return (
    <View style={styles.container}>
        <View style={{marginTop:50,flexDirection:"row", alignItems: "center"}}>
            <FontAwesome5 name="stream" size={20} color="white" />
            <Text style={{color: 'white',paddingLeft:70, fontSize:18,fontWeight:"bold"}}>Weather Forecast</Text>
        </View>

        <View style={{height:230, width:"100%", backgroundColor:"#1A1C47", borderRadius:25, marginTop:25}}>

            <View style={{marginTop:30,flexDirection:"row", alignItems: "center", justifyContent: 'space-between', paddingLeft:30, paddingRight:30}}> 
                <Text style={{color: 'white', fontSize:20, fontWeight:"bold"}}>Today</Text>
                <Text style={{color: 'white', fontSize:15}}>{new Date().toDateString()}</Text>
            </View>

            <View style={{marginTop:30,flexDirection:"row", alignItems: "center", justifyContent: 'space-between', paddingLeft:30, paddingRight:30}}> 
                <Text style={{color: 'white', fontSize:60}}>
                    {FTC(weatherData.main.temp).toFixed(1)} 
                <Text style={{color:"orange", fontSize:30}}>C</Text></Text>
                <Image source={require("../assets/wea.png")} style={{width:80, height:80, marginRight:25}}/>
            </View>

            <View style={{marginTop:26,flexDirection:"row", alignItems: "center", paddingLeft:30, paddingRight:30}}> 
                <EvilIcons name="location" size={25} color="orange" />
                <Text style={{color: 'white', fontSize:15, marginLeft:10}}>
                    {weatherData.name}
                </Text>
            </View>

        </View>

        <View style={{marginTop:15}}>
            <FlatList style={{marginTop:10}} 
             data={cities}
             renderItem={({item})=>(
             <TouchableOpacity 
              onPress={()=>{getWeather(item)}}
            
             style={{padding:15, marginBottom:10, justifyContent: 'space-between',alignItems: 'center',backgroundColor:"#1B1C49", flexDirection:"row"}}>
               <Text style={{color:"white"}}>{item }</Text>
               <Ionicons name ={
                   item === weatherData.name 
                   ? "radio-button-on" 
                   : "radio-button-off" 
                   } 
                   color="red"
                   size={15} />
             </TouchableOpacity>)} 
      
      />

        </View>
        
        
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101039',
    marginRight:20,
    marginLeft:20,
    
  },
});
