import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { waitlistData } from '../../constants/data';

export default function WaitlistScreen() {
  const [list, setList] = useState(waitlistData);
  const [filter, setFilter] = useState('Todos');
  const [detail, setDetail] = useState(null);
  const [editNotes, setEditNotes] = useState('');

  const filters = ['Todos', 'BLACK', 'PLATINUM', 'DIAMOND'];
  const filtered = filter === 'Todos' ? list : list.filter(w => w.package === filter);

  function openDetail(item) {
    setDetail(item);
    setEditNotes(item.notes);
  }

  function saveNotes() {
    setList(prev => prev.map(w => w.id === detail.id ? { ...w, notes: editNotes } : w));
    setDetail(prev => ({ ...prev, notes: editNotes }));
  }

  function confirmCheckin(id) {
    setList(prev => prev.filter(w => w.id !== id));
    setDetail(null);
  }

  function removeFromList(id) {
    setList(prev => prev.filter(w => w.id !== id));
    setDetail(null);
  }

  if (detail) {
    const accent = packages[detail.package]?.accent || colors.white;
    const current = list.find(w => w.id === detail.id);
    if (!current) return null;

    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backBtn} onPress={() => setDetail(null)}>
          <Text style={styles.backText}>← Voltar</Text>
        </TouchableOpacity>

        <ScrollView contentContainerStyle={styles.detailContent}>
          <Text style={[styles.detailPkg, { color: accent }]}>{current.package}</Text>
          <Text style={styles.detailName}>{current.name}</Text>

          <View style={[styles.positionBadge, { borderColor: accent }]}>
            <Text style={[styles.positionNum, { color: accent }]}>#{current.position}</Text>
            <Text style={styles.positionLabel}>na fila {current.package}</Text>
          </View>

          <View style={styles.infoBlock}>
            <InfoRow label="EMAIL"             value={current.email} />
            <InfoRow label="TELEFONE"          value={current.phone} />
            <InfoRow label="PAGAMENTO"         value={current.paidAt} />
            <InfoRow label="CHECK-IN PREVISTO" value={current.expectedCheckin} accent={accent} />
          </View>

          <Text style={styles.notesLabel}>OBSERVAÇÕES</Text>
          <TextInput
            style={styles.notesInput}
            value={editNotes}
            onChangeText={setEditNotes}
            placeholder="Adicionar observação..."
            placeholderTextColor={colors.creamDim}
            multiline
            numberOfLines={3}
          />
          <TouchableOpacity style={styles.saveBtn} onPress={saveNotes}>
            <Text style={styles.saveBtnText}>SALVAR OBSERVAÇÃO</Text>
          </TouchableOpacity>

          <View style={styles.actionRow}>
            <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.success }]} onPress={() => confirmCheckin(current.id)}>
              <Text style={[styles.actionBtnText, { color: colors.success }]}>CONFIRMAR CHECK-IN</Text>
              <Text style={styles.actionBtnSub}>Move para hóspedes ativos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, { borderColor: colors.danger }]} onPress={() => removeFromList(current.id)}>
              <Text style={[styles.actionBtnText, { color: colors.danger }]}>REMOVER DA LISTA</Text>
              <Text style={styles.actionBtnSub}>Cancela a reserva</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        {['BLACK', 'PLATINUM', 'DIAMOND'].map(pkg => {
          const count = list.filter(w => w.package === pkg).length;
          const accent = packages[pkg]?.accent || colors.white;
          return (
            <View key={pkg} style={styles.statBox}>
              <Text style={[styles.statNum, { color: accent }]}>{count}</Text>
              <Text style={styles.statLabel}>{packages[pkg]?.label || pkg}</Text>
            </View>
          );
        })}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filtersContent}>
        {filters.map(f => {
          const accent = packages[f]?.accent;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.filterBtn, filter === f && { borderColor: accent || colors.white, backgroundColor: (accent || colors.white) + '15' }]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && { color: accent || colors.white }]}>{packages[f]?.label || f}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list}>
        {filtered.length === 0 && (
          <Text style={styles.empty}>Nenhuma pessoa na lista de espera.</Text>
        )}
        {filtered.map(item => {
          const accent = packages[item.package]?.accent || colors.white;
          return (
            <TouchableOpacity key={item.id} style={styles.card} onPress={() => openDetail(item)}>
              <View style={[styles.positionCircle, { borderColor: accent }]}>
                <Text style={[styles.positionCircleNum, { color: accent }]}>#{item.position}</Text>
              </View>
              <View style={styles.cardBody}>
                <Text style={[styles.cardPkg, { color: accent }]}>{packages[item.package]?.label || item.package}</Text>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardEmail}>{item.email}</Text>
                <View style={styles.cardMeta}>
                  <Text style={styles.cardMetaText}>Pago em {item.paidAt}</Text>
                  <Text style={[styles.cardMetaCheckin, { color: accent }]}>Check-in: {item.expectedCheckin}</Text>
                </View>
                {item.notes ? <Text style={styles.cardNotes}>"{item.notes}"</Text> : null}
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  statsRow: { flexDirection: 'row', backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  statBox: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  statNum: { fontSize: 26, fontWeight: '300' },
  statLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 3, marginTop: 2 },
  filters: { maxHeight: 52, borderBottomWidth: 1, borderBottomColor: colors.border },
  filtersContent: { paddingHorizontal: 16, alignItems: 'center', gap: 8 },
  filterBtn: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 2 },
  filterText: { color: colors.creamDim, fontSize: 11, letterSpacing: 2 },
  list: { padding: 16, paddingBottom: 40, gap: 10 },
  empty: { color: colors.creamDim, textAlign: 'center', marginTop: 60, fontSize: 13 },
  card: { backgroundColor: colors.surface, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 },
  positionCircle: { width: 42, height: 42, borderRadius: 21, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  positionCircleNum: { fontSize: 12, fontWeight: '600', letterSpacing: 1 },
  cardBody: { flex: 1 },
  cardPkg: { fontSize: 9, letterSpacing: 4, marginBottom: 2 },
  cardName: { color: colors.white, fontSize: 15, marginBottom: 2 },
  cardEmail: { color: colors.creamDim, fontSize: 11, marginBottom: 6 },
  cardMeta: { flexDirection: 'row', justifyContent: 'space-between' },
  cardMetaText: { color: colors.creamDim, fontSize: 10 },
  cardMetaCheckin: { fontSize: 10, fontWeight: '600' },
  cardNotes: { color: colors.creamDim, fontSize: 10, fontStyle: 'italic', marginTop: 4 },
  arrow: { color: colors.creamDim, fontSize: 22 },
  backBtn: { padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  backText: { color: colors.creamDim, fontSize: 13 },
  detailContent: { padding: 24, paddingBottom: 48 },
  detailPkg: { fontSize: 10, letterSpacing: 5, marginBottom: 6 },
  detailName: { color: colors.white, fontSize: 26, fontWeight: '300', marginBottom: 20 },
  positionBadge: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 10, marginBottom: 24 },
  positionNum: { fontSize: 22, fontWeight: '300' },
  positionLabel: { color: colors.creamDim, fontSize: 11, letterSpacing: 1 },
  infoBlock: { borderWidth: 1, borderColor: colors.border, marginBottom: 24 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', padding: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { color: colors.creamDim, fontSize: 10, letterSpacing: 2 },
  infoValue: { color: colors.cream, fontSize: 12 },
  notesLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 4, marginBottom: 10 },
  notesInput: { backgroundColor: colors.surface, color: colors.white, padding: 14, fontSize: 13, minHeight: 80, textAlignVertical: 'top', marginBottom: 10 },
  saveBtn: { borderWidth: 1, borderColor: colors.border, padding: 12, alignItems: 'center', marginBottom: 24 },
  saveBtnText: { color: colors.creamDim, fontSize: 10, letterSpacing: 3 },
  actionRow: { gap: 10 },
  actionBtn: { borderWidth: 1, padding: 16, alignItems: 'center' },
  actionBtnText: { fontSize: 11, letterSpacing: 3, marginBottom: 4 },
  actionBtnSub: { color: colors.creamDim, fontSize: 10 },
});
