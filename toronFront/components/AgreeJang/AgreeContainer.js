import React from "react";
import { StyleSheet, Text, View, StatusBar, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useState, useEffect } from "react";
import axios from 'axios';
import AgreeCommentList from "./AgreeCommentList";

const AgreeContainer =({})=>{
  const styles = StyleSheet.create({
        container: {
            // flex: 1,
            paddingLeft: 25,
            paddingRight: 25,
            marginTop: 15,
            alignItems: 'center',
            justifyContent: 'center',
            
          },
        
          hapBox: {
            backgroundColor: '#EFEFEF',
            width: 90,
            padding: 3,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginBottom: 12,
            marginTop: 5,
          },
          hap:{
            fontSize: 10
          },
          goRight: {
            alignItems: 'flex-end'
          },
          textBox:{
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 15,
            paddingRight: 15
          },
          text:{
            fontSize: 17,
            color: 'black',
            fontWeight: '900'
          },
          contentBox:{
            backgroundColor: 'white',
            // flex: 5,
            flexShrink: 1,
            flexBasis: '0%',
            flexGrow: 1,
            padding: 15,
            borderRadius: 15,
            
            // css에서 하던 shadow와 비슷하지만 사용 방법이 다름 
            // ios는 아래 방법 대로, android는 두 번째 방법 대로 설정해 줘야 함
            ...Platform.select({
              ios:{
                shadowColor: '#B3B3B3',
                shadowOffset: {width: 2, height: 2, },
                shadowOpacity: 0.2,
                shadowRadius: 10,
              },
              android:{
                elevation: 20,
              }
            })
        
          },
          AgreeButton:{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginBottom: 10,
            height: 50
          },
          deadLineBox:{
            alignItems: 'center',
            justifyContent: 'center',
          },
          goodImage:{
            width: 30,
            height: 30
          },
          badImage:{
            width: 30,
            height: 30
          },
          AgreeBox:{
            alignItems: 'center',
            justifyContent: 'center',
          },
          disAgreeBox:{
            marginLeft: 30,
            alignItems: 'center',
            justifyContent: 'center',
          },
          Agree:{
            fontSize: 13,
            margin: 3,
            fontWeight: '600'
          },
          disAgree:{
            fontSize: 13,
            margin: 3,
            fontWeight: '600'
          },
          deadLineText:{
            color: '#B3B3B3',
            fontSize: 10,
            marginBottom: 23
          }
    });
  
    // api에게 받아온 값을 변경할 useState()
    const [ chatData, setChatData ] = useState('');
    // 마운트 
    useEffect(()=>{
      const fetchData = async () => {
        try{
          // 아래 서버로부터 응답 받음 
            const response = await axios.get('htt://localhost:3000/getRandomDebateTopic');
          // 받은 값을 chatData에 부여해 주기 위해 setChatData로 전송   
            setChatData(response.data.chatData);
        }catch(error){
            console.log(error);
        }
      };
      fetchData();
    }, []); 
    
    
    return(
        <View style={[styles.container,{flexDirection: 'row',}]}>
      

        <View style={styles.contentBox}>
          <View style={styles.goRight}>
            <View style={styles.hapBox}>
              <Text style={styles.hap}>현재 n명 참여</Text>
            </View>
          </View>
        
          <ScrollView style={styles.textBox}>
            {/* // 서버로 전송 받은 채팅 데이터 화면에 출력 */}
            {/* <Text style={styles.text}>{chatData}</Text> */}
            <Text style={styles.text}>대한민국의 장애인 복지 정책은 현재 만족스러운 수준인가용?</Text>
          </ScrollView>

          <View style={styles.AgreeButton}>
          <TouchableOpacity style={styles.AgreeBox}>
            <Image style={styles.goodImage} source={require('../../assets/good.png')}></Image>
            <Text style={styles.Agree}>찬성</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.disAgreeBox}>
            <Image style={styles.badImage} source={require('../../assets/bad.png')}></Image>
            <Text style={styles.disAgree}>반대</Text>
          </TouchableOpacity>
          </View>

          <View style={styles.deadLineBox}>
            <Text style={styles.deadLineText}>n일 뒤에 종료됩니다.</Text>
         </View>
         </View>

          
          <StatusBar style="auto" />
          
      </View>
    )
}

export default AgreeContainer;