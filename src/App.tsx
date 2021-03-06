import 'react-native-gesture-handler';
import React from 'react';
import { Text, View } from 'react-native';
import Dashboard from './pages/Dashboard';
import Routes from './routes';

const App: React.FC = () => {
  return (
    <View style={{ backgroundColor: '#e5e5e5', flex: 1 }}>
      <Routes />
    </View>
  );
}

export default App;