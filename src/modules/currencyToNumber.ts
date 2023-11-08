/**
 * Recebe string "1.200,50" retorna number 1200.50
*/

// Criado uma função chamada currencyToNumber que recebe um parâmetro chamado moeda que é do tipo string e retorna um número ou nulo quando não for passado um valor.
function currencyToNumber(moeda: string): number | null {
  const numero = Number(moeda.replaceAll(".", "").replace(",", "."));

  return isNaN(numero) ? null : numero; // Se o valor de numero for NaN retorna null, caso contrário retorna o valor de numero.
}

export default currencyToNumber; // Exporta a função currencyToNumber para ser usada em outros arquivos.
