import currencyToNumber from "./currencyToNumber.js";
import stringToDate from "./stringToDate.js";

function normalizeTransaction(transacao: TransacaoAPI): Transacao {
  return {
    nome: transacao.Nome,
    id: transacao.ID,
    data: stringToDate(transacao.Data),
    status: transacao.Status,
    email: transacao.Email,
    moeda: transacao["Valor (R$)"],
    valor: currencyToNumber(transacao["Valor (R$)"]),
    pagamento: transacao["Forma de Pagamento"],
    novo: Boolean(transacao["Cliente Novo"]),
  };
}

export default normalizeTransaction;
