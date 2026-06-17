import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { waitlistData } from '../../constants/data';

// Mock: cliente Fernanda está na lista de espera
const MOCK_WAITLIST_USER = 'w1';

export default function WaitlistStatusScreen({ user }) {
  const accent = packages[user.package]?.accent || colors.white;
  const myEntry = waitlistData.find(w => w.id === MOCK_WAITLIST_USER && w.package === user.package)
    || waitlistData.find(w => w.package === user.package);

  const totalInQueue = waitlistData.filter(w => w.package === user.package).length;

  if (!myEntry) {
    return (
      <View style={styles.container}>
        <Text style={styles.notFound}>Você não está em nenhuma lista de espera.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.header, { borderBottomColor: accent + '33' }]}>
        <Text style={[styles.headerLabel, { color: accent }]}>LISTA DE ESPERA</Text>
        <Text style={styles.headerPkg}>{myEntry.package}</Text>
        <Text style={styles.headerSub}>Seu pagamento foi confirmado. Assim que sua data de check-in for definida, você será notificado.</Text>
      </View>

      <View style={styles.positionBlock}>
        <View style={[styles.positionCircle, { borderColor: accent }]}>
          <Text style={[styles.positionNum, { color: accent }]}>#{myEntry.position}</Text>
        </View>
        <Text style={styles.positionText}>sua posição na fila</Text>
        <Text style={styles.positionTotal}>{totalInQueue} pessoa{totalInQueue > 1 ? 's' : ''} aguardando no pacote {myEntry.package}</Text>
      </View>

      <View style={styles.infoBlock}>
        <InfoRow label="PAGAMENTO CONFIRMADO" value={myEntry.paidAt} accent={accent} />
        <InfoRow label="CHECK-IN PREVISTO"    value={myEntry.expectedCheckin} accent={accent} />
        <InfoRow label="PACOTE"               value={myEntry.package} />
      </View>

      <View style={styles.stepsBlock}>
        <Text style={styles.stepsTitle}>O QUE ACONTECE AGORA</Text>
        <Step num="01" text="Seu pagamento foi recebido e confirmado pela equipe GOAT." done />
        <Step num="02" text="Você está na fila de espera para a próxima edição disponível." done />
        <Step num="03" text="A equipe vai entrar em contato quando sua data de check-in for definida." />
        <Step num="04" text="Você recebe acesso ao app completo e sua pulseira é ativada." />
      </View>

      <View style={[styles.contactBox, { borderColor: accent + '44' }]}>
        <Text style={styles.contactTitle}>DÚVIDAS?</Text>
        <Text style={styles.contactText}>Entre em contato com a equipe pelo WhatsApp ou email.</Text>
        <Text style={[styles.contactInfo, { color: accent }]}>hellogoatrio@gmail.com</Text>
      </View>
    </ScrollView>
  );
}

function InfoRow({ label, value, accent }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, accent && { color: accent }]}>{value}</Text>
    </View>
  );
}

function Step({ num, text, done }) {
  return (
    <View style={styles.step}>
      <View style={[styles.stepCircle, done && { backgroundColor: colors.success, borderColor: colors.success }]}>
        <Text style={[styles.stepNum, done && { color: colors.black }]}>{done ? '✓' : num}</Text>
      </View>
      <Text style={[styles.stepText, !done && { color: colors.creamDim }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  content: { paddingBottom: 48 },
  notFound: { color: colors.creamDim, textAlign: 'center', marginTop: 80, fontSize: 14, paddingHorizontal: 32 },
  header: { padding: 28, borderBottomWidth: 1 },
  headerLabel: { fontSize: 10, letterSpacing: 5, marginBottom: 8 },
  headerPkg: { color: colors.white, fontSize: 32, fontWeight: '300', letterSpacing: 4, marginBottom: 12 },
  headerSub: { color: colors.creamDim, fontSize: 12, lineHeight: 20 },
  positionBlock: { alignItems: 'center', paddingVertical: 36, borderBottomWidth: 1, borderBottomColor: colors.border },
  positionCircle: { width: 88, height: 88, borderRadius: 44, borderWidth: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  positionNum: { fontSize: 32, fontWeight: '300' },
  positionText: { color: colors.cream, fontSize: 13, letterSpacing: 2, marginBottom: 6 },
  positionTotal: { color: colors.creamDim, fontSize: 11 },
  infoBlock: { borderBottomWidth: 1, borderBottomColor: colors.border },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
  infoValue: { color: colors.cream, fontSize: 12 },
  stepsBlock: { padding: 24, borderBottomWidth: 1, borderBottomColor: colors.border, gap: 16 },
  stepsTitle: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 8 },
  step: { flexDirection: 'row', alignItems: 'flex-start', gap: 14 },
  stepCircle: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, borderColor: colors.border, alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 },
  stepNum: { color: colors.creamDim, fontSize: 9, letterSpacing: 1 },
  stepText: { color: colors.cream, fontSize: 12, lineHeight: 20, flex: 1 },
  contactBox: { margin: 24, borderWidth: 1, padding: 20, alignItems: 'center' },
  contactTitle: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 8 },
  contactText: { color: colors.creamDim, fontSize: 12, textAlign: 'center', marginBottom: 8 },
  contactInfo: { fontSize: 12, letterSpacing: 1 },
});
