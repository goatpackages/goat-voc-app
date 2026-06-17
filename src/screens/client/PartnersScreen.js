import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { colors, packages, radius } from '../../constants/theme';
import { partnersData } from '../../constants/data';

const partnerImages = {
  1: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80',
  2: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80',
  3: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&q=80',
  4: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=400&q=80',
  5: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80',
  6: 'https://images.unsplash.com/photo-1571266028243-d220c6a454c0?w=400&q=80',
};

const categories = ['Todos', 'Beach Club', 'Restaurante', 'Bar', 'Club', 'Academia', 'Experiência'];

export default function PartnersScreen({ user }) {
  const [filter, setFilter] = useState('Todos');
  const accent = packages[user.package]?.accent || colors.gold;
  const available = partnersData.filter(p => p.access.includes(user.package));
  const filtered = filter === 'Todos' ? available : available.filter(p => p.category === filter);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filtersContent}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, filter === cat && { borderColor: accent, backgroundColor: accent + '18' }]}
            onPress={() => setFilter(cat)}
          >
            <Text style={[styles.filterText, filter === cat && { color: accent }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <Text style={styles.accessNote}>
          Benefícios disponíveis para a <Text style={{ color: accent }}>{packages[user.package]?.label || user.package}</Text>
        </Text>
        {filtered.map(partner => (
          <TouchableOpacity key={partner.id} style={styles.card} activeOpacity={0.9}>
            <ImageBackground
              source={{ uri: partnerImages[partner.id] }}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
            >
              <View style={styles.cardOverlay}>
                <View style={[styles.discountBadge, { backgroundColor: accent }]}>
                  <Text style={styles.discountText}>{partner.discount}</Text>
                </View>
              </View>
            </ImageBackground>
            <View style={styles.cardBody}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.partnerCategory}>{partner.category}</Text>
                  <Text style={styles.partnerName}>{partner.name}</Text>
                  <Text style={styles.partnerAddress}>{partner.address}</Text>
                </View>
              </View>
              <View style={styles.cardBottom}>
                <Text style={styles.accessLabel}>ACESSO:</Text>
                {partner.access.map(p => (
                  <Text key={p} style={[styles.accessTag, { color: packages[p]?.accent || colors.white }]}>{packages[p]?.label || p}</Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        {filtered.length === 0 && <Text style={styles.empty}>Nenhum parceiro nesta categoria.</Text>}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  filters: { maxHeight: 56, borderBottomWidth: 1, borderBottomColor: colors.border },
  filtersContent: { paddingHorizontal: 16, alignItems: 'center', gap: 8 },
  filterBtn: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  filterText: { color: colors.creamDim, fontSize: 11, letterSpacing: 1 },
  list: { padding: 16, paddingBottom: 40, gap: 14 },
  accessNote: { color: colors.creamDim, fontSize: 12, marginBottom: 6, lineHeight: 18 },
  card: { backgroundColor: colors.card, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  cardImage: { height: 160 },
  cardImageStyle: { borderRadius: 0 },
  cardOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', padding: 14, justifyContent: 'flex-end', alignItems: 'flex-end' },
  discountBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  discountText: { color: colors.black, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  cardBody: { padding: 14 },
  cardTop: { marginBottom: 10 },
  partnerCategory: { color: colors.creamDim, fontSize: 9, letterSpacing: 3, marginBottom: 3 },
  partnerName: { color: colors.white, fontSize: 16, fontWeight: '500', marginBottom: 3 },
  partnerAddress: { color: colors.creamDim, fontSize: 11, lineHeight: 16 },
  cardBottom: { flexDirection: 'row', alignItems: 'center', gap: 8, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10 },
  accessLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 2 },
  accessTag: { fontSize: 9, letterSpacing: 2, fontWeight: '600' },
  empty: { color: colors.creamDim, textAlign: 'center', marginTop: 40, fontSize: 13 },
});
