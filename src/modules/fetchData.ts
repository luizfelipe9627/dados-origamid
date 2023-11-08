/**
 * Recebe url da api e retorna os dados da api em formato json.
 */

async function fetchData<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Erro: " + response.status);
    }
    const json = await response.json();
    return json;
  } catch (erro) {
    if (erro instanceof Error) {
      console.log("FetchData: " + erro.message);
    }
    return null;
  }
}

export default fetchData;
