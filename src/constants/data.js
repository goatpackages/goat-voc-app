// Incrementar a cada novo evento realizado
export const eventoEdicao = 1;
export const eventoEdicaoLabel = `Edição ${String(eventoEdicao).padStart(2, '0')}`;

export const packagesData = {
  BLACK: {
    tagline: 'A experiência completa do Rio.',
    price: 'R$5.990',
    includes: [
      { category: 'RESIDÊNCIA', items: ['Hospedagem em casa privativa com piscina', 'Café da manhã incluído', 'Transfer aeroporto'] },
      { category: 'FESTAS', items: ['Acesso VIP aos melhores clubs da Barra', 'Camarote exclusivo no Carnaval', 'Open bar nas festas do grupo'] },
      { category: 'ATIVIDADES', items: ['Passeio de barco pela Baía de Guanabara', 'Trilha no Parque Nacional da Tijuca', 'Aula de surf em Ipanema', 'City tour com guia exclusivo'] },
    ],
    spots: 14,
    spotsLeft: 3,
  },
  PLATINUM: {
    tagline: 'Premium em todos os detalhes.',
    price: 'R$11.990',
    includes: [
      { category: 'RESIDÊNCIA', items: ['Casa premium com piscina e vista para o mar', 'Chef privado para jantares exclusivos', 'Concierge dedicado'] },
      { category: 'FESTAS', items: ['Camarotes nos principais clubs', 'Evento exclusivo a bordo de iate', 'Mesa VIP garantida'] },
      { category: 'ATIVIDADES', items: ['Jetski e esportes náuticos', 'Helicóptero panorâmico', 'Experiências gastronômicas exclusivas', 'Transfer executivo em todos os deslocamentos'] },
    ],
    spots: 10,
    spotsLeft: 0,
  },
  DIAMOND: {
    tagline: 'O extraordinário como padrão.',
    price: 'A negociar',
    includes: [
      { category: 'RESIDÊNCIA', items: ['Mansão privativa com piscina infinita e vista panorâmica', 'Chef privado e concierge 24h', 'Equipe de segurança privada 24h'] },
      { category: 'FESTAS', items: ['Acesso exclusivo aos melhores camarotes da Barra', 'Evento exclusivo no iate mais sofisticado da Marina da Glória'] },
      { category: 'ATIVIDADES', items: ['Passeio panorâmico de helicóptero', 'Jetski e passeios náuticos privados', 'Itinerário totalmente personalizado', 'Transfer executivo incluído'] },
    ],
    spots: 8,
    spotsLeft: 8,
  },
};

export const scheduleData = {
  BLACK: [
    { day: 'Seg', date: '14/07', events: [{ time: '08:00', title: 'Café da manhã coletivo', location: 'Residência', type: 'residencia' }, { time: '14:00', title: 'Aula de surf', location: 'Praia de Ipanema', type: 'atividade' }, { time: '23:00', title: 'Club night — Barra', location: 'Baile Funk Club', type: 'festa' }] },
    { day: 'Ter', date: '15/07', events: [{ time: '09:00', title: 'City tour com guia', location: 'Centro Histórico', type: 'atividade' }, { time: '19:00', title: 'Jantar em grupo', location: 'Restaurante parceiro', type: 'residencia' }] },
    { day: 'Qua', date: '16/07', events: [{ time: '10:00', title: 'Passeio de barco', location: 'Baía de Guanabara', type: 'atividade' }, { time: '22:00', title: 'Camarote VIP', location: 'Club Niterói', type: 'festa' }] },
    { day: 'Qui', date: '17/07', events: [{ time: '08:00', title: 'Trilha Tijuca', location: 'Parque Nacional da Tijuca', type: 'atividade' }, { time: '21:00', title: 'Open bar — festa do grupo', location: 'Residência', type: 'festa' }] },
    { day: 'Sex', date: '18/07', events: [{ time: '12:00', title: 'Almoço no beach club', location: 'Beach Club Barra', type: 'atividade' }, { time: '23:59', title: 'Festa de encerramento', location: 'Marina da Glória', type: 'festa' }] },
  ],
  PLATINUM: [
    { day: 'Seg', date: '14/07', events: [{ time: '08:00', title: 'Café da manhã com chef privado', location: 'Residência premium', type: 'residencia' }, { time: '15:00', title: 'Jetski e esportes náuticos', location: 'Praia da Barra', type: 'atividade' }, { time: '23:00', title: 'Mesa VIP — club exclusivo', location: 'Marina All Black', type: 'festa' }] },
    { day: 'Ter', date: '15/07', events: [{ time: '09:00', title: 'Helicóptero panorâmico', location: 'Marina da Glória', type: 'atividade' }, { time: '20:00', title: 'Jantar gourmet com chef', location: 'Residência', type: 'residencia' }] },
    { day: 'Qua', date: '16/07', events: [{ time: '11:00', title: 'Experiência gastronômica', location: 'Restaurante Premium', type: 'atividade' }, { time: '22:00', title: 'Evento exclusivo a bordo de iate', location: 'Iate — Marina da Glória', type: 'festa' }] },
    { day: 'Qui', date: '17/07', events: [{ time: '10:00', title: 'Spa e bem-estar', location: 'Spa parceiro', type: 'atividade' }, { time: '23:00', title: 'Camarote Platinum', location: 'Club Barra', type: 'festa' }] },
    { day: 'Sex', date: '18/07', events: [{ time: '13:00', title: 'Almoço VIP na praia', location: 'Beach Club exclusivo', type: 'atividade' }, { time: '22:00', title: 'Festa de encerramento Platinum', location: 'Cobertura Ipanema', type: 'festa' }] },
  ],
  DIAMOND: [
    { day: 'Seg', date: '14/07', events: [{ time: '08:00', title: 'Café da manhã na mansão', location: 'Mansão privativa', type: 'residencia' }, { time: '14:00', title: 'Helicóptero privado — panorâmica', location: 'Heliporto exclusivo', type: 'atividade' }, { time: '22:00', title: 'Camarote Diamond', location: 'Club Premium Barra', type: 'festa' }] },
    { day: 'Ter', date: '15/07', events: [{ time: '10:00', title: 'Iate privativo — dia no mar', location: 'Marina da Glória', type: 'atividade' }, { time: '20:00', title: 'Jantar privado com chef', location: 'Mansão privativa', type: 'residencia' }] },
    { day: 'Qua', date: '16/07', events: [{ time: '09:00', title: 'Jetski e passeios privados', location: 'Praia exclusiva', type: 'atividade' }, { time: '21:00', title: 'Evento exclusivo no iate de luxo', location: 'Iate — Marina da Glória', type: 'festa' }] },
    { day: 'Qui', date: '17/07', events: [{ time: '11:00', title: 'Experiência náutica privada', location: 'Baía de Guanabara', type: 'atividade' }, { time: '23:00', title: 'Noite VIP — acesso total', location: 'Club Diamond Barra', type: 'festa' }] },
    { day: 'Sex', date: '18/07', events: [{ time: '12:00', title: 'Almoço na cobertura panorâmica', location: 'Cobertura exclusiva', type: 'residencia' }, { time: '22:00', title: 'Festa de encerramento Diamond', location: 'Mansão privativa', type: 'festa' }] },
  ],
};

export const partnersData = [
  { id: 1, name: 'Beach Club Barra', category: 'Beach Club', discount: '30% OFF', access: ['BLACK', 'PLATINUM', 'DIAMOND'], address: 'Av. Lúcio Costa, 3900 - Barra da Tijuca', coords: { latitude: -23.0100, longitude: -43.3650 } },
  { id: 2, name: 'Sushi Leblon', category: 'Restaurante', discount: '20% OFF', access: ['PLATINUM', 'DIAMOND'], address: 'Rua Dias Ferreira, 256 - Leblon', coords: { latitude: -22.9842, longitude: -43.2248 } },
  { id: 3, name: 'Academia Nobre', category: 'Academia', discount: 'Acesso gratuito', access: ['BLACK', 'PLATINUM', 'DIAMOND'], address: 'Av. das Américas, 500 - Barra', coords: { latitude: -23.0012, longitude: -43.3480 } },
  { id: 4, name: 'Helisight Rio', category: 'Experiência', discount: '15% OFF', access: ['DIAMOND'], address: 'Marina da Glória - Glória', coords: { latitude: -22.9127, longitude: -43.1732 } },
  { id: 5, name: 'Braza Bar', category: 'Bar', discount: '1 drink grátis', access: ['BLACK', 'PLATINUM', 'DIAMOND'], address: 'Rua Barão da Torre, 368 - Ipanema', coords: { latitude: -22.9844, longitude: -43.2029 } },
  { id: 6, name: 'Marina All Black', category: 'Club', discount: 'Lista VIP', access: ['PLATINUM', 'DIAMOND'], address: 'Av. Olegário Maciel, 1 - Barra', coords: { latitude: -23.0050, longitude: -43.3700 } },
];

export const notificationsData = [
  { id: 1, title: 'Bem-vindo ao GOAT Rio!', body: 'Seu pacote foi confirmado. Prepare-se para a experiência da sua vida.', time: '10:00', date: '13/07', read: true, type: 'info' },
  { id: 2, title: 'Amanhã: Aula de surf', body: 'Lembre-se: amanhã às 14h tem aula de surf em Ipanema. Use protetor solar!', time: '18:00', date: '13/07', read: false, type: 'agenda' },
  { id: 3, title: 'Transfer confirmado', body: 'Seu transfer para o aeroporto no dia 19/07 às 08h está confirmado.', time: '09:30', date: '14/07', read: false, type: 'info' },
  { id: 4, title: 'Festa hoje à noite', body: 'Esta noite às 23h: club night na Barra. Pulseira obrigatória na entrada.', time: '15:00', date: '14/07', read: false, type: 'festa' },
];

export const guestsData = [
  { id: 1, name: 'Lucas Mendes', package: 'BLACK', email: 'lucas@email.com', phone: '+55 11 99999-0001', wristbandId: 'WB-001', active: true, checkedIn: false, checkinHistory: [] },
  { id: 2, name: 'Mariana Costa', package: 'BLACK', email: 'mari@email.com', phone: '+55 21 99999-0002', wristbandId: 'WB-002', active: true, checkedIn: true, checkinHistory: [{ event: 'Club night — Barra', time: '23:14', date: '14/07' }] },
  { id: 3, name: 'Rafael Torres', package: 'PLATINUM', email: 'rafa@email.com', phone: '+55 11 99999-0003', wristbandId: 'WB-003', active: true, checkedIn: false, checkinHistory: [] },
  { id: 4, name: 'Beatriz Lima', package: 'DIAMOND', email: 'bia@email.com', phone: '+55 21 99999-0004', wristbandId: 'WB-004', active: true, checkedIn: false, checkinHistory: [] },
  { id: 5, name: 'Pedro Alves', package: 'BLACK', email: 'pedro@email.com', phone: '+55 11 99999-0005', wristbandId: 'WB-005', active: false, checkedIn: false, checkinHistory: [] },
];

export const waitlistData = [
  { id: 'w1', name: 'Fernanda Oliveira', package: 'BLACK', email: 'fernanda@email.com', phone: '+55 21 98888-0001', paidAt: '02/06/2026', expectedCheckin: '21/07/2026', position: 1, notes: '' },
  { id: 'w2', name: 'Gabriel Santos',   package: 'PLATINUM', email: 'gabriel@email.com', phone: '+55 11 98888-0002', paidAt: '05/06/2026', expectedCheckin: '28/07/2026', position: 1, notes: 'Prefere grupo misto' },
  { id: 'w3', name: 'Isabela Rocha',    package: 'BLACK', email: 'isa@email.com',     phone: '+55 21 98888-0003', paidAt: '10/06/2026', expectedCheckin: '21/07/2026', position: 2, notes: '' },
  { id: 'w4', name: 'Thiago Lima',      package: 'DIAMOND', email: 'thiago@email.com',  phone: '+55 11 98888-0004', paidAt: '12/06/2026', expectedCheckin: 'A definir',  position: 1, notes: 'Aguardando abertura de nova edição' },
  { id: 'w5', name: 'Carolina Matos',   package: 'BLACK', email: 'carol@email.com',   phone: '+55 21 98888-0005', paidAt: '14/06/2026', expectedCheckin: '21/07/2026', position: 3, notes: '' },
];
