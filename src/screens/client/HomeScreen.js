import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Image,
  TouchableOpacity, TextInput, ImageBackground,
} from 'react-native';
import { colors, packages, radius } from '../../constants/theme';
import { packagesData, scheduleData, notificationsData, eventoEdicaoLabel } from '../../constants/data';

const packageImages = {
  BLACK:    'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
  PLATINUM: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  DIAMOND:  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
};

const allPackages = ['BLACK', 'PLATINUM', 'DIAMOND'];
const categories = ['Todos', 'Residência', 'Festas', 'Atividades', 'Parceiros'];

export default function HomeScreen({ user }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Todos');
  const accent = packages[user.package]?.accent || colors.gold;
  const unread = notificationsData.filter(n => !n.read).length;
  const today = scheduleData[user.package]?.[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Bem-vindo de volta</Text>
          <Text style={styles.headerName}>{user.name.split(' ')[0]} 👋</Text>
        </View>
        <View style={styles.headerRight}>
          {unread > 0 && (
            <View style={styles.notifWrap}>
              <Text style={styles.notifIcon}>🔔</Text>
              <View style={[styles.notifDot, { backgroundColor: accent }]} />
            </View>
          )}
          <Image source={require('../../../assets/logo.png')} style={styles.logoSmall} resizeMode="contain" />
        </View>
      </View>

      {/* Search bar */}
      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar experiências, parceiros..."
          placeholderTextColor={colors.creamDim}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Category chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow} contentContainerStyle={styles.chipsContent}>
        {categories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.chip, category === cat && { backgroundColor: accent, borderColor: accent }]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.chipText, category === cat && { color: colors.black }]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Seu pacote — card grande estilo Airbnb */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>SEU PACOTE</Text>
        <TouchableOpacity style={styles.mainCard} activeOpacity={0.92}>
          <ImageBackground
            source={{ uri: packageImages[user.package] }}
            style={styles.mainCardPhoto}
            imageStyle={styles.mainCardPhotoStyle}
          >
            <View style={[styles.mainCardBadge, { backgroundColor: accent }]}>
              <Text style={styles.mainCardBadgeText}>{eventoEdicaoLabel}</Text>
            </View>
          </ImageBackground>
          <View style={styles.mainCardBody}>
            <View style={styles.mainCardRow}>
              <Text style={[styles.mainCardTitle, { color: colors.white }]}>
                {packages[user.package]?.label || user.package}
              </Text>
              <View style={[styles.confirmedPill, { borderColor: colors.success + '66' }]}>
                <View style={[styles.confirmedDot, { backgroundColor: colors.success }]} />
                <Text style={[styles.confirmedText, { color: colors.success }]}>CONFIRMADO</Text>
              </View>
            </View>
            <Text style={styles.mainCardTagline}>{packagesData[user.package]?.tagline}</Text>
            <View style={styles.mainCardFooter}>
              <Text style={[styles.mainCardPrice, { color: accent }]}>{packagesData[user.package]?.price}</Text>
              <Text style={styles.mainCardSpots}>
                {packagesData[user.package]?.spotsLeft > 0
                  ? `${packagesData[user.package]?.spotsLeft} vagas restantes`
                  : 'Esgotado'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Acesso rápido */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>ACESSO RÁPIDO</Text>
        <View style={styles.accessGrid}>
          <AccessCard icon="◉" label="Pulseira" sub="QR de acesso" accent={accent} />
          <AccessCard icon="⊕" label="Mapa Rio" sub="Parceiros no mapa" accent={accent} />
          <AccessCard icon="◇" label="Benefícios" sub="Descontos exclusivos" accent={accent} />
          <AccessCard icon="◎" label="Agenda" sub="Próximos eventos" accent={accent} />
        </View>
      </View>

      {/* Outros pacotes */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>TODAS AS VERSÕES</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pkgScroll}>
          {allPackages.map(pkg => {
            const pkgAccent = packages[pkg]?.accent || colors.gold;
            const pkgData = packagesData[pkg];
            const isActive = pkg === user.package;
            return (
              <TouchableOpacity key={pkg} style={[styles.pkgCard, isActive && { borderColor: pkgAccent }]} activeOpacity={0.88}>
                <ImageBackground
                  source={{ uri: packageImages[pkg] }}
                  style={styles.pkgCardPhoto}
                  imageStyle={styles.pkgCardPhotoStyle}
                >
                  {isActive && (
                    <View style={[styles.pkgCardActiveBadge, { backgroundColor: pkgAccent }]}>
                      <Text style={styles.pkgCardActiveBadgeText}>Seu pacote</Text>
                    </View>
                  )}
                </ImageBackground>
                <View style={styles.pkgCardBody}>
                  <Text style={[styles.pkgCardName, { color: pkgAccent }]}>{packages[pkg]?.label || pkg}</Text>
                  <Text style={styles.pkgCardTagline} numberOfLines={1}>{pkgData?.tagline}</Text>
                  <Text style={[styles.pkgCardPrice, { color: pkgAccent }]}>{pkgData?.price}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Hoje na agenda */}
      {today && (
        <View style={[styles.section, { paddingBottom: 40 }]}>
          <Text style={styles.sectionLabel}>HOJE NA AGENDA</Text>
          <View style={styles.agendaCard}>
            <Text style={[styles.agendaDate, { color: accent }]}>{today.day}, {today.date}</Text>
            {today.events.map((evt, i) => (
              <View key={i} style={[styles.agendaItem, i < today.events.length - 1 && styles.agendaItemBorder]}>
                <Text style={[styles.agendaTime, { color: accent }]}>{evt.time}</Text>
                <View>
                  <Text style={styles.agendaTitle}>{evt.title}</Text>
                  <Text style={styles.agendaLocation}>📍 {evt.location}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

    </ScrollView>
  );
}

function AccessCard({ icon, label, sub, accent }) {
  return (
    <TouchableOpacity style={styles.accessCard} activeOpacity={0.8}>
      <Text style={[styles.accessIcon, { color: accent }]}>{icon}</Text>
      <Text style={styles.accessLabel}>{label}</Text>
      <Text style={styles.accessSub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16 },
  headerSub: { color: colors.creamDim, fontSize: 12, letterSpacing: 1 },
  headerName: { color: colors.white, fontSize: 22, fontWeight: '600', marginTop: 2 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  notifWrap: { position: 'relative' },
  notifIcon: { fontSize: 20 },
  notifDot: { position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: 4 },
  logoSmall: { width: 32, height: 32, opacity: 0.85 },

  searchWrap: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 16, backgroundColor: colors.surface, borderRadius: radius.xl, paddingHorizontal: 16, paddingVertical: 12, borderWidth: 1, borderColor: colors.border, gap: 10 },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, color: colors.white, fontSize: 13, letterSpacing: 0.3 },

  chipsRow: { maxHeight: 48 },
  chipsContent: { paddingHorizontal: 20, gap: 8, alignItems: 'center' },
  chip: { borderWidth: 1, borderColor: colors.border, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 7 },
  chipText: { color: colors.creamDim, fontSize: 12, letterSpacing: 0.5 },

  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionLabel: { color: colors.creamDim, fontSize: 10, letterSpacing: 4, marginBottom: 14 },

  mainCard: { backgroundColor: colors.card, borderRadius: radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  mainCardPhoto: { height: 220 },
  mainCardPhotoStyle: { borderRadius: 0 },
  mainCardBadge: { position: 'absolute', top: 14, left: 14, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  mainCardBadgeText: { color: colors.black, fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  mainCardBody: { padding: 16 },
  mainCardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  mainCardTitle: { fontSize: 18, fontWeight: '600', letterSpacing: 1 },
  confirmedPill: { flexDirection: 'row', alignItems: 'center', gap: 5, borderWidth: 1, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  confirmedDot: { width: 5, height: 5, borderRadius: 3 },
  confirmedText: { fontSize: 9, letterSpacing: 1.5, fontWeight: '600' },
  mainCardTagline: { color: colors.creamDim, fontSize: 12, lineHeight: 18, marginBottom: 14 },
  mainCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 12 },
  mainCardPrice: { fontSize: 20, fontWeight: '300', letterSpacing: 1 },
  mainCardSpots: { color: colors.creamDim, fontSize: 11 },

  accessGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  accessCard: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: 16, borderWidth: 1, borderColor: colors.border },
  accessIcon: { fontSize: 22, marginBottom: 8 },
  accessLabel: { color: colors.white, fontSize: 13, fontWeight: '500', marginBottom: 3 },
  accessSub: { color: colors.creamDim, fontSize: 10, letterSpacing: 0.5 },

  pkgScroll: { gap: 14, paddingRight: 4 },
  pkgCard: { width: 180, backgroundColor: colors.card, borderRadius: radius.md, overflow: 'hidden', borderWidth: 1, borderColor: colors.border },
  pkgCardPhoto: { height: 120 },
  pkgCardPhotoStyle: {},
  pkgCardActiveBadge: { position: 'absolute', bottom: 10, left: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  pkgCardActiveBadgeText: { color: colors.black, fontSize: 9, fontWeight: '700' },
  pkgCardBody: { padding: 12 },
  pkgCardName: { fontSize: 12, fontWeight: '600', letterSpacing: 1, marginBottom: 3 },
  pkgCardTagline: { color: colors.creamDim, fontSize: 10, marginBottom: 8 },
  pkgCardPrice: { fontSize: 14, fontWeight: '500' },

  agendaCard: { backgroundColor: colors.card, borderRadius: radius.md, padding: 16, borderWidth: 1, borderColor: colors.border },
  agendaDate: { fontSize: 10, letterSpacing: 3, marginBottom: 14 },
  agendaItem: { flexDirection: 'row', gap: 14, paddingVertical: 10 },
  agendaItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  agendaTime: { fontSize: 11, fontWeight: '600', width: 44 },
  agendaTitle: { color: colors.white, fontSize: 13, marginBottom: 3 },
  agendaLocation: { color: colors.creamDim, fontSize: 11 },
});
