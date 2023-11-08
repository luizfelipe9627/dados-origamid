import countBy from "./countBy.js";

type TransacaoValor = Transacao & { valor: number }; // Criado um tipo chamado TransacaoValor que recebe a interface Transacao, sendo assim cria uma nova interface com os mesmos valores da interface Transacao e adiciona a propriedade valor do tipo number.

// Criado uma função chamada filtrarValor que cria um parâmetro chamado transacao do tipo Transacao(interface) e retorna um boolean, no caso se transacao for do tipo TransacaoValor retorna true, se não retorna false.
function filtrarValor(transacao: Transacao): transacao is TransacaoValor {
  return transacao.valor !== null; // Retorna true se o valor da transação for diferente de null.
}

// Criado uma classe chamada Statistics.
class Statistics {
  // Para funcionar no this do construtor, a propriedade precisa ser criada fora do construtor, com o exato nome que será passado no construtor e o seu valor.
  private transacoes; // O private deixa a propriedade transacoes privada, ou seja, só pode ser acessada dentro da classe.
  total;
  pagamento;
  status;
  semana;
  melhorDia;

  // O construtor é responsável pela definição das propriedades/parâmetros da classe. O construtor recebe um parâmetro obrigatório chamado transacoes do tipo interface Transacao[] e não retorna nada.
  constructor(transacoes: Transacao[]) {
    // Está atribuindo o valor do parâmetro para a propriedade da classe pai(Statistics).
    this.transacoes = transacoes;
    // Está atribuindo o valor das propriedades para os métodos privados da classe.
    this.total = this.setTotal();
    this.pagamento = this.setPagamento();
    this.status = this.setStatus();
    this.semana = this.setSemana();
    this.melhorDia = this.setMelhorDia();
  }

  // Criado um método privado(não pode ser acessado fora da classe) chamado setTotal, responsável por definir o valor total das transações.
  private setTotal() {
    // Retorna o valor total das transações.
    return (
      this.transacoes
        // O filter passa por cada item do array transacoes e executa a função filtrarValor, criando um novo array com os itens que retornaram true.
        .filter(filtrarValor)
        // O reduce passa por cada item do array e executa a função, o primeiro parâmetro é o acumulador e o segundo é o item atual que no caso está sendo desestruturado para pegar apenas o valor da transação. O valor inicial do acumulador é 0.
        .reduce((acc, { valor }) => {
          return (acc += valor); // Retorna o valor do acumulador mais o valor da transação.
        }, 0)
    );
  }

  // Criado um método privado(não pode ser acessado fora da classe) chamado setPagamento, responsável por definir a quantidade de cada tipo de pagamento.
  private setPagamento() {
    return countBy(this.transacoes.map(({ pagamento }) => pagamento)); // Retorna o resultado da função countBy passando como parâmetro o array de pagamentos, sendo assim retorna um objeto com a quantidade de cada tipo de pagamento.
  }

  // Criado um método privado(não pode ser acessado fora da classe) chamado setStatus, responsável por definir a quantidade de cada tipo de status.
  private setStatus() {
    return countBy(this.transacoes.map(({ status }) => status)); // Retorna o resultado da função countBy passando como parâmetro o array de status, sendo assim retorna um objeto com a quantidade de cada tipo de status.
  }

  // Criado um método privado(não pode ser acessado fora da classe) chamado setMelhorDia, responsável por definir a quantidade de transações de cada dia da semana.
  private setSemana() {
    // Criado um objeto chamado semana com as propriedades sendo os dias da semana em string e setando 0 como valor inicial dos dias.
    const semana = {
      ["Domingo"]: 0,
      ["Segunda-feira"]: 0,
      ["Terça-feira"]: 0,
      ["Quarta-feira"]: 0,
      ["Quinta-feira"]: 0,
      ["Sexta-feira"]: 0,
      ["Sábado"]: 0,
    };

    // O for começa com i = 0, e depois adiciona 1 ao i, se i for menor que o tamanho do array transacoes(no caso o tamanho é 100) executa o código abaixo.
    for (let i = 0; i < this.transacoes.length; i++) {
      const day = this.transacoes[i].data.getDay(); // Cria uma constante chamada day que recebe o dia da semana(em número) da transação.

      // Cria uma condição que verifica se o dia da semana é igual ao dia da semana da transação, se for adiciona 1 ao valor da propriedade da semana.
      if (day === 0) semana["Domingo"] += 1;
      if (day === 1) semana["Segunda-feira"] += 1;
      if (day === 2) semana["Terça-feira"] += 1;
      if (day === 3) semana["Quarta-feira"] += 1;
      if (day === 4) semana["Quinta-feira"] += 1;
      if (day === 5) semana["Sexta-feira"] += 1;
      if (day === 6) semana["Sábado"] += 1;
    }

    return semana; // Retorna o objeto semana.
  }

  // Criado um método privado(não pode ser acessado fora da classe) chamado setMelhorDia, responsável por definir o melhor dia da semana.
  private setMelhorDia() {
    // Retorna o primeiro item do array que foi ordenado do maior para o menor.
    return Object.entries(this.semana).sort((proximo, atual) => {
      return atual[1] - proximo[1]; // Retorna o valor do item atual menos o valor do item anterior, fazendo com que o array seja ordenado do maior para o menor.
    })[0];
  }
}

export default Statistics; // Exporta a classe Statistics para ser usada em outro arquivo.
