import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, packages, radius } from '../../constants/theme';

let QRCode;
try { QRCode = require('react-native-qrcode-svg').default; } catch (_) { QRCode = null; }

const transactions = [
  { id: 1, desc: 'Beach Club Barra',     value: -45,  date: '14/07', type: 'gasto' },
  { id: 2, desc: 'Crédito carregado',    value: +250, date: '13/07', type: 'credito' },
  { id: 3, desc: 'Braza Bar',            value: -32,  date: '13/07', type: 'gasto' },
  { id: 4, desc: 'Academia Nobre',       value: 0,    date: '13/07', type: 'gratuito' },
];

export default function CashlessScreen({ user }) {
  const accent = packages[user.package]?.accent || colors.gold;
  const balance = transactions.reduce((acc, t) => acc + t.value, 0);
  const qrValue = JSON.stringify({ cashlessId: user.wristbandId, name: user.name });
  const [showQR, setShowQR] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Balance card */}
      <View style={[styles.balanceCard, { borderColor: accent + '44' }]}>
        <View style={styles.balanceTop}>
          <Image source={require('../../../assets/logo.png')} style={styles.balanceLogo} resizeMode="contain" />
          <View style={[styles.balanceChip, { borderColor: accent + '55' }]}>
            <View style={[styles.balanceDot, { backgroundColor: colors.success }]} />
            <Text style={[styles.balanceChipText, { color: accent }]}>CASHLESS ATIVO</Text>
          </View>
        </View>
        <Text style={styles.balanceLabel}>SALDO DISPONÍVEL</Text>
        <Text style={[styles.balanceValue, { color: accent }]}>
          R$ {balance.toFixed(2).replace('.', ',')}
        </Text>
        <Text style={styles.balanceName}>{user.name}</Text>
        <Text style={styles.balanceId}>{user.wristbandId}</Text>
      </View>

      {/* Actions */}
      <View style={styles.actionsRow}>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: accent + '55' }]} onPress={() => setShowQR(!showQR)}>
          <Text style={[styles.actionIcon, { color: accent }]}>◉</Text>
          <Text style={styles.actionLabel}>Pagar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: accent + '55' }]}>
          <Text style={[styles.actionIcon, { color: accent }]}>⊕</Text>
          <Text style={styles.actionLabel}>Recarregar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, { borderColor: accent + '55' }]}>
          <Text style={[styles.actionIcon, { color: accent }]}>◎</Text>
          <Text style={styles.actionLabel}>Extrato</Text>
        </TouchableOpacity>
      </View>

      {/* QR para pagar */}
      {showQR && (
        <View style={[styles.qrCard, { borderColor: accent + '44' }]}>
          <Text style={styles.qrLabel}>APRESENTE PARA PAGAR</Text>
          {QRCode ? (
            <QRCode value={qrValue} size={160} color={accent} backgroundColor="transparent" />
          ) : (
            <View style={[styles.qrPlaceholder, { borderColor: accent }]}>
              <Text style={[styles.qrPlaceholderText, { color: accent }]}>{user.wristbandId}</Text>
            </View>
          )}
          <Text style={styles.qrSub}>Escaneie na maquininha do parceiro</Text>
        </View>
      )}

      {/* Transactions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ÚLTIMAS TRANSAÇÕES</Text>
        {transactions.map(t => (
          <View key={t.id} style={styles.txRow}>
            <View style={[styles.txIcon, { backgroundColor: t.type === 'credito' ? colors.success + '22' : t.type === 'gratuito' ? accent + '15' : colors.danger + '15' }]}>
              <Text style={{ fontSize: 14 }}>
                {t.type === 'credito' ? '↓' : t.type === 'gratuito' ? '★' : '↑'}
              </Text>
            </View>
            <View style={styles.txInfo}>
              <Text style={styles.txDesc}>{t.desc}</Text>
              <Text style={styles.txDate}>{t.date}</Text>
            </View>
            <Text style={[styles.txValue, {
              color: t.type === 'credito' ? colors.success : t.type === 'gratuito' ? accent : colors.danger
            }]}>
              {t.type === 'gratuito' ? 'Grátis' : (t.value > 0 ? '+' : '') + 'R$ ' + Math.abs(t.value)}
            </Text>
          </View>
        ))}
      </View>

      <Text style={styles.hint}>O saldo cashless é válido apenas dentro dos eventos e parceiros GOAT Rio.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  content: { padding: 20, paddingBottom: 48 },

  balanceCard: { backgroundColor: '#0e0c08', borderWidth: 1, borderRadius: radius.lg, padding: 24, marginBottom: 20 },
  balanceTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 },
  balanceLogo: { width: 32, height: 32 },
  balanceChip: { flexDirection: 'row', alignItems: 'center', gap: 6, borderWidth: 1, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  balanceDot: { width: 5, height: 5, borderRadius: 3 },
  balanceChipText: { fontSize: 9, letterSpacing: 2, fontWeight: '600' },
  balanceLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 8 },
  balanceValue: { fontSize: 40, fontWeight: '300', letterSpacing: 2, marginBottom: 20 },
  balanceName: { color: colors.cream, fontSize: 13, letterSpacing: 2, marginBottom: 4 },
  balanceId: { color: colors.creamDim, fontSize: 10, letterSpacing: 3 },

  actionsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  actionBtn: { flex: 1, alignItems: 'center', borderWidth: 1, borderRadius: radius.md, paddingVertical: 16, gap: 6 },
  actionIcon: { fontSize: 20 },
  actionLabel: { color: colors.cream, fontSize: 10, letterSpacing: 1 },

  qrCard: { borderWidth: 1, borderRadius: radius.lg, padding: 24, alignItems: 'center', marginBottom: 20, backgroundColor: colors.surface },
  qrLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 20 },
  qrPlaceholder: { width: 160, height: 160, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  qrPlaceholderText: { fontSize: 13, letterSpacing: 3 },
  qrSub: { color: colors.creamDim, fontSize: 11, marginTop: 16, textAlign: 'center' },

  section: { marginTop: 4 },
  sectionTitle: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 14 },
  txRow: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  txIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  txInfo: { flex: 1 },
  txDesc: { color: colors.white, fontSize: 13, marginBottom: 3 },
  txDate: { color: colors.creamDim, fontSize: 11 },
  txValue: { fontSize: 14, fontWeight: '500' },

  hint: { color: colors.creamDim, fontSize: 11, textAlign: 'center', marginTop: 24, lineHeight: 18 },
});
