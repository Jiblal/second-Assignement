import { View, Text, Pressable } from 'react-native'
import React, { useState, useEffect} from 'react'
import styles from '../style/style'
import { MaterialCommunityIcons } from '@expo/vector-icons';

//<MaterialCommunityIcons name="numeric-1-circle" size={24} color="black" />

const NBR_OF_DICES = 5;
let board =[];
const NBR_OF_Throws= 3;
const NBR_OF_Numeric_Circle= 6;
let NumberCircle =[]
const BONUS = 63;


export default function GameDetail() {
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft]= useState(NBR_OF_Throws);
    const [status, setStatus]= useState('Throw dices');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [selectedNumberCircle, setSelectedNumberCircle]= useState(new Array(NBR_OF_Numeric_Circle).fill(false))
    const [arraySum, setArraySum ]= useState(new Array(NBR_OF_Numeric_Circle).fill(0)) // Array for sum of selected points 
    const [tempArray, setTempArray]= useState(new Array(NBR_OF_DICES).fill(0)) // Array for Random number which is used to put value in ArraySum
    const [bonuspoints, setBonusPoints]= useState(BONUS);
    const [isPointSelected, setIsPointSelected]= useState(false) // used to find out if Numeric circle is selected when nbrOfThrowsLeft === 0 
    const [total, setTotal]= useState(0) // sum of all Arraysum Value
    
    getNumericCirlce()
    useEffect(()=>{
        if(nbrOfThrowsLeft === NBR_OF_Throws){
            console.log('Game started')
        }
        if(nbrOfThrowsLeft===0){
            setStatus('Select your points')
        }
        if(nbrOfThrowsLeft<0){
            setNbrOfThrowsLeft(NBR_OF_Throws-1)
        }
        // if(nbrOfThrowsLeft===0){
        //     setStatus('select your points')
        // }
       // console.log('from use effec after theow'+tempArray);
       // console.log("testing"+arraySum)
        calculationgTotal(arraySum)

        // comparing if game is over. It is compared by comparing all selected circle
         if(selectedNumberCircle.every((val)=>(val===true))){
            setStatus('Game Over. All Points are selected');
            setNbrOfThrowsLeft(0);
         }
        
    },[nbrOfThrowsLeft, tempArray,arraySum, total] );

    // calculating sum of Arraysum
    function calculationgTotal(arraySum){
        const sum =  arraySum.reduce((result,number)=> result+number);
        setTotal(sum)

        

     
    }

    const row=[]; // array of  random Dices
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
    const circleRow=[]; // array of numeric circle
    for (let i = 0; i < NBR_OF_Numeric_Circle; i++) {
        circleRow.push(
            <View key={'circle'+i}>
                <Text style={styles.arraySum}>{arraySum[i]}</Text>
            <Pressable
                key={"circleRow"+i}
                onPress={() => SelectNumericCircle(i)}>
                <MaterialCommunityIcons
                    name={NumberCircle[i]}
                    key={"circleRow1"+i}
                    size={50}
                    color={getCircleColor(i)}>
                </MaterialCommunityIcons>
            </Pressable>
            </View>
        )
        
    }
    
    // Dice color
    function getDiceColor(i) {
       return selectedDices[i] ? 'black':'steelblue';
    }
    // numeric circle color
    function getCircleColor(i) {
        return selectedNumberCircle[i] ? 'black':'steelblue';
    }
    // toggle dice
    function selectDice(i) {
        if(nbrOfThrowsLeft===3){
            setStatus('You have to throw dice first')
        }
        else{
        
            let val= tempArray[i]
            // verifying if the Number is already selected, if yes, user is not allowed to select 
            // that number
            if(selectedNumberCircle[val-1]){
                setStatus('You have already selected '+ val)
            }
            else{

                let dices =[... selectedDices];
                dices[i]= selectedDices[i]? false : true;
                setSelectedDices(dices)
            }
        }
        
    }
    // toggle Numeric Circle
    function SelectNumericCircle( i) {
        //just before selecting  numeric circle add sum of selected value;
        // If else statement to varify if selected nurmber is same as selected dices
        let value= 0;
        let allow = false;
        let index= null;
        for(let j=0; j<tempArray.length; j++){
            if(selectedDices[j]){
                value= tempArray[j];
                index= j
                break;
            }
            
        }
        if(value===(i+1)&& selectedDices[index]){
            allow= true;
        }
        if(allow && nbrOfThrowsLeft===0){
            
            let localSum =0
           // console.log('TemArrary from select numeirfc '+ tempArray)
            for (let i = 0; i < tempArray.length; i++) {
            if(selectedDices[i]){
                    localSum += tempArray[i]
                }
                // new logic
            else if(!selectedDices[i] && nbrOfThrowsLeft===0 && tempArray[i]===value ){
                localSum += tempArray[i]

            }
            }
            // set localsum value in to the array of  sumArray
            //console.log('local sum:'+ localSum)
            let tempSumArray=[...arraySum];
            tempSumArray[i]= localSum;
            setArraySum(tempSumArray);
            
            // point selected is set true
            setIsPointSelected(true)
            // clear tempArray and selectedDices arrays
            clear();
            
            // toggle Numeric circle
            let NumberCircles =[...selectedNumberCircle];
            NumberCircles[i] = selectedNumberCircle[i]?false:true;
            setSelectedNumberCircle(NumberCircles)
            // sumOfDices(sum, i)
            
        }
        else{
            if(!allow && nbrOfThrowsLeft===0){
                setStatus(' Selected Nummeric circle doesnot match with selected point. \n Select numeric circle'+` ${value}`)
               // point 0 is now possible
                
                    let NumberCircles =[...selectedNumberCircle];
                    NumberCircles[i] = selectedNumberCircle[i]?false:true;
                    setSelectedNumberCircle(NumberCircles)

                    setIsPointSelected(true)
                    // clear tempArray and selectedDices arrays
                    clear();
                
            }
            else{
                setStatus('Throw 3 times before setting points')
            }
        }
        

    }
    

    
    // thow dices call by button
    function throwDieces(){
        
        if(nbrOfThrowsLeft===0 && !isPointSelected){
            setStatus('Select your point before next throw')
        }
  
        else{
            if(selectedNumberCircle.every((val)=>(val===true))){
                restart()  }
            // bringing IsPoint to it's original state
            setIsPointSelected(false)
                    
            // temporarly array for this local area
            let letTemp = [];
            letTemp=[...tempArray];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                
                if(!selectedDices[i]){
                    let randomNumber = Math.floor(Math.random()*6+1);
                    board[i]= 'dice-'+randomNumber;
                    //saving all ramdom value in a array so that latter we can calculate it's value
                    
                    letTemp[i]= randomNumber;
                    //console.log('at throw dices:'+letTemp);
                    
                }
             
            }
            setTempArray( ()=>{setTempArray(letTemp)});
              // show one step behind problem: solved by updating TempArray in UseEffect   
            //console.log('after random value:'+tempArray);
                    
            
            setNbrOfThrowsLeft(nbrOfThrowsLeft-1)
            // change it to select dices
            setStatus('Select and throw dices again')
        }
    }


    function getNumericCirlce(){
        for (let i = 0; i < NBR_OF_Numeric_Circle; i++) {
            NumberCircle[i]= 'numeric-'+(i+1).toString() +'-circle' ;
        }
    }
    
    
    
   
    function clear(){
        setTempArray(new Array(NBR_OF_DICES).fill(0));
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        //throwDieces()
        setNbrOfThrowsLeft(NBR_OF_Throws)
        setStatus('throw your Dices')
    }
    
    function restart(){
        setBonusPoints(63);
        board= [];
        NumberCircle =[];
        setSelectedNumberCircle(new Array(NBR_OF_Numeric_Circle).fill(false));
        setArraySum(new Array(NBR_OF_Numeric_Circle).fill(0));
        

    }
        

  return (
    <View >
      <View style={styles.flex}>{row}</View>
      <Text style={styles.gameinfo}> Throws left:{nbrOfThrowsLeft} </Text>
      <Text style={styles.gameinfo} > {status}</Text>
      <Pressable style={styles.button}
        onPress={()=> throwDieces()}  >
        <Text >Throw dices</Text>
       </Pressable>
       <Text style={styles.total}>Total:{total} </Text>
       <Text>{(bonuspoints-total)<=0?
       `you get your bonus`
       :`you are ${bonuspoints-total} points away from bonus`}
       </Text>

       <View style={styles.flex}>
           {circleRow}
       </View>
     
    </View>
  )
}