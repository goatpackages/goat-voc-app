import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { guestsData } from '../../constants/data';

const filters = ['Todos', 'BLACK', 'PLATINUM', 'DIAMOND'];

export default function GuestsScreen() {
  const [filter, setFilter] = useState('Todos');
  const [guests, setGuests] = useState(guestsData);

  const filtered = filter === 'Todos' ? guests : guests.filter(g => g.package === filter);

  function toggleActive(id) {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, active: !g.active } : g));
  }

  return (
    <View style={styles.container}>
      <View style={styles.summary}>
        {['BLACK', 'PLATINUM', 'DIAMOND'].map(pkg => {
          const count = guests.filter(g => g.package === pkg).length;
          const accent = packages[pkg]?.accent || colors.white;
          return (
            <View key={pkg} style={styles.summaryItem}>
              <Text style={[styles.summaryNum, { color: accent }]}>{count}</Text>
              <Text style={styles.summaryLabel}>{packages[pkg]?.label || pkg}</Text>
            </View>
          );
        })}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filtersContent}>
        {filters.map(f => {
          const accent = packages[f]?.accent;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && { borderColor: accent || colors.white, backgroundColor: (accent || colors.white) + '15' }]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && { color: accent || colors.white }]}>{packages[f]?.label || f}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map(guest => {
          const accent = packages[guest.package]?.accent || colors.white;
          return (
            <View key={guest.id} style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={[styles.guestPkg, { color: accent }]}>{packages[guest.package]?.label || guest.package}</Text>
                <Text style={styles.guestName}>{guest.name}</Text>
                <Text style={styles.guestEmail}>{guest.email}</Text>
                <View style={styles.wristbandRow}>
                  <Text style={styles.wristbandId}>{guest.wristbandId}</Text>
                  {guest.checkedIn && <Text style={styles.checkedIn}>● CHECK-IN</Text>}
                </View>
              </View>
              <TouchableOpacity
                style={[styles.activeToggle, { borderColor: guest.active ? colors.success : colors.danger }]}
                onPress={() => toggleActive(guest.id)}
              >
                <Text style={[styles.activeText, { color: guest.active ? colors.success : colors.danger }]}>
                  {guest.active ? 'ATIVO' : 'INATIVO'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  summary: { flexDirection: 'row', backgroundColor: colors.surface, padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNum: { fontSize: 24, fontWeight: '300' },
  summaryLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 3, marginTop: 2 },
  filters: { maxHeight: 52, borderBottomWidth: 1, borderBottomColor: colors.border },
  filtersContent: { paddingHorizontal: 16, alignItems: 'center', gap: 8 },
  filterBtn: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 2 },
  filterText: { color: colors.creamDim, fontSize: 11, letterSpacing: 2 },
  list: { padding: 16, paddingBottom: 40 },
  card: { backgroundColor: colors.surface, padding: 16, marginBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  cardLeft: { flex: 1 },
  guestPkg: { fontSize: 9, letterSpacing: 4, marginBottom: 4 },
  guestName: { color: colors.white, fontSize: 16, marginBottom: 2 },
  guestEmail: { color: colors.creamDim, fontSize: 11, marginBottom: 6 },
  wristbandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  wristbandId: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
  checkedIn: { color: colors.success, fontSize: 9, letterSpacing: 2 },
  activeToggle: { borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6, marginLeft: 12 },
  activeText: { fontSize: 9, letterSpacing: 2, fontWeight: '600' },
});
