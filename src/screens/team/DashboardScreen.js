import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { guestsData, packagesData } from '../../constants/data';

export default function DashboardScreen() {
  const total = guestsData.length;
  const active = guestsData.filter(g => g.active).length;
  const checkedIn = guestsData.filter(g => g.checkedIn).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.pageTitle}>VISÃO GERAL</Text>

      <View style={styles.statsRow}>
        <StatBox label="HÓSPEDES" value={total} color={colors.white} />
        <StatBox label="ATIVOS" value={active} color={colors.success} />
        <StatBox label="CHECK-IN" value={checkedIn} color={colors.gold} />
      </View>

      <Text style={styles.sectionTitle}>STATUS POR EDIÇÃO</Text>

      {['BLACK', 'PLATINUM', 'DIAMOND'].map(pkg => {
        const accent = packages[pkg]?.accent || colors.white;
        const pkgData = packagesData[pkg];
        const guests = guestsData.filter(g => g.package === pkg);
        const sold = pkgData.spots - pkgData.spotsLeft;
        const pct = Math.round((sold / pkgData.spots) * 100);

        return (
          <View key={pkg} style={styles.editionCard}>
            <View style={styles.editionHeader}>
              <Text style={[styles.editionName, { color: accent }]}>{packages[pkg]?.label || pkg}</Text>
            </View>

            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${pct}%`, backgroundColor: accent }]} />
            </View>

            <View style={styles.editionStats}>
              <Text style={styles.editionStat}><Text style={{ color: accent }}>{sold}</Text> / {pkgData.spots} vagas</Text>
              <Text style={[styles.editionPct, { color: accent }]}>{pct}%</Text>
            </View>

            <View style={styles.guestsMini}>
              {guests.map(g => (
                <View key={g.id} style={styles.guestMiniRow}>
                  <View style={[styles.guestDot, { backgroundColor: g.active ? colors.success : colors.danger }]} />
                  <Text style={styles.guestMiniName}>{g.name}</Text>
                  <Text style={styles.guestMiniId}>{g.wristbandId}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}

function StatBox({ label, value, color }) {
  return (
    <View style={styles.statBox}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  content: { padding: 20, paddingBottom: 40 },
  pageTitle: { color: colors.creamDim, fontSize: 10, letterSpacing: 5, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 10, marginBottom: 28 },
  statBox: { flex: 1, backgroundColor: colors.surface, padding: 16, alignItems: 'center' },
  statValue: { fontSize: 32, fontWeight: '300' },
  statLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 3, marginTop: 4 },
  sectionTitle: { color: colors.creamDim, fontSize: 10, letterSpacing: 4, marginBottom: 14 },
  editionCard: { backgroundColor: colors.surface, padding: 18, marginBottom: 12 },
  editionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  editionName: { fontSize: 13, letterSpacing: 3, fontWeight: '600' },
  barBg: { height: 2, backgroundColor: colors.border, marginBottom: 10 },
  barFill: { height: 2 },
  editionStats: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
  editionStat: { color: colors.creamDim, fontSize: 12 },
  editionPct: { fontSize: 12, fontWeight: '600' },
  guestsMini: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12, gap: 8 },
  guestMiniRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  guestDot: { width: 6, height: 6, borderRadius: 3 },
  guestMiniName: { color: colors.cream, fontSize: 12, flex: 1 },
  guestMiniId: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
});
