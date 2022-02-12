import { View, Text, Pressable } from 'react-native'
import React, { useState, useEffect} from 'react'
import styles from '../style/style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
//<MaterialCommunityIcons name="numeric-1-circle" size={24} color="black" />

const NBR_OF_DICES = 5;
let board =[];
const NBR_OF_Throws= 5;
const NBR_OF_Numeric_Circle= 6;
let NumberCircle =[]
export default function GameDetail() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft]= useState(NBR_OF_Throws);
    const [sum, setSum  ]= useState(0);
    const [status, setStatus]= useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(6).fill(0));
    const [arraySum, setArraySum ]= useState(new Array())



    const row=[];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row"+i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row"+i}
                    size={50}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        )
        
    }
    const circleRow=[];
    for (let i = 0; i < NBR_OF_Numeric_Circle; i++) {
        circleRow.push(
            <Pressable
                key={"row"+i}
                onPress={() => console.log('selectdice(i)'+ i)}>
                <MaterialCommunityIcons
                    name={NumberCircle[i]}
                    key={"row"+i}
                    size={50}
                    color={getDiceColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
        )
        
    }
    

    function getDiceColor(i) {
        if(NumberCircle.every((val, i, arr)=> val=== arr[0])){
            return 'orange'
        }
        else{
            return selectedDices[i] ? 'black':'steelblue';
        }
    }
    function getCircleColor(i) {
        if(board.every((val, i, arr)=> val=== arr[0])){
            return 'orange'
        }
        else{
            return selectedDices[i] ? 'black':'steelblue';
        }
    }

    function selectDice(i) {
        console.log('pressed button'+ i+1)
        let dices =[... selectedDices];
        dices[i]= selectedDices[i]? false : true;
        console.log(dices[i])
        setSelectedDices(dices)
        
    }

    function throwDieces(){
        // temporarly
      
        for (let i = 0; i < NBR_OF_DICES; i++) {
            if(!selectedDices[i]){
                let randomNumnber = Math.floor(Math.random()*6+1);
                board[i]= 'dice-'+randomNumnber
            }
        }
        setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
        
    }

    function getNumericCirlce(){
        for (let i = 0; i < NBR_OF_Numeric_Circle; i++) {
            NumberCircle[i]= 'numeric-'+i.toString() +'-circle' ;
        }
    }
    
    useEffect(()=>{
        
        if(nbrOfThrowsLeft === NBR_OF_Throws){
            setStatus('game is not started yet')
        }
        if(nbrOfThrowsLeft<0){
            setNbrOfThrowsLeft(NBR_OF_Throws-1)
        }

        getNumericCirlce()
    },[nbrOfThrowsLeft] );
  return (
    <View>
      <View style={styles.flex} > {row}</View>
      <Text> Throws left:{nbrOfThrowsLeft} </Text>
      <Text> game Status</Text>
      <Pressable style={styles.button}
        onPress={()=> throwDieces()}  >
        <Text>Throw dices</Text>
       </Pressable>
       <Text>Total: </Text>
       <Text>SAtaus of the bonus point and reminder </Text>

       <View style={styles.flex}>
           <Text >points above sticker</Text>
           {circleRow}
       </View>
     
    </View>
  )
}