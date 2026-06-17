import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colors, packages } from '../../constants/theme';

export default function ProfileScreen({ user, onLogout }) {
  const accent = packages[user.package]?.accent || colors.white;

  function callSupport() {
    Linking.openURL('tel:+5521999990000');
  }

  function whatsappSupport() {
    Linking.openURL('https://wa.me/5521999990000');
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.header, { borderBottomColor: accent + '33' }]}>
        <View style={[styles.avatar, { borderColor: accent }]}>
          <Text style={[styles.avatarLetter, { color: accent }]}>{user.name.charAt(0)}</Text>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={[styles.packageBadge, { color: accent, borderColor: accent + '55' }]}>{user.package}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>MINHA PULSEIRA</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>ID</Text>
          <Text style={[styles.infoValue, { color: accent }]}>{user.wristbandId}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>STATUS</Text>
          <View style={styles.statusRow}>
            <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.infoValue, { color: colors.success }]}>ATIVA</Text>
          </View>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>PACOTE</Text>
          <Text style={styles.infoValue}>{user.package} — {user.package === 'BLACK' ? 'Edição 01' : user.package === 'PLATINUM' ? 'Edição 02' : 'Edição 03'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>SUPORTE</Text>
        <TouchableOpacity style={styles.supportBtn} onPress={whatsappSupport}>
          <Text style={styles.supportIcon}>◉</Text>
          <View>
            <Text style={styles.supportLabel}>WhatsApp GOAT Rio</Text>
            <Text style={styles.supportSub}>Resposta em até 30 minutos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.supportBtn} onPress={callSupport}>
          <Text style={styles.supportIcon}>◈</Text>
          <View>
            <Text style={styles.supportLabel}>Ligar para a equipe</Text>
            <Text style={styles.supportSub}>+55 21 99999-0000</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.supportBtn}>
          <Text style={styles.supportIcon}>◎</Text>
          <View>
            <Text style={styles.supportLabel}>Email</Text>
            <Text style={styles.supportSub}>hellogoatrio@gmail.com</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>INFORMAÇÕES DO EVENTO</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>LOCAL</Text>
          <Text style={styles.infoValue}>Rio de Janeiro, RJ</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>PERÍODO</Text>
          <Text style={styles.infoValue}>14 a 18 de Julho, 2026</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>IDIOMA</Text>
          <Text style={styles.infoValue}>Português / English</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={onLogout}>
        <Text style={styles.logoutText}>SAIR DA CONTA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  content: { paddingBottom: 48 },
  header: { alignItems: 'center', padding: 32, borderBottomWidth: 1 },
  avatar: { width: 72, height: 72, borderRadius: 36, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  avatarLetter: { fontSize: 30, fontWeight: '300' },
  name: { color: colors.white, fontSize: 22, fontWeight: '300', letterSpacing: 2, marginBottom: 8 },
  packageBadge: { fontSize: 10, letterSpacing: 5, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 4, marginBottom: 8 },
  email: { color: colors.creamDim, fontSize: 12 },
  section: { padding: 24, borderBottomWidth: 1, borderBottomColor: colors.border },
  sectionTitle: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 16 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
  infoValue: { color: colors.cream, fontSize: 12, letterSpacing: 1 },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  supportBtn: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  supportIcon: { color: colors.gold, fontSize: 20, width: 24, textAlign: 'center' },
  supportLabel: { color: colors.white, fontSize: 13, marginBottom: 2 },
  supportSub: { color: colors.creamDim, fontSize: 11 },
  logoutBtn: { margin: 24, borderWidth: 1, borderColor: colors.border, padding: 16, alignItems: 'center' },
  logoutText: { color: colors.creamDim, fontSize: 11, letterSpacing: 4 },
});
