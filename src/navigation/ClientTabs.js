import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from 'react-native';
import { colors, packages } from '../constants/theme';

import HomeScreen         from '../screens/client/HomeScreen';
import PackageScreen      from '../screens/client/PackageScreen';
import WristbandScreen    from '../screens/client/WristbandScreen';
import CashlessScreen     from '../screens/client/CashlessScreen';
import ScheduleScreen     from '../screens/client/ScheduleScreen';
import WaitlistStatusScreen from '../screens/client/WaitlistStatusScreen';
import MapScreen          from '../screens/client/MapScreen';
import PartnersScreen     from '../screens/client/PartnersScreen';
import NotificationsScreen from '../screens/client/NotificationsScreen';
import ProfileScreen      from '../screens/client/ProfileScreen';
import ContactScreen      from '../screens/client/ContactScreen';
import { notificationsData } from '../constants/data';

const Tab   = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const stackHeader = (accent) => ({
  headerStyle: { backgroundColor: colors.black },
  headerTintColor: colors.white,
  headerTitleStyle: { fontSize: 11, letterSpacing: 4, fontWeight: '400', color: accent },
  headerBackTitleVisible: false,
});

/* ── Stacks por aba ── */
function HomeStack({ user }) {
  const accent = packages[user.package]?.accent || colors.gold;
  return (
    <Stack.Navigator screenOptions={{ ...stackHeader(accent), headerShown: false }}>
      <Stack.Screen name="HomeMain">{() => <HomeScreen user={user} />}</Stack.Screen>
    </Stack.Navigator>
  );
}

function PacoteStack({ user }) {
  const accent = packages[user.package]?.accent || colors.gold;
  return (
    <Stack.Navigator screenOptions={stackHeader(accent)}>
      <Stack.Screen name="PacoteMain" options={{ title: 'MEU PACOTE' }}>
        {() => <PackageScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Pulseira" options={{ title: 'PULSEIRA' }}>
        {() => <WristbandScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Cashless" options={{ title: 'CASHLESS' }}>
        {() => <CashlessScreen user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function AgendaStack({ user }) {
  const accent = packages[user.package]?.accent || colors.gold;
  return (
    <Stack.Navigator screenOptions={stackHeader(accent)}>
      <Stack.Screen name="AgendaMain" options={{ title: 'AGENDA' }}>
        {() => <ScheduleScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Espera" options={{ title: 'LISTA DE ESPERA' }}>
        {() => <WaitlistStatusScreen user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function ExplorarStack({ user }) {
  const accent = packages[user.package]?.accent || colors.gold;
  return (
    <Stack.Navigator screenOptions={stackHeader(accent)}>
      <Stack.Screen name="Parceiros" options={{ title: 'PARCEIROS' }}>
        {() => <PartnersScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Mapa" options={{ title: 'MAPA RIO' }}>
        {() => <MapScreen user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

function ContaStack({ user, onLogout }) {
  const accent = packages[user.package]?.accent || colors.gold;
  return (
    <Stack.Navigator screenOptions={stackHeader(accent)}>
      <Stack.Screen name="Perfil" options={{ title: 'MEU PERFIL' }}>
        {() => <ProfileScreen user={user} onLogout={onLogout} />}
      </Stack.Screen>
      <Stack.Screen name="Contato" options={{ title: 'CONTATO' }}>
        {() => <ContactScreen user={user} />}
      </Stack.Screen>
      <Stack.Screen name="Avisos" options={{ title: 'NOTIFICAÇÕES' }}>
        {() => <NotificationsScreen />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

/* ── Tab icons ── */
const tabIcons = {
  Início:   '⌂',
  Pacote:   '◈',
  Agenda:   '◎',
  Explorar: '◇',
  Conta:    '○',
};

export default function ClientTabs({ user, onLogout }) {
  const accent = packages[user.package]?.accent || colors.gold;
  const unread = notificationsData.filter(n => !n.read).length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <View>
            <Text style={{ fontSize: 18, color: focused ? accent : colors.creamDim }}>
              {tabIcons[route.name]}
            </Text>
            {route.name === 'Conta' && unread > 0 && (
              <View style={{ position: 'absolute', top: -2, right: -5, backgroundColor: colors.gold, borderRadius: 5, width: 9, height: 9 }} />
            )}
          </View>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={{ fontSize: 9, letterSpacing: 1, color: focused ? accent : colors.creamDim, marginBottom: 6 }}>
            {route.name.toUpperCase()}
          </Text>
        ),
        tabBarStyle: { backgroundColor: '#0e0e0e', borderTopColor: colors.border, height: 68, paddingTop: 8 },
      })}
    >
      <Tab.Screen name="Início">
        {() => <HomeStack user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Pacote">
        {() => <PacoteStack user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Agenda">
        {() => <AgendaStack user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Explorar">
        {() => <ExplorarStack user={user} />}
      </Tab.Screen>
      <Tab.Screen name="Conta">
        {() => <ContaStack user={user} onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
