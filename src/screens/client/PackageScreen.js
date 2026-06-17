import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { packagesData } from '../../constants/data';

export default function PackageScreen({ user }) {
  const pkg = packagesData[user.package];
  const accent = packages[user.package]?.accent || colors.white;
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.header, { borderBottomColor: accent + '33' }]}>
        <Text style={styles.packageName}>{packages[user.package]?.label || user.package}</Text>
        <Text style={styles.tagline}>{pkg.tagline}</Text>
      </View>

      <View style={styles.spotsRow}>
        <View style={styles.spotBox}>
          <Text style={[styles.spotNum, { color: accent }]}>{pkg.spots}</Text>
          <Text style={styles.spotLabel}>vagas totais</Text>
        </View>
        <View style={[styles.spotDivider, { backgroundColor: accent + '22' }]} />
        <View style={styles.spotBox}>
          <Text style={[styles.spotNum, { color: pkg.spotsLeft === 0 ? colors.danger : accent }]}>
            {pkg.spotsLeft === 0 ? 'Esgotado' : pkg.spotsLeft}
          </Text>
          <Text style={styles.spotLabel}>{pkg.spotsLeft === 0 ? '' : 'restantes'}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>O QUE ESTÁ INCLUSO</Text>

      {pkg.includes.map((cat, i) => (
        <View key={i} style={styles.categoryBlock}>
          <TouchableOpacity
            style={[styles.categoryHeader, { borderLeftColor: accent }]}
            onPress={() => setOpenCategory(openCategory === i ? null : i)}
          >
            <Text style={styles.categoryName}>{cat.category}</Text>
            <Text style={[styles.chevron, { color: accent }]}>{openCategory === i ? '−' : '+'}</Text>
          </TouchableOpacity>
          {openCategory === i && (
            <View style={styles.itemsList}>
              {cat.items.map((item, j) => (
                <View key={j} style={styles.itemRow}>
                  <Text style={[styles.bullet, { color: accent }]}>•</Text>
                  <Text style={styles.itemText}>{item}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}

      <View style={[styles.priceBox, { borderColor: accent + '44' }]}>
        <Text style={styles.priceLabel}>VALOR DO PACOTE</Text>
        <Text style={[styles.price, { color: accent }]}>{pkg.price}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  content: { paddingBottom: 40 },
  header: { padding: 28, paddingTop: 20, borderBottomWidth: 1 },
  packageName: { color: colors.white, fontSize: 36, fontWeight: '300', letterSpacing: 6 },
  tagline: { color: colors.creamDim, fontSize: 13, marginTop: 8, lineHeight: 20 },
  spotsRow: { flexDirection: 'row', margin: 24, backgroundColor: colors.surface, borderRadius: 2 },
  spotBox: { flex: 1, alignItems: 'center', paddingVertical: 18 },
  spotNum: { fontSize: 28, fontWeight: '300', letterSpacing: 2 },
  spotLabel: { color: colors.creamDim, fontSize: 10, letterSpacing: 2, marginTop: 4 },
  spotDivider: { width: 1, marginVertical: 12 },
  sectionTitle: { color: colors.creamDim, fontSize: 10, letterSpacing: 4, marginHorizontal: 24, marginBottom: 16 },
  categoryBlock: { marginHorizontal: 24, marginBottom: 2 },
  categoryHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderLeftWidth: 2, paddingLeft: 14, backgroundColor: colors.surface, paddingRight: 16 },
  categoryName: { color: colors.white, fontSize: 11, letterSpacing: 3 },
  chevron: { fontSize: 20, fontWeight: '300' },
  itemsList: { backgroundColor: colors.surfaceAlt, paddingHorizontal: 20, paddingVertical: 14 },
  itemRow: { flexDirection: 'row', marginBottom: 10 },
  bullet: { fontSize: 14, marginRight: 10, lineHeight: 20 },
  itemText: { color: colors.cream, fontSize: 13, lineHeight: 20, flex: 1 },
  priceBox: { margin: 24, borderWidth: 1, padding: 20, alignItems: 'center', marginTop: 28 },
  priceLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 8 },
  price: { fontSize: 28, fontWeight: '300', letterSpacing: 4 },
});
