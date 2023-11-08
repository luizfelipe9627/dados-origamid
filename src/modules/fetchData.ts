/**
 * Recebe url da api e retorna os dados da api em formato json.
*/

// Função chamada fetchData que recebe um tipo genérico T(uma variável, e que contém um parâmetro chamado url do tipo string, por fim retorna uma Promise do tipo T ou null.
// O async está tornando a função assíncrona, ou seja, ela vai esperar os await serem resolvidos para depois retornar o valor.
async function fetchData<T>(url: string): Promise<T | null> {
  // O try está falando para tentar executar o código, se der algum erro ele vai para o catch.
  try {
    // O await está falando para esperar as respostas das requisições para depois armazenar o retorno na variável.
    const response = await fetch(url); // Faz uma requisição para a url da api e armazena o retorno(a resposta) na variável response.
    // Se a resposta não for ok, executa o if.
    if (!response.ok) {
      throw new Error("Erro: " + response.status); // Cria um erro e para a execução do código levando para o catch.
    }
    const json = await response.json(); // Converte o retorno da requisição para json e armazena na variável data.
    return json; // Retorna o json convertido.
  } catch (erro) {
    // Se erro for uma instância de Error(responsável por tratar erros), executa o if.
    if (erro instanceof Error) {
      console.log("FetchData: " + erro.message); // Mostra uma mensagem de erro no console.
    }
    return null; // Retorna null caso ocorra algum erro.
  }
}

export default fetchData; // Exporta a função fetchData para ser utilizada em outros arquivos.
