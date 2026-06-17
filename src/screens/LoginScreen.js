import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { colors } from '../constants/theme';
import { signIn } from '../lib/auth';

export default function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email || !password) { setError('Preencha email e senha.'); return; }
    setLoading(true);
    setError('');
    try {
      const user = await signIn(email.trim().toLowerCase(), password);
      onLogin(user);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <View style={styles.inner}>

        <View style={styles.logoArea}>
          <View style={styles.logoRing}>
            <Image source={require('../../assets/logo.png')} style={styles.logoImg} resizeMode="contain" />
          </View>
          <Text style={styles.logoName}>GOAT</Text>
          <Text style={styles.logoSub}>PACKAGES · RIO DE JANEIRO</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor={colors.creamDim}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Text style={[styles.label, { marginTop: 20 }]}>SENHA</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            placeholderTextColor={colors.creamDim}
            secureTextEntry
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity style={styles.btn} onPress={handleLogin} disabled={loading}>
            {loading
              ? <ActivityIndicator color={colors.black} />
              : <Text style={styles.btnText}>ENTRAR</Text>
            }
          </TouchableOpacity>
        </View>

        <Text style={styles.hint}>lucas@email.com / 123456{'\n'}equipe@goatrio.com / goat2026</Text>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.black },
  inner: { flex: 1, justifyContent: 'center', paddingHorizontal: 36 },
  logoArea: { alignItems: 'center', marginBottom: 48 },
  logoRing: {
    width: 110, height: 110, borderRadius: 55,
    borderWidth: 1, borderColor: colors.borderStrong,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 18,
    backgroundColor: 'rgba(201,164,82,0.05)',
  },
  logoImg: { width: 72, height: 72 },
  logoName: { color: colors.gold, fontSize: 28, letterSpacing: 12, fontWeight: '300', marginBottom: 4 },
  logoSub: { color: colors.creamDim, fontSize: 9, letterSpacing: 4 },
  divider: { width: 40, height: 1, backgroundColor: colors.borderStrong, marginTop: 20 },
  form: {},
  label: { color: colors.gold, fontSize: 9, letterSpacing: 4, marginBottom: 10 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderStrong,
    color: colors.white,
    fontSize: 15,
    paddingVertical: 12,
  },
  error: { color: colors.danger, fontSize: 12, marginTop: 12 },
  btn: {
    backgroundColor: colors.gold,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 36,
  },
  btnText: { color: colors.black, fontSize: 11, letterSpacing: 5, fontWeight: '700' },
  hint: { color: 'rgba(255,255,255,0.12)', fontSize: 10, textAlign: 'center', marginTop: 40, lineHeight: 18 },
});
