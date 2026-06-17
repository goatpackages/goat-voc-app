import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { colors, packages } from '../constants/theme';
import HomeScreen from '../screens/client/HomeScreen';
import PackageScreen from '../screens/client/PackageScreen';
import WristbandScreen from '../screens/client/WristbandScreen';
import ScheduleScreen from '../screens/client/ScheduleScreen';
import MapScreen from '../screens/client/MapScreen';
import PartnersScreen from '../screens/client/PartnersScreen';
import NotificationsScreen from '../screens/client/NotificationsScreen';
import ProfileScreen from '../screens/client/ProfileScreen';
import WaitlistStatusScreen from '../screens/client/WaitlistStatusScreen';
import { notificationsData } from '../constants/data';

const Tab = createBottomTabNavigator();

const icons = {
  Home: '⌂',
  Pacote: '◈',
  Agenda: '◎',
  Pulseira: '◉',
  Mapa: '⊕',
  Parceiros: '◇',
  Avisos: '◬',
  Espera: '◫',
  Perfil: '○',
};

export default function ClientTabs({ user, onLogout }) {
  const accent = packages[user.package]?.accent || colors.gold;
  const unread = notificationsData.filter(n => !n.read).length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <View>
            <Text style={{ fontSize: 16, color: focused ? accent : colors.creamDim }}>{icons[route.name]}</Text>
            {route.name === 'Avisos' && unread > 0 && (
              <View style={{ position: 'absolute', top: -3, right: -6, backgroundColor: colors.gold, borderRadius: 5, width: 10, height: 10 }} />
            )}
          </View>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: 8, letterSpacing: 1, color: focused ? accent : colors.creamDim, marginBottom: 4 }}>{route.name.toUpperCase()}</Text>
        ),
        tabBarStyle: { backgroundColor: '#0e0e0e', borderTopColor: colors.border, height: 64 },
        headerStyle: { backgroundColor: colors.black, borderBottomColor: colors.border, borderBottomWidth: 1 },
        headerTintColor: colors.white,
        headerTitleStyle: { fontSize: 11, letterSpacing: 4, fontWeight: '400', color: accent },
        headerShown: route.name === 'Home' ? false : true,
      })}
    >
      <Tab.Screen name="Home" options={{ title: 'GOAT' }}>
        {() => <HomeScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Pacote" options={{ title: 'MEU PACOTE' }}>
        {() => <PackageScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Agenda" options={{ title: 'AGENDA' }}>
        {() => <ScheduleScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Pulseira" options={{ title: 'PULSEIRA' }}>
        {() => <WristbandScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Mapa" options={{ title: 'MAPA RIO' }}>
        {() => <MapScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Parceiros" options={{ title: 'PARCEIROS' }}>
        {() => <PartnersScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Avisos" options={{ title: 'NOTIFICAÇÕES' }}>
        {() => <NotificationsScreen />}
      </Tab.Screen>
      <Tab.Screen name="Espera" options={{ title: 'LISTA DE ESPERA' }}>
        {() => <WaitlistStatusScreen user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Perfil" options={{ title: 'MEU PERFIL' }}>
        {() => <ProfileScreen user={user} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
