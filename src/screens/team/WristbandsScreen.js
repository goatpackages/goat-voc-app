import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { guestsData } from '../../constants/data';

export default function WristbandsScreen() {
  const [guests, setGuests] = useState(guestsData);
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState(null);

  const filtered = guests.filter(g =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.wristbandId.toLowerCase().includes(search.toLowerCase())
  );

  const totalActive = guests.filter(g => g.active).length;
  const totalChecked = guests.filter(g => g.checkedIn).length;

  function toggleActive(id) {
    setGuests(prev => prev.map(g => g.id === id ? { ...g, active: !g.active } : g));
    setDetail(prev => prev ? { ...prev, active: !prev.active } : null);
  }

  function simulateCheckin(id) {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const date = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}`;
    setGuests(prev => prev.map(g => g.id === id ? {
      ...g,
      checkedIn: true,
      checkinHistory: [{ event: 'Check-in manual', time, date }, ...g.checkinHistory],
    } : g));
    setDetail(prev => prev ? {
      ...prev,
      checkedIn: true,
      checkinHistory: [{ event: 'Check-in manual', time, date }, ...(prev.checkinHistory || [])],
    } : null);
  }

  if (detail) {
    const accent = packages[detail.package]?.accent || colors.white;
    const guest = guests.find(g => g.id === detail.id);
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setDetail(null)}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.detailContent}>
          <Text style={[styles.detailPkg, { color: accent }]}>{guest.package}</Text>
          <Text style={styles.detailName}>{guest.name}</Text>
          <Text style={styles.detailId}>{guest.wristbandId}</Text>

          <View style={styles.detailInfoBlock}>
            <InfoRow label="EMAIL" value={guest.email} />
            <InfoRow label="TELEFONE" value={guest.phone} />
            <InfoRow label="PULSEIRA" value={guest.wristbandId} accent={accent} />
            <InfoRow label="STATUS" value={guest.active ? 'ATIVA' : 'INATIVA'} color={guest.active ? colors.success : colors.danger} />
            <InfoRow label="CHECK-IN" value={guest.checkedIn ? 'REALIZADO' : 'PENDENTE'} color={guest.checkedIn ? colors.success : colors.creamDim} />
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionBtn, { borderColor: guest.active ? colors.danger : colors.success }]} onPress={() => toggleActive(guest.id)}>
              <Text style={[styles.actionBtnText, { color: guest.active ? colors.danger : colors.success }]}>
                {guest.active ? 'DESATIVAR PULSEIRA' : 'ATIVAR PULSEIRA'}
              </Text>
            </TouchableOpacity>
            {!guest.checkedIn && (
              <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.gold }]} onPress={() => simulateCheckin(guest.id)}>
                <Text style={[styles.actionBtnText, { color: colors.gold }]}>FAZER CHECK-IN</Text>
              </TouchableOpacity>
            )}
          </View>

          {guest.checkinHistory.length > 0 && (
            <View style={styles.historyBlock}>
              <Text style={styles.historyTitle}>HISTÓRICO DE ENTRADAS</Text>
              {guest.checkinHistory.map((h, i) => (
                <View key={i} style={styles.historyRow}>
                  <Text style={styles.historyEvent}>{h.event}</Text>
                  <Text style={styles.historyTime}>{h.date} · {h.time}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.success }]}>{totalActive}</Text>
          <Text style={styles.statLabel}>ATIVAS</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.danger }]}>{guests.length - totalActive}</Text>
          <Text style={styles.statLabel}>INATIVAS</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={[styles.statNum, { color: colors.gold }]}>{totalChecked}</Text>
          <Text style={styles.statLabel}>CHECK-IN</Text>
        </View>
      </View>

      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por nome ou ID..."
          placeholderTextColor={colors.creamDim}
        />
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {filtered.map(guest => {
          const accent = packages[guest.package]?.accent || colors.white;
          return (
            <TouchableOpacity key={guest.id} style={styles.card} onPress={() => setDetail(guest)}>
              <View style={styles.cardLeft}>
                <Text style={[styles.cardPkg, { color: accent }]}>{guest.package}</Text>
                <Text style={styles.cardName}>{guest.name}</Text>
                <Text style={styles.cardId}>{guest.wristbandId}</Text>
              </View>
              <View style={styles.cardRight}>
                <View style={[styles.statusPill, { borderColor: guest.active ? colors.success : colors.danger }]}>
                  <View style={[styles.statusDot, { backgroundColor: guest.active ? colors.success : colors.danger }]} />
                  <Text style={[styles.statusText, { color: guest.active ? colors.success : colors.danger }]}>
                    {guest.active ? 'ATIVA' : 'INATIVA'}
                  </Text>
                </View>
                {guest.checkedIn && <Text style={styles.checkedInTag}>● IN</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function InfoRow({ label, value, accent, color }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, accent && { color: accent }, color && { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  statsRow: { flexDirection: 'row', backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statNum: { fontSize: 26, fontWeight: '300' },
  statLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 3, marginTop: 2 },
  searchBox: { padding: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
  searchInput: { backgroundColor: colors.surface, color: colors.white, padding: 10, fontSize: 13, paddingHorizontal: 14 },
  list: { padding: 12, paddingBottom: 40, gap: 8 },
  card: { backgroundColor: colors.surface, padding: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLeft: {},
  cardPkg: { fontSize: 9, letterSpacing: 4, marginBottom: 4 },
  cardName: { color: colors.white, fontSize: 15, marginBottom: 2 },
  cardId: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
  cardRight: { alignItems: 'flex-end', gap: 6 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4 },
  statusDot: { width: 5, height: 5, borderRadius: 3 },
  statusText: { fontSize: 9, letterSpacing: 2 },
  checkedInTag: { color: colors.success, fontSize: 9, letterSpacing: 2 },
  backBtn: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  backText: { color: colors.creamDim, fontSize: 13 },
  detailContent: { padding: 24, paddingBottom: 48 },
  detailPkg: { fontSize: 10, letterSpacing: 5, marginBottom: 6 },
  detailName: { color: colors.white, fontSize: 26, fontWeight: '300', marginBottom: 4 },
  detailId: { color: colors.creamDim, fontSize: 12, letterSpacing: 3, marginBottom: 24 },
  detailInfoBlock: { borderWidth: 1, borderColor: colors.border, marginBottom: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
  infoValue: { color: colors.cream, fontSize: 12 },
  actionRow: { gap: 10, marginBottom: 24 },
  actionBtn: { borderWidth: 1, padding: 14, alignItems: 'center' },
  actionBtnText: { fontSize: 11, letterSpacing: 3 },
  historyBlock: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 20 },
  historyTitle: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 14 },
  historyRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  historyEvent: { color: colors.cream, fontSize: 12 },
  historyTime: { color: colors.creamDim, fontSize: 11 },
});
