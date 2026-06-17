import React from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { colors, packages, radius } from '../../constants/theme';
import { packagesData, scheduleData, notificationsData } from '../../constants/data';

const heroImages = {
  BLACK: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80',
  PLATINUM: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
  DIAMOND: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
};

export default function HomeScreen({ user, navigation }) {
  const accent = packages[user.package]?.accent || colors.gold;
  const pkg = packagesData[user.package];
  const today = scheduleData[user.package]?.[0];
  const unread = notificationsData.filter(n => !n.read).length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Hero */}
      <ImageBackground source={{ uri: heroImages[user.package] }} style={styles.hero} imageStyle={styles.heroImg}>
        <View style={styles.heroOverlay}>
          <View style={styles.heroTop}>
            <Image source={require('../../../assets/logo.png')} style={styles.heroLogo} resizeMode="contain" />
            {unread > 0 && (
              <View style={styles.notifBadge}>
                <Text style={styles.notifBadgeText}>{unread}</Text>
              </View>
            )}
          </View>
          <View style={styles.heroBottom}>
            <Text style={styles.heroGreeting}>Olá, {user.name.split(' ')[0]}</Text>
            <View style={[styles.heroPkgBadge, { borderColor: accent }]}>
              <Text style={[styles.heroPkgText, { color: accent }]}>{packages[user.package]?.label || user.package}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>

      {/* Price card */}
      <View style={[styles.priceCard, { borderColor: accent + '33' }]}>
        <View>
          <Text style={styles.priceLabel}>VALOR DO PACOTE</Text>
          <Text style={[styles.priceValue, { color: accent }]}>{pkg.price}</Text>
        </View>
        <View style={[styles.pricePill, { backgroundColor: colors.success + '22', borderColor: colors.success + '55' }]}>
          <View style={[styles.priceDot, { backgroundColor: colors.success }]} />
          <Text style={[styles.pricePillText, { color: colors.success }]}>CONFIRMADO</Text>
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.quickRow}>
        <QuickBtn icon="◉" label="Acesso" accent={accent} />
        <QuickBtn icon="⊕" label="Mapa Rio" accent={accent} />
        <QuickBtn icon="◇" label="Benefícios" accent={accent} />
        <QuickBtn icon="◬" label="Avisos" accent={accent} badge={unread} />
      </View>

      {/* Hoje na agenda */}
      {today && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>HOJE NA AGENDA</Text>
          <View style={styles.agendaCard}>
            <Text style={styles.agendaDate}>{today.day}, {today.date}</Text>
            {today.events.map((evt, i) => (
              <View key={i} style={[styles.agendaItem, i < today.events.length - 1 && styles.agendaItemBorder]}>
                <Text style={[styles.agendaTime, { color: accent }]}>{evt.time}</Text>
                <View style={styles.agendaInfo}>
                  <Text style={styles.agendaTitle}>{evt.title}</Text>
                  <Text style={styles.agendaLocation}>◎  {evt.location}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Vagas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SEU PACOTE</Text>
        <View style={[styles.pkgCard, { borderColor: accent + '33' }]}>
          <View style={styles.pkgCardTop}>
            <Text style={[styles.pkgCardName, { color: accent }]}>{packages[user.package]?.label || user.package}</Text>
            <Text style={styles.pkgCardEdition}>{pkg.edition}</Text>
          </View>
          <Text style={styles.pkgCardTagline}>{pkg.tagline}</Text>
          <View style={styles.pkgSpotsRow}>
            <View style={styles.pkgSpotItem}>
              <Text style={[styles.pkgSpotNum, { color: accent }]}>{pkg.spots}</Text>
              <Text style={styles.pkgSpotLabel}>vagas totais</Text>
            </View>
            <View style={[styles.pkgSpotDivider, { backgroundColor: accent + '22' }]} />
            <View style={styles.pkgSpotItem}>
              <Text style={[styles.pkgSpotNum, { color: pkg.spotsLeft === 0 ? colors.danger : colors.success }]}>
                {pkg.spotsLeft === 0 ? 'Esgotado' : pkg.spotsLeft}
              </Text>
              <Text style={styles.pkgSpotLabel}>{pkg.spotsLeft > 0 ? 'restantes' : ''}</Text>
            </View>
          </View>
        </View>
      </View>

    </ScrollView>
  );
}

function QuickBtn({ icon, label, accent, badge }) {
  return (
    <View style={styles.quickBtn}>
      <View style={[styles.quickIcon, { borderColor: accent + '44', backgroundColor: colors.goldDim }]}>
        <Text style={[styles.quickIconText, { color: accent }]}>{icon}</Text>
        {badge > 0 && <View style={styles.quickBadge}><Text style={styles.quickBadgeText}>{badge}</Text></View>}
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  content: { paddingBottom: 40 },

  hero: { height: 280 },
  heroImg: { filter: undefined },
  heroOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', padding: 24, justifyContent: 'space-between' },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  heroLogo: { width: 40, height: 40 },
  notifBadge: { backgroundColor: colors.gold, borderRadius: 10, minWidth: 20, height: 20, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 5 },
  notifBadgeText: { color: colors.black, fontSize: 10, fontWeight: '700' },
  heroBottom: { gap: 8 },
  heroGreeting: { color: colors.white, fontSize: 28, fontWeight: '300', letterSpacing: 1 },
  heroPkgBadge: { borderWidth: 1, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4 },
  heroPkgText: { fontSize: 10, letterSpacing: 4, fontWeight: '600' },

  priceCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 16, backgroundColor: colors.card, borderWidth: 1, padding: 18, borderRadius: radius.md },
  priceLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 3, marginBottom: 4 },
  priceValue: { fontSize: 24, fontWeight: '300', letterSpacing: 2 },
  pricePill: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  priceDot: { width: 5, height: 5, borderRadius: 3 },
  pricePillText: { fontSize: 9, letterSpacing: 2, fontWeight: '600' },

  quickRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 16, marginBottom: 8 },
  quickBtn: { alignItems: 'center', gap: 6 },
  quickIcon: { width: 56, height: 56, borderRadius: radius.md, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  quickIconText: { fontSize: 22 },
  quickBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: colors.gold, borderRadius: 8, minWidth: 16, height: 16, alignItems: 'center', justifyContent: 'center' },
  quickBadgeText: { color: colors.black, fontSize: 8, fontWeight: '700' },
  quickLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 1 },

  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 12 },

  agendaCard: { backgroundColor: colors.card, borderRadius: radius.md, padding: 16, borderWidth: 1, borderColor: colors.border },
  agendaDate: { color: colors.gold, fontSize: 10, letterSpacing: 3, marginBottom: 14 },
  agendaItem: { flexDirection: 'row', gap: 14, paddingVertical: 10 },
  agendaItemBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  agendaTime: { fontSize: 11, fontWeight: '600', width: 40 },
  agendaInfo: {},
  agendaTitle: { color: colors.white, fontSize: 13, marginBottom: 2 },
  agendaLocation: { color: colors.creamDim, fontSize: 11 },

  pkgCard: { backgroundColor: colors.card, borderRadius: radius.md, padding: 18, borderWidth: 1 },
  pkgCardTop: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  pkgCardName: { fontSize: 16, letterSpacing: 4, fontWeight: '600' },
  pkgCardEdition: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
  pkgCardTagline: { color: colors.cream, fontSize: 12, marginBottom: 16, lineHeight: 18 },
  pkgSpotsRow: { flexDirection: 'row' },
  pkgSpotItem: { flex: 1, alignItems: 'center', paddingVertical: 10 },
  pkgSpotNum: { fontSize: 22, fontWeight: '300' },
  pkgSpotLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 2, marginTop: 2 },
  pkgSpotDivider: { width: 1, marginVertical: 6 },
});
