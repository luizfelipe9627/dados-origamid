import currencyToNumber from "./currencyToNumber.js";
import stringToDate from "./stringToDate.js";

// Criado uma função chamada normalizeTransaction que recebe um parâmetro chamado transacao que é do tipo TransacaoAPI e retorna um valor do tipo Transacao.
function normalizeTransaction(transacao: TransacaoAPI): Transacao {
  // Retorna um objeto com os dados da interface TransacaoAPI convertidos para os tipos de dados da interface Transacao.
  return {
    nome: transacao.Nome,
    id: transacao.ID,
    // Chama a função stringToDate passando como parâmetro a data da transação e retorna a data convertida para o tipo Date.
    data: stringToDate(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    // Chama a função currencyToNumber passando como parâmetro o valor da moeda e retorna o valor convertido para moeda.
    valor: currencyToNumber(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    // Converte o valor para booleano.
    novo: Boolean(transacao["Cliente Novo"]),
  };
}

export default normalizeTransaction;
