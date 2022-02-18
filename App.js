
import { View, Text } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer'
import GameBoard from './components/GameDetail'
import styles from './style/style'
export default function App() {
  return (
    <View style={styles.container}>
     <Header/>
      <GameBoard/>
      <Footer/>
    </View>
     
   
  );
}


