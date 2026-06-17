import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { colors, packages, radius } from '../../constants/theme';

const faqs = [
  { q: 'Como funciona o transfer?', a: 'A equipe GOAT está disponível 12h por dia para todos os deslocamentos. Basta avisar com antecedência pelo WhatsApp.' },
  { q: 'O que fazer ao chegar no Rio?', a: 'Envie sua localização pelo WhatsApp assim que pousar. A equipe irá ao seu encontro no aeroporto.' },
  { q: 'A pulseira é obrigatória?', a: 'Sim. A pulseira com QR code é necessária para acesso a todos os eventos, clubs e atividades do pacote.' },
  { q: 'Posso alterar meu check-in?', a: 'Entre em contato com a equipe com ao menos 72h de antecedência.' },
];

export default function ContactScreen({ user }) {
  const accent = packages[user.package]?.accent || colors.gold;
  const [openFaq, setOpenFaq] = React.useState(null);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.headerTitle}>GOAT Rio</Text>
        <Text style={styles.headerSub}>Equipe disponível 7 dias por semana</Text>
      </View>

      {/* Primary contact */}
      <TouchableOpacity
        style={[styles.primaryBtn, { borderColor: accent }]}
        onPress={() => Linking.openURL('https://wa.me/5521999990000')}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryBtnIcon}>💬</Text>
        <View>
          <Text style={[styles.primaryBtnLabel, { color: accent }]}>WhatsApp GOAT Rio</Text>
          <Text style={styles.primaryBtnSub}>Resposta em até 30 minutos</Text>
        </View>
        <Text style={[styles.primaryBtnArrow, { color: accent }]}>→</Text>
      </TouchableOpacity>

      {/* Secondary contacts */}
      <View style={styles.contactGrid}>
        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => Linking.openURL('tel:+5521999990000')}
          activeOpacity={0.8}
        >
          <Text style={styles.contactCardIcon}>📞</Text>
          <Text style={styles.contactCardLabel}>Ligar</Text>
          <Text style={styles.contactCardSub}>+55 21 99999-0000</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => Linking.openURL('mailto:hellogoatrio@gmail.com')}
          activeOpacity={0.8}
        >
          <Text style={styles.contactCardIcon}>✉️</Text>
          <Text style={styles.contactCardLabel}>Email</Text>
          <Text style={styles.contactCardSub}>hellogoatrio@gmail.com</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactCard}
          onPress={() => Linking.openURL('https://instagram.com/goatpackages')}
          activeOpacity={0.8}
        >
          <Text style={styles.contactCardIcon}>📸</Text>
          <Text style={styles.contactCardLabel}>Instagram</Text>
          <Text style={styles.contactCardSub}>@goatpackages</Text>
        </TouchableOpacity>

        <View style={styles.contactCard}>
          <Text style={styles.contactCardIcon}>🕐</Text>
          <Text style={styles.contactCardLabel}>Atendimento</Text>
          <Text style={styles.contactCardSub}>08h às 23h</Text>
        </View>
      </View>

      {/* Info do evento */}
      <View style={[styles.infoCard, { borderColor: accent + '33' }]}>
        <Text style={styles.sectionTitle}>INFORMAÇÕES DO EVENTO</Text>
        {[
          { label: 'Local', value: 'Rio de Janeiro, RJ' },
          { label: 'Período', value: '14 a 18 de Julho, 2026' },
          { label: 'Seu pacote', value: packages[user.package]?.label || user.package },
          { label: 'Pulseira', value: user.wristbandId },
        ].map(item => (
          <View key={item.label} style={styles.infoRow}>
            <Text style={styles.infoLabel}>{item.label}</Text>
            <Text style={[styles.infoValue, item.label === 'Seu pacote' && { color: accent }]}>{item.value}</Text>
          </View>
        ))}
      </View>

      {/* FAQ */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PERGUNTAS FREQUENTES</Text>
        {faqs.map((faq, i) => (
          <TouchableOpacity
            key={i}
            style={styles.faqItem}
            onPress={() => setOpenFaq(openFaq === i ? null : i)}
            activeOpacity={0.8}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQ}>{faq.q}</Text>
              <Text style={[styles.faqChevron, { color: accent }]}>{openFaq === i ? '−' : '+'}</Text>
            </View>
            {openFaq === i && <Text style={styles.faqA}>{faq.a}</Text>}
          </TouchableOpacity>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  content: { padding: 20, paddingBottom: 48 },

  header: { alignItems: 'center', paddingVertical: 28, marginBottom: 8 },
  logo: { width: 48, height: 48, marginBottom: 12 },
  headerTitle: { color: colors.white, fontSize: 20, letterSpacing: 6, fontWeight: '300', marginBottom: 6 },
  headerSub: { color: colors.creamDim, fontSize: 12, letterSpacing: 1 },

  primaryBtn: { flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 1, borderRadius: radius.lg, padding: 20, marginBottom: 16, backgroundColor: colors.surface },
  primaryBtnIcon: { fontSize: 28 },
  primaryBtnLabel: { fontSize: 15, fontWeight: '600', marginBottom: 3 },
  primaryBtnSub: { color: colors.creamDim, fontSize: 11 },
  primaryBtnArrow: { marginLeft: 'auto', fontSize: 20 },

  contactGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 20 },
  contactCard: { width: '47%', backgroundColor: colors.surface, borderRadius: radius.md, padding: 16, borderWidth: 1, borderColor: colors.border },
  contactCardIcon: { fontSize: 22, marginBottom: 10 },
  contactCardLabel: { color: colors.white, fontSize: 13, fontWeight: '500', marginBottom: 3 },
  contactCardSub: { color: colors.creamDim, fontSize: 10, lineHeight: 15 },

  infoCard: { borderWidth: 1, borderRadius: radius.md, padding: 20, marginBottom: 20 },
  section: { marginBottom: 20 },
  sectionTitle: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 14 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { color: colors.creamDim, fontSize: 11, letterSpacing: 1 },
  infoValue: { color: colors.cream, fontSize: 12 },

  faqItem: { borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 14 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { color: colors.white, fontSize: 13, flex: 1, paddingRight: 12, lineHeight: 18 },
  faqChevron: { fontSize: 20, fontWeight: '300' },
  faqA: { color: colors.creamDim, fontSize: 12, lineHeight: 19, marginTop: 10 },
});
