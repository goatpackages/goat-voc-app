import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/theme';
import { notificationsData } from '../../constants/data';

const typeIcon = { info: '◈', agenda: '◎', festa: '◉' };
const typeColor = { info: colors.creamDim, agenda: '#7ec8a0', festa: '#c87eb8' };

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(notificationsData);

  function markRead(id) {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  }

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  const unread = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.container}>
      {unread > 0 && (
        <View style={styles.topBar}>
          <Text style={styles.unreadCount}>{unread} não lida{unread > 1 ? 's' : ''}</Text>
          <TouchableOpacity onPress={markAllRead}>
            <Text style={styles.markAll}>Marcar todas como lidas</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.list}>
        {notifications.length === 0 && (
          <Text style={styles.empty}>Nenhuma notificação.</Text>
        )}
        {notifications.map(n => (
          <TouchableOpacity key={n.id} style={[styles.card, !n.read && styles.cardUnread]} onPress={() => markRead(n.id)} activeOpacity={0.8}>
            <View style={styles.cardLeft}>
              <Text style={[styles.icon, { color: typeColor[n.type] }]}>{typeIcon[n.type]}</Text>
            </View>
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text style={[styles.cardTitle, !n.read && { color: colors.white }]}>{n.title}</Text>
                {!n.read && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.cardText}>{n.body}</Text>
              <Text style={styles.cardMeta}>{n.date} · {n.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  unreadCount: { color: colors.creamDim, fontSize: 11, letterSpacing: 2 },
  markAll: { color: colors.gold, fontSize: 11, letterSpacing: 1 },
  list: { padding: 16, paddingBottom: 40, gap: 8 },
  empty: { color: colors.creamDim, textAlign: 'center', marginTop: 60, fontSize: 13 },
  card: { backgroundColor: colors.surface, flexDirection: 'row', padding: 16, opacity: 0.6 },
  cardUnread: { opacity: 1, borderLeftWidth: 2, borderLeftColor: colors.gold },
  cardLeft: { marginRight: 14, paddingTop: 2 },
  icon: { fontSize: 18 },
  cardBody: { flex: 1 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  cardTitle: { color: colors.creamDim, fontSize: 13, fontWeight: '500', flex: 1 },
  unreadDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.gold, marginLeft: 8 },
  cardText: { color: colors.creamDim, fontSize: 12, lineHeight: 18, marginBottom: 8 },
  cardMeta: { color: 'rgba(255,255,255,0.2)', fontSize: 10, letterSpacing: 1 },
});
