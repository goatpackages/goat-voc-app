// Mock auth — substituir por Supabase quando configurado
const users = [
  { id: 'u1', email: 'lucas@email.com', password: '123456', role: 'client', package: 'BLACK', name: 'Lucas Mendes', wristbandId: 'WB-001' },
  { id: 'u2', email: 'bia@email.com',   password: '123456', role: 'client', package: 'DIAMOND', name: 'Beatriz Lima', wristbandId: 'WB-004' },
  { id: 'u3', email: 'equipe@goatrio.com', password: 'goat2026', role: 'team', name: 'Equipe GOAT' },
];

export async function signIn(email, password) {
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Email ou senha incorretos.');
  return user;
}

export async function signOut() {
  return true;
}
