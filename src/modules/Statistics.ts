import countBy from "./countBy.js";

type TransacaoValor = Transacao & { valor: number };

function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null;
}

class Statistics {
  private transacoes;
  total;
  pagamento;
  status;
  semana;
  melhorDia;

  constructor(transacoes: Transacao[]) {
    this.transacoes = transacoes;
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }

  private setTotal() {
    return this.transacoes.filter(filtrarValor).reduce((acc, { valor }) => {
      return (acc += valor);
    }, 0);
  }

  private setPagamento() {
    return countBy(this.transacoes.map(({ pagamento }) => pagamento));
  }

  private setStatus() {
    return countBy(this.transacoes.map(({ status }) => status));
  }

  private setSemana() {
    const semana = {
      ["Domingo"]: 0,
      ["Segunda-feira"]: 0,
      ["Terça-feira"]: 0,
      ["Quarta-feira"]: 0,
      ["Quinta-feira"]: 0,
      ["Sexta-feira"]: 0,
      ["Sábado"]: 0,
    };

    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay();

      if (day === 0) semana["Domingo"] += 1;
      if (day === 1) semana["Segunda-feira"] += 1;
      if (day === 2) semana["Terça-feira"] += 1;
      if (day === 3) semana["Quarta-feira"] += 1;
      if (day === 4) semana["Quinta-feira"] += 1;
      if (day === 5) semana["Sexta-feira"] += 1;
      if (day === 6) semana["Sábado"] += 1;
    }
    return semana;
  }

  private setMelhorDia() {
    return Object.entries(this.semana).sort((proximo, atual) => {
      return atual[1] - proximo[1];
    })[0];
  }
}

export default Statistics;
