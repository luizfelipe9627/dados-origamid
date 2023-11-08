type TransacaoPagamento = "Boleto" | "Cartão de Crédito"; // Criado um tipo chamado TransacaoPagamento que só pode receber os valores "Boleto" ou "Cartão de Crédito".

// Criado um tipo chamado TransacaoStatus que só pode receber os valores "Paga", "Recusada pela operadora de cartão", "Aguardando pagamento" ou "Estornado".
type TransacaoStatus =
  | "Paga"
  | "Recusada pela operadora de cartão"
  | "Aguardando pagamento"
  | "Estornado";

// Criado uma interface chamada TransacaoAPI que recebe os tipos de dados que a API retorna.
interface TransacaoAPI {
  Nome: string;
  ID: number;
  Data: string;
  Status: TransacaoStatus;
  Email: string;
  // Quando o nome da propriedade tem espaço ou caracteres especiais, é necessário colocar entre aspas.
  ["Forma de Pagamento"]: TransacaoPagamento;
  ["Valor (R$)"]: string;
  ["Cliente Novo"]: number;
}

// Criado uma interface chamada Transacao que recebe os tipos de dados que a função normalizarTransacao retorna.
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
