import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { partnersData } from '../../constants/data';

// MapView só disponível em device/emulator com expo-maps configurado
let MapView, Marker;
try {
  const Maps = require('react-native-maps');
  MapView = Maps.default;
  Marker = Maps.Marker;
} catch (_) {}

export default function MapScreen({ user }) {
  const [selected, setSelected] = useState(null);
  const accent = packages[user.package]?.accent || colors.white;
  const available = partnersData.filter(p => p.access.includes(user.package));

  return (
    <View style={styles.container}>
      {MapView ? (
        <MapView
          style={styles.map}
          initialRegion={{ latitude: -22.9800, longitude: -43.2200, latitudeDelta: 0.12, longitudeDelta: 0.12 }}
          mapType="satellite"
        >
          {available.map(p => (
            <Marker
              key={p.id}
              coordinate={p.coords}
              onPress={() => setSelected(p)}
              pinColor={accent}
            />
          ))}
        </MapView>
      ) : (
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderText}>Mapa disponível no dispositivo</Text>
          <Text style={styles.mapPlaceholderSub}>Execute no Expo Go para ver o mapa</Text>
        </View>
      )}

      {selected && (
        <View style={[styles.popup, { borderTopColor: accent }]}>
          <TouchableOpacity style={styles.popupClose} onPress={() => setSelected(null)}>
            <Text style={styles.popupCloseText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.popupCategory}>{selected.category}</Text>
          <Text style={styles.popupName}>{selected.name}</Text>
          <Text style={styles.popupAddress}>{selected.address}</Text>
          <View style={[styles.popupDiscount, { borderColor: accent }]}>
            <Text style={[styles.popupDiscountText, { color: accent }]}>{selected.discount}</Text>
          </View>
        </View>
      )}

      <View style={styles.legend}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.legendContent}>
          {available.map(p => (
            <TouchableOpacity key={p.id} style={styles.legendItem} onPress={() => setSelected(p)}>
              <Text style={styles.legendDot}>●</Text>
              <Text style={styles.legendName}>{p.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  map: { flex: 1 },
  mapPlaceholder: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  mapPlaceholderText: { color: colors.white, fontSize: 16, marginBottom: 8 },
  mapPlaceholderSub: { color: colors.creamDim, fontSize: 12 },
  popup: { position: 'absolute', bottom: 80, left: 16, right: 16, backgroundColor: colors.surface, padding: 20, borderTopWidth: 2 },
  popupClose: { position: 'absolute', top: 12, right: 16 },
  popupCloseText: { color: colors.creamDim, fontSize: 22 },
  popupCategory: { color: colors.creamDim, fontSize: 9, letterSpacing: 3, marginBottom: 4 },
  popupName: { color: colors.white, fontSize: 18, marginBottom: 4 },
  popupAddress: { color: colors.creamDim, fontSize: 12, marginBottom: 12 },
  popupDiscount: { borderWidth: 1, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6 },
  popupDiscountText: { fontSize: 11, letterSpacing: 2, fontWeight: '600' },
  legend: { height: 52, borderTopWidth: 1, borderTopColor: colors.border, backgroundColor: colors.black },
  legendContent: { paddingHorizontal: 16, alignItems: 'center', gap: 16 },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { color: colors.gold, fontSize: 10 },
  legendName: { color: colors.creamDim, fontSize: 11 },
});
