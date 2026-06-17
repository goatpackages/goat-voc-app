import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import ClientTabs from './src/navigation/ClientTabs';
import TeamTabs from './src/navigation/TeamTabs';

const navTheme = {
  dark: true,
  colors: {
    primary: '#ffffff',
    background: '#0a0a0a',
    card: '#161616',
    text: '#ffffff',
    border: 'rgba(255,255,255,0.09)',
    notification: '#c9a84c',
  },
  fonts: {
    regular: { fontFamily: 'System', fontWeight: '400' },
    medium:  { fontFamily: 'System', fontWeight: '500' },
    bold:    { fontFamily: 'System', fontWeight: '700' },
    heavy:   { fontFamily: 'System', fontWeight: '900' },
  },
};

export default function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return (
      <>
        <StatusBar style="light" />
        <LoginScreen onLogin={setUser} />
      </>
    );
  }

  return (
    <NavigationContainer theme={navTheme}>
      <StatusBar style="light" />
      {user.role === 'client'
        ? <ClientTabs user={user} onLogout={() => setUser(null)} />
        : <TeamTabs onLogout={() => setUser(null)} />
      }
    </NavigationContainer>
  );
}
