// Criado uma interface chamada CountList que está sendo exportada para ser usada em outro arquivo.
export interface CountList {
  [key: string]: number; // Está dizendo que o objeto pode ter qualquer propriedade, desde que a chave seja uma string e o valor seja um number.
}

// Criado uma função chamada countBy que cria um parâmetro chamado array do tipo array de string ou number.
function countBy(array: (string | number)[]) {
  // O reduce passa por cada item do array e executa a função, o primeiro parâmetro é o acumulador do tipo CountList e o segundo é o item atual e retorna o resultado. O valor inicial do acumulador é um objeto vazio.
  return array.reduce((acc: CountList, item) => {
    // Se a propriedade item existir no objeto acc, executa o if, se não executa o else.
    if (acc[item]) {
      acc[item] += 1; // Adiciona uma nova propriedade no objeto acc com o nome do item e o valor 1 a mais do valor atual.
    } else {
      acc[item] = 1; // Adiciona uma nova propriedade no objeto acc com o nome do item e o valor 1 se não existir.
    }
    return acc; // Retorna o objeto acc.
  }, {});
}

export default countBy; // Exporta a função countBy para ser usada em outro arquivo.
