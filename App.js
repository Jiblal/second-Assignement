
import { View } from 'react-native';
import Header from './components/Header';
import Footer from './components/Footer'
import GameBoard from './components/GameDetail'

export default function App() {
  return (
    <View >
     <Header/>
      <GameBoard/>
     <Footer/>
    </View>
  );
}


