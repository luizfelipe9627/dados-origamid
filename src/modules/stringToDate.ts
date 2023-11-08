/**
 * Recebe string "01/09/2022 01:21" retorna Date Thu Sep 01 2022 01:21:00 GMT-0300 (Hora padrão de Brasília).
*/

// Criado uma função chamada stringToDate que recebe um parâmetro chamado texto que é do tipo string e retorna um valor do tipo Date.
function stringToDate(texto: string): Date {
  const [data, tempo] = texto.split(" "); // O split separa a data e o tempo a cada espaço e retorna um array com os valores separados, sendo o primeiro valor a data e o segundo o tempo.

  // O map percorre cada item do array e retorna um novo array com os valores convertidos para o tipo Number.
  const [dia, mes, ano] = data.split("/").map(Number); // O split separa a data a cada barra e retorna um array com os valores separados, sendo o primeiro valor o dia, o segundo o mês e o terceiro o ano.

  // O map percorre cada item do array e retorna um novo array com os valores convertidos para o tipo Number.
  const [hora, minuto] = tempo.split(":").map(Number); // O split separa o tempo a cada dois pontos e retorna um array com os valores separados, sendo o primeiro valor a hora e o segundo o minuto.

  return new Date(ano, mes - 1, dia, hora, minuto); // Retorna a data no formato Date.
}

export default stringToDate; // Exporta a função stringToDate para ser usada em outros arquivos.
