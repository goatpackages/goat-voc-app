import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, packages } from '../../constants/theme';
import { scheduleData } from '../../constants/data';

const typeColors = {
  residencia: colors.creamDim,
  atividade: '#7ec8a0',
  festa: '#c87eb8',
};

const typeLabels = { residencia: 'RESIDÊNCIA', atividade: 'ATIVIDADE', festa: 'FESTA' };

export default function ScheduleScreen({ user }) {
  const schedule = scheduleData[user.package] || [];
  const accent = packages[user.package]?.accent || colors.white;
  const [selectedDay, setSelectedDay] = useState(0);

  const day = schedule[selectedDay];

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayBar} contentContainerStyle={styles.dayBarContent}>
        {schedule.map((d, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.dayBtn, selectedDay === i && { borderColor: accent, backgroundColor: accent + '15' }]}
            onPress={() => setSelectedDay(i)}
          >
            <Text style={[styles.dayName, selectedDay === i && { color: accent }]}>{d.day}</Text>
            <Text style={[styles.dayDate, selectedDay === i && { color: accent }]}>{d.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.timeline}>
        {day?.events.map((evt, i) => (
          <View key={i} style={styles.eventRow}>
            <View style={styles.timeCol}>
              <Text style={styles.eventTime}>{evt.time}</Text>
              {i < day.events.length - 1 && <View style={[styles.timeLine, { backgroundColor: accent + '22' }]} />}
            </View>
            <View style={[styles.eventCard, { borderLeftColor: typeColors[evt.type] }]}>
              <Text style={[styles.eventType, { color: typeColors[evt.type] }]}>{typeLabels[evt.type]}</Text>
              <Text style={styles.eventTitle}>{evt.title}</Text>
              <Text style={styles.eventLocation}>◎  {evt.location}</Text>
            </View>
          </View>
        ))}

        {(!day || day.events.length === 0) && (
          <Text style={styles.empty}>Nenhum evento para este dia.</Text>
        )}
      </ScrollView>

      <View style={styles.legend}>
        {Object.entries(typeColors).map(([type, color]) => (
          <View key={type} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: color }]} />
            <Text style={styles.legendLabel}>{typeLabels[type]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  dayBar: { maxHeight: 68, borderBottomWidth: 1, borderBottomColor: colors.border },
  dayBarContent: { paddingHorizontal: 16, alignItems: 'center', gap: 8 },
  dayBtn: { borderWidth: 1, borderColor: colors.border, paddingHorizontal: 16, paddingVertical: 10, alignItems: 'center', minWidth: 58 },
  dayName: { color: colors.creamDim, fontSize: 11, letterSpacing: 2, fontWeight: '600' },
  dayDate: { color: colors.creamDim, fontSize: 9, letterSpacing: 1, marginTop: 2 },
  timeline: { padding: 20, paddingBottom: 40 },
  eventRow: { flexDirection: 'row', marginBottom: 0 },
  timeCol: { width: 52, alignItems: 'center', paddingTop: 4 },
  eventTime: { color: colors.creamDim, fontSize: 10, letterSpacing: 1 },
  timeLine: { width: 1, flex: 1, marginTop: 8, marginBottom: 0, minHeight: 24 },
  eventCard: { flex: 1, backgroundColor: colors.surface, borderLeftWidth: 2, marginLeft: 12, padding: 14, marginBottom: 12 },
  eventType: { fontSize: 9, letterSpacing: 3, marginBottom: 4 },
  eventTitle: { color: colors.white, fontSize: 15, marginBottom: 6 },
  eventLocation: { color: colors.creamDim, fontSize: 11 },
  empty: { color: colors.creamDim, textAlign: 'center', marginTop: 60, fontSize: 13 },
  legend: { flexDirection: 'row', justifyContent: 'center', gap: 20, padding: 12, borderTopWidth: 1, borderTopColor: colors.border },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  legendDot: { width: 7, height: 7, borderRadius: 4 },
  legendLabel: { color: colors.creamDim, fontSize: 9, letterSpacing: 2 },
});
