import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { guestsData } from '../../constants/data';

let CameraView, useCameraPermissions;
try {
  const cam = require('expo-camera');
  CameraView = cam.CameraView;
  useCameraPermissions = cam.useCameraPermissions;
} catch (_) {}

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions ? useCameraPermissions() : [null, () => {}];
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState(null);

  function handleScan({ data }) {
    if (!scanning) return;
    setScanning(false);
    try {
      const parsed = JSON.parse(data);
      const guest = guestsData.find(g => g.wristbandId === parsed.wristbandId);
      if (guest) {
        Vibration.vibrate(guest.active ? 200 : [100, 100, 100]);
        setResult({ guest, valid: guest.active });
      } else {
        Vibration.vibrate([100, 100, 100]);
        setResult({ guest: null, valid: false, unknown: true });
      }
    } catch {
      setResult({ guest: null, valid: false, unknown: true });
    }
  }

  function reset() {
    setResult(null);
    setTimeout(() => setScanning(true), 300);
  }

  if (!CameraView) {
    return (
      <View style={styles.container}>
        <Text style={styles.unavailable}>Scanner disponível no dispositivo com câmera.</Text>
        <Text style={styles.unavailableSub}>Execute no Expo Go para usar o scanner.</Text>
        <TouchableOpacity style={styles.simulateBtn} onPress={() => setResult({ guest: guestsData[0], valid: true })}>
          <Text style={styles.simulateBtnText}>SIMULAR LEITURA</Text>
        </TouchableOpacity>
        {result && <ResultOverlay result={result} onReset={reset} />}
      </View>
    );
  }

  if (!permission?.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.unavailable}>Permissão de câmera necessária.</Text>
        <TouchableOpacity style={styles.simulateBtn} onPress={requestPermission}>
          <Text style={styles.simulateBtnText}>PERMITIR CÂMERA</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="back" onBarcodeScanned={scanning ? handleScan : undefined} barcodeScannerSettings={{ barcodeTypes: ['qr'] }}>
        <View style={styles.overlay}>
          <View style={styles.frame} />
          <Text style={styles.scanHint}>Aponte para o QR code da pulseira</Text>
        </View>
      </CameraView>
      {result && <ResultOverlay result={result} onReset={reset} />}
    </View>
  );
}

function ResultOverlay({ result, onReset }) {
  const { guest, valid, unknown } = result;
  const accent = guest ? packages[guest.package]?.accent || colors.white : colors.white;

  return (
    <View style={styles.resultOverlay}>
      <View style={[styles.resultCard, { borderTopColor: valid ? colors.success : colors.danger }]}>
        {unknown ? (
          <>
            <Text style={[styles.resultStatus, { color: colors.danger }]}>PULSEIRA NÃO ENCONTRADA</Text>
            <Text style={styles.resultSub}>QR code inválido ou não cadastrado.</Text>
          </>
        ) : (
          <>
            <Text style={[styles.resultStatus, { color: valid ? colors.success : colors.danger }]}>
              {valid ? 'ACESSO LIBERADO' : 'ACESSO NEGADO'}
            </Text>
            <Text style={[styles.resultPkg, { color: accent }]}>{guest.package}</Text>
            <Text style={styles.resultName}>{guest.name}</Text>
            <Text style={styles.resultId}>{guest.wristbandId}</Text>
            {!valid && <Text style={styles.resultReason}>Pulseira inativa ou suspensa.</Text>}
          </>
        )}
        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetBtnText}>ESCANEAR PRÓXIMO</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black, alignItems: 'center', justifyContent: 'center' },
  unavailable: { color: colors.white, fontSize: 16, marginBottom: 8, textAlign: 'center', paddingHorizontal: 32 },
  unavailableSub: { color: colors.creamDim, fontSize: 12, textAlign: 'center', marginBottom: 32 },
  simulateBtn: { borderWidth: 1, borderColor: colors.white, paddingHorizontal: 24, paddingVertical: 12 },
  simulateBtnText: { color: colors.white, fontSize: 11, letterSpacing: 3 },
  camera: { flex: 1, width: '100%' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: { width: 220, height: 220, borderWidth: 2, borderColor: 'rgba(255,255,255,0.6)', marginBottom: 24 },
  scanHint: { color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 2 },
  resultOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', alignItems: 'center', justifyContent: 'center', padding: 32 },
  resultCard: { width: '100%', backgroundColor: colors.surface, padding: 28, borderTopWidth: 3, alignItems: 'center' },
  resultStatus: { fontSize: 13, letterSpacing: 4, fontWeight: '700', marginBottom: 16 },
  resultPkg: { fontSize: 10, letterSpacing: 5, marginBottom: 8 },
  resultName: { color: colors.white, fontSize: 22, fontWeight: '300', marginBottom: 4 },
  resultId: { color: colors.creamDim, fontSize: 11, letterSpacing: 3, marginBottom: 12 },
  resultReason: { color: colors.danger, fontSize: 12, marginBottom: 8 },
  resetBtn: { marginTop: 20, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 24, paddingVertical: 12 },
  resetBtnText: { color: colors.white, fontSize: 11, letterSpacing: 3 },
});
