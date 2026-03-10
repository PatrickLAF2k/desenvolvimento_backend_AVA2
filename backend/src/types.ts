export interface usuario {
  id?: string;
  nome: string;
  email: string;
  senha: string;
  tipo?: string;
}

export interface medico {
  id?: string;
  nome: string;
  especialidade: string;
  crm: string;
  email: string;
  telefone?: string;
}

export interface agendamento {
  id?: string;
  id_usuario: string;
  id_medico: string;
  data: string;
  hora: string;
  observacao?: string;
  status: 'agendada' | 'cancelada' | 'concluida' | 'confirmada';
}
