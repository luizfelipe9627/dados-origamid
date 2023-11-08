async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro: " + response.status);
        }
        const json = await response.json();
        return json;
    }
    catch (erro) {
        if (erro instanceof Error) {
            console.log("FetchData: " + erro.message);
        }
        return null;
    }
}
export default fetchData;
//# sourceMappingURL=fetchData.js.map