function currencyToNumber(moeda) {
    const numero = Number(moeda.replaceAll(".", "").replace(",", "."));
    return isNaN(numero) ? null : numero;
}
export default currencyToNumber;
//# sourceMappingURL=moedaParaNumero.js.map