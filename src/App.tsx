import React from 'react';
import { Text, View } from 'react-native';
import Dashboard from './pages/Dashboard';

const App: React.FC = () => {
  return (
    <View style={{ backgroundColor: '#e5e5e5', flex: 1 }}>
      <Dashboard />
    </View>
  );
}

export default App;