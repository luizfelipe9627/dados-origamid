// Importado as funções que vão ser usadas.
import Statistics from "./modules/Statistics.js";
import { CountList } from "./modules/countBy.js";
import fetchData from "./modules/fetchData.js";
import normalizeTransaction from "./modules/normalizeTransaction.js";

// Criado uma função assíncrona chamada handleData responsável por buscar os dados da API e preencher a tabela com os dados normalizados.
async function handleData() {
  // Criado uma constante chamada data que espera o retorno da função fetchData, passando como valor do tipo genérico T o tipo TransacaoAPI[], sendo assim retorna uma Promise do tipo TransacaoAPI[](interface) ou null e passando como parâmetro a url da api.
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json",
  );

  if (!data) return; // Se data for falso, não executa o código abaixo.

  const transacoes = data.map(normalizeTransaction); // Criado uma constante chamada transacoes que passa por cada item do array data e retorna um novo array com os dados normalizados.

  preencherTabela(transacoes); // Executa a função preencherTabela passando como parâmetro a constante transacoes.
  preencherEstatisticas(transacoes); // Executa a função preencherEstatisticas passando como parâmetro a constante transacoes.
}

// Criado uma função chamada preencherLista que cria um parâmetro chamado lista do tipo CountList(interface) e um parâmetro chamado containerId do tipo string e não retorna nada.
function preencherLista(lista: CountList, containerId: string) {
  const containerElement = document.getElementById(containerId) as HTMLElement; // Criado uma constante chamada containerElement que recebe o elemento span que está dentro do elemento com o id total, definido como um elemento do tipo HTMLElement.

  // Se containerElement for verdadeiro(existir), executa o código abaixo.
  if (containerElement) {
    // O object.keys está recebendo como parâmetro a propriedade passado no parâmetro lista e retornando um array com as chaves do objeto.
    Object.keys(lista)
      // O forEach passa por cada chave do array, armazena o valor no parâmetro key e depois executa o código abaixo.
      .forEach((key) => {
        // Está adicionando um novo elemento no containerElement com a chave(nome do tipo de pagamento ou status) e o valor(quantidade) da propriedade.
        containerElement.innerHTML += `
          <p>${key}: ${lista[key]}</p>
        `;
      });
  }
}

// Criado uma função chamada preencherEstatisticas que cria um parâmetro chamado transacoes do tipo Transacao(interface) que recebe um array de transações normalizadas e não retorna nada.
function preencherEstatisticas(transacoes: Transacao[]): void {
  const data = new Statistics(transacoes); // Criado uma constante chamada data que recebe uma nova instância/refêrencia da classe Statistics passando como parâmetro a constante transacoes.

  const totalElement = document.querySelector("#total span") as HTMLElement; // Criado uma constante chamada totalElement que recebe o elemento span que está dentro do elemento com o id total, definido como um elemento do tipo HTMLElement.

  // Se totalElement for verdadeiro(existir), executa o código abaixo.
  if (totalElement) {
    // O innerText do totalElement recebe o valor total da constante data formatado para o padrão de moeda brasileiro.
    totalElement.innerText = data.total.toLocaleString("pt-br", {
      style: "currency", // Estilo de moeda.
      currency: "BRL", // Tipo de moeda.
    });
  }

  preencherLista(data.pagamento, "pagamento"); // Executa a função preencherLista passando como parâmetro a propriedade pagamento da constante data e o id do elemento que será preenchido.

  preencherLista(data.status, "status"); // Executa a função preencherLista passando como parâmetro a propriedade status da constante data e o id do elemento que será preenchido.

  const diaElement = document.querySelector("#dia span") as HTMLElement; // Criado uma constante chamada diaElement que recebe o elemento span que está dentro do elemento com o id dia, definido como um elemento do tipo HTMLElement.

  // Se diaElement for verdadeiro(existir), executa o código abaixo.
  if (diaElement) {
    diaElement.innerText = `${data.melhorDia[0]}`; // Puxa o primeiro item do array melhorDia(o dia em string) e adiciona no innerText do diaElement.
  }
}

// Criado uma função chamada preencherTabela que cria um parâmetro chamado transacoes do tipo Transacao(interface) que recebe um array de transações normalizadas e não retorna nada.
function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector("#transacoes tbody"); // Criado uma constante chamada tabela que recebe o elemento tbody da tabela.

  if (!tabela) return; // Se tabela for falso, não executa o código abaixo.

  // O forEach passa por cada item do array transacoes e armazena o valor no parâmetro transacao e depois executa o código abaixo.
  transacoes.forEach((transacao) => {
    // Adiciona uma nova linha na tabela com os dados da transação.
    tabela.innerHTML += `
      <tr>
        <td>${transacao.nome}</td>
        <td>${transacao.email}</td>
        <td>R$ ${transacao.moeda}</td>
        <td>${transacao.pagamento}</td>
        <td>${transacao.status}</td>
      </tr>
    `;
  });
}

handleData(); // Executa a função handleData.
