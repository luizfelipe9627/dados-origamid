import Statistics from "./modules/Statistics.js";
import { CountList } from "./modules/countBy.js";
import fetchData from "./modules/fetchData.js";
import normalizeTransaction from "./modules/normalizeTransaction.js";

async function handleData() {
  const data = await fetchData<TransacaoAPI[]>(
    "https://api.origamid.dev/json/transacoes.json",
  );

  if (!data) return;

  const transacoes = data.map(normalizeTransaction);

  preencherTabela(transacoes);
  preencherEstatisticas(transacoes);
}

function preencherLista(lista: CountList, containerId: string) {
  const containerElement = document.getElementById(containerId) as HTMLElement;

  if (containerElement) {
    Object.keys(lista).forEach((key) => {
      containerElement.innerHTML += `
          <p>${key}: ${lista[key]}</p>
        `;
    });
  }
}

function preencherEstatisticas(transacoes: Transacao[]): void {
  const data = new Statistics(transacoes);

  const totalElement = document.querySelector("#total span") as HTMLElement;

  if (totalElement) {
    totalElement.innerText = data.total.toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  preencherLista(data.pagamento, "pagamento");
  preencherLista(data.status, "status");

  const diaElement = document.querySelector("#dia span") as HTMLElement;

  if (diaElement) {
    diaElement.innerText = `${data.melhorDia[0]}`;
  }
}

function preencherTabela(transacoes: Transacao[]): void {
  const tabela = document.querySelector("#transacoes tbody");

  if (!tabela) return;

  transacoes.forEach((transacao) => {
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

handleData();
