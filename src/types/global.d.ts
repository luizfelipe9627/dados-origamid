type TransacaoPagamento = "Boleto" | "Cartão de Crédito";

type TransacaoStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento"
  | "Estornado";

interface TransacaoAPI {
  Nome: string;
  ID: number;
  Data: string;
  Status: TransacaoStatus;
  Email: string;
  ["Forma de Pagamento"]: TransacaoPagamento;
  ["Valor (R$)"]: string;
  ["Cliente Novo"]: number;
}

interface Transacao {
  nome: string;
  id: number;
  data: Date;
  status: TransacaoStatus;
  email: string;
  moeda: string;
  valor: number | null;
  pagamento: TransacaoPagamento;
  novo: boolean;
}
