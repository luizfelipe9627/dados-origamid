/**
 * Recebe string "01/09/2022 01:21" retorna Date Thu Sep 01 2022 01:21:00 GMT-0300 (Hora padrão de Brasília).
*/

function stringToDate(texto: string): Date {
  const [data, tempo] = texto.split(" ");
  const [dia, mes, ano] = data.split("/").map(Number);
  const [hora, minuto] = tempo.split(":").map(Number);
  return new Date(ano, mes - 1, dia, hora, minuto);
}

export default stringToDate;
