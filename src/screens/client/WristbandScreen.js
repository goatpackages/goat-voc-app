import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors, packages } from '../../constants/theme';

let QRCode;
try { QRCode = require('react-native-qrcode-svg').default; } catch (_) { QRCode = null; }

export default function WristbandScreen({ user }) {
  const accent = packages[user.package]?.accent || colors.gold;
  const qrValue = JSON.stringify({ wristbandId: user.wristbandId, name: user.name, package: user.package });

  return (
    <View style={styles.container}>

      {/* Wristband card */}
      <View style={[styles.wristbandCard, { borderColor: accent + '55' }]}>
        <View style={styles.wristbandInner}>
          <View style={styles.wristbandLeft}>
            <Image source={require('../../../assets/logo.png')} style={styles.wristbandLogo} resizeMode="contain" />
            <Text style={[styles.wristbandBrand, { color: accent }]}>GOAT</Text>
            <Text style={styles.wristbandPackagesLabel}>PACKAGES</Text>
          </View>
          <View style={styles.wristbandQR}>
            {QRCode ? (
              <QRCode value={qrValue} size={64} color={accent} backgroundColor="transparent" />
            ) : (
              <View style={[styles.qrPlaceholder, { borderColor: accent }]}>
                <Text style={[styles.qrPlaceholderText, { color: accent }]}>QR</Text>
              </View>
            )}
            <Text style={[styles.wristbandId, { color: accent }]}>{user.wristbandId}</Text>
          </View>
        </View>
        <View style={[styles.wristbandEdge, { backgroundColor: accent + '22' }]}>
          <Text style={[styles.wristbandEdgeText, { color: accent }]}>
            {(packages[user.package]?.label || user.package).toUpperCase()}  ·  {user.name.toUpperCase()}  ·  GOAT PACKAGES RIO
          </Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.infoBlock}>
        <Text style={[styles.userName, { color: accent }]}>{user.name}</Text>
        <Text style={styles.userPackage}>{packages[user.package]?.label || user.package}</Text>
      </View>

      {/* QR grande */}
      <View style={[styles.qrBox, { borderColor: accent + '33' }]}>
        {QRCode ? (
          <QRCode value={qrValue} size={180} color={accent} backgroundColor="transparent" />
        ) : (
          <View style={[styles.qrBig, { borderColor: accent }]}>
            <Text style={[styles.qrBigText, { color: accent }]}>{user.wristbandId}</Text>
          </View>
        )}
      </View>

      <View style={[styles.statusBadge, { borderColor: accent + '55' }]}>
        <View style={[styles.statusDot, { backgroundColor: colors.success }]} />
        <View>
          <Text style={[styles.statusText, { color: accent }]}>PULSEIRA ATIVA</Text>
          <Text style={[styles.statusVersion, { color: accent }]}>{packages[user.package]?.label || user.package}</Text>
        </View>
      </View>

      <Text style={styles.hint}>Apresente este QR code na entrada dos eventos</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center', padding: 24 },

  wristbandCard: {
    width: '100%', borderWidth: 1, marginBottom: 24,
    backgroundColor: '#0e0c08',
    overflow: 'hidden',
  },
  wristbandInner: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  wristbandLeft: { alignItems: 'flex-start' },
  wristbandLogo: { width: 36, height: 36, marginBottom: 6 },
  wristbandBrand: { fontSize: 22, letterSpacing: 6, fontWeight: '300' },
  wristbandPackagesLabel: { color: colors.creamDim, fontSize: 8, letterSpacing: 4 },
  wristbandQR: { alignItems: 'center', gap: 6 },
  wristbandId: { fontSize: 9, letterSpacing: 3, marginTop: 4 },
  qrPlaceholder: { width: 64, height: 64, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  qrPlaceholderText: { fontSize: 14, fontWeight: '600' },
  wristbandEdge: { paddingVertical: 6, alignItems: 'center' },
  wristbandEdgeText: { fontSize: 8, letterSpacing: 3 },

  infoBlock: { alignItems: 'center', marginBottom: 24 },
  userName: { fontSize: 20, fontWeight: '300', letterSpacing: 3, marginBottom: 4 },
  userPackage: { color: colors.creamDim, fontSize: 11, letterSpacing: 2 },

  qrBox: { borderWidth: 1, padding: 20, marginBottom: 20 },
  qrBig: { width: 180, height: 180, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  qrBigText: { fontSize: 16, letterSpacing: 3, fontWeight: '600' },

  statusBadge: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 16 },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 8 },
  statusText: { fontSize: 10, letterSpacing: 3 },
  statusVersion: { fontSize: 9, letterSpacing: 2, opacity: 0.6, marginTop: 2 },
  hint: { color: colors.creamDim, fontSize: 11, textAlign: 'center' },
});
