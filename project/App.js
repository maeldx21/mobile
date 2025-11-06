import { useState } from 'react';
import { View, StatusBar } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import AdotarScreen from './screens/AdotarScreen';
import PublicarScreen from './screens/PublicarScreen';

export default function App() {
  const [screen, setScreen] = useState('home');
  const [pets, setPets] = useState([]);

  // navegacao entre telas
  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B9D" />
      {screen === 'home' && <HomeScreen setScreen={setScreen} />}
      {screen === 'adotar' && (
        <AdotarScreen pets={pets} setPets={setPets} setScreen={setScreen} />
      )}
      {screen === 'publicar' && (
        <PublicarScreen pets={pets} setPets={setPets} setScreen={setScreen} />
      )}
    </View>
  );
}
