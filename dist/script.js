import Statistics from "./modules/Statistics.js";
import fetchData from "./modules/fetchData.js";
import normalizeTransaction from "./modules/normalizeTransaction.js";
async function handleData() {
    const data = await fetchData("https://api.origamid.dev/json/transacoes.json");
    if (!data)
        return;
    const transacoes = data.map(normalizeTransaction);
    preencherTabela(transacoes);
    preencherEstatisticas(transacoes);
}
function preencherLista(lista, containerId) {
    const containerElement = document.getElementById(containerId);
    if (containerElement) {
        Object.keys(lista)
            .forEach((key) => {
            containerElement.innerHTML += `
          <p>${key}: ${lista[key]}</p>
        `;
        });
    }
}
function preencherEstatisticas(transacoes) {
    const data = new Statistics(transacoes);
    const totalElement = document.querySelector("#total span");
    if (totalElement) {
        totalElement.innerText = data.total.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });
    }
    preencherLista(data.pagamento, "pagamento");
    preencherLista(data.status, "status");
    const diaElement = document.querySelector("#dia span");
    if (diaElement) {
        diaElement.innerText = `${data.melhorDia[0]}`;
    }
}
function preencherTabela(transacoes) {
    const tabela = document.querySelector("#transacoes tbody");
    if (!tabela)
        return;
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
//# sourceMappingURL=script.js.map