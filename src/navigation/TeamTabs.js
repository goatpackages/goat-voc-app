import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { colors } from '../constants/theme';
import DashboardScreen from '../screens/team/DashboardScreen';
import ScannerScreen from '../screens/team/ScannerScreen';
import GuestsScreen from '../screens/team/GuestsScreen';
import WristbandsScreen from '../screens/team/WristbandsScreen';
import WaitlistScreen from '../screens/team/WaitlistScreen';

const Tab = createBottomTabNavigator();

const icons = { Dashboard: '◈', Scanner: '◉', Hóspedes: '◇', Pulseiras: '◎', Espera: '◬' };

export default function TeamTabs({ onLogout }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 15, color: focused ? colors.gold : colors.creamDim }}>{icons[route.name]}</Text>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: 8, letterSpacing: 1, color: focused ? colors.gold : colors.creamDim, marginBottom: 4 }}>{route.name.toUpperCase()}</Text>
        ),
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border, height: 64 },
        headerStyle: { backgroundColor: colors.black, borderBottomColor: colors.border, borderBottomWidth: 1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontSize: 11, letterSpacing: 4, fontWeight: '400' },
        headerRight: () => (
          <Text onPress={onLogout} style={{ color: colors.creamDim, fontSize: 10, letterSpacing: 2, marginRight: 16 }}>SAIR</Text>
        ),
      })}
    >
      <Tab.Screen name="Dashboard" options={{ title: 'GOAT · EQUIPE' }} component={DashboardScreen} />
      <Tab.Screen name="Scanner" options={{ title: 'SCANNER' }} component={ScannerScreen} />
      <Tab.Screen name="Hóspedes" options={{ title: 'HÓSPEDES' }} component={GuestsScreen} />
      <Tab.Screen name="Pulseiras" options={{ title: 'PULSEIRAS' }} component={WristbandsScreen} />
      <Tab.Screen name="Espera" options={{ title: 'LISTA DE ESPERA' }} component={WaitlistScreen} />
    </Tab.Navigator>
  );
}
