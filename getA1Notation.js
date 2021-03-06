/**
 * Return single character for column number
 * Starts from 'A' for 1
 * If num > 26, it starts again from 'A'
 * 
 * @private
 * @param {Number} num Column number
 * @returns {String} Letter from 'A' to 'Z'
 */
export function getOneLetter(num) {
  // Согласно таблице ASCII - код 65 = A
  const offset = 65;
  const remainder = num % 26;
  if (remainder === 0) {
    return 'Z';
  }
  // Функция chr преобразует число в символ
  return String.fromCharCode(offset + remainder - 1);
}

/**
 * Convert column number to column letters, like in Excel.
 * There is used recursion to get letters for any column number.
 * 
 * @private
 * @param {Integer} num Column number
 * @returns {String} Letters 'A-Z', for num < 27 and 'AA-ZZZ', if more
 */
export function getLetters(num) {
  if (num < 27) {
    return getOneLetter(num);
  }
  const result = Math.floor(num / 26);
  if (num % 26 === 0) {
    return getLetters(result - 1) + getOneLetter(num);
  }
  return getLetters(result) + getOneLetter(num);
}

/**
 * Converts the coordinates of the range, represented as numbers in a1Notation,
 * like A1, or A5:K10
 * 
 * @param {Integer} row Row number
 * @param {Integer} col Column number
 * @param {Integer} lastRow Last row number
 * @param {Integer} lastCol Last column number
 * @returns {String} Coordinates of the range in a1Notation
 */
function getA1Notation(row, col, lastRow, lastCol) {
  function join(a, b) {
    return [a, b].join(':');
  }
  const A1 = col && row && getLetters(col).concat(row);
  switch (arguments.length) {
    case 1:
      return join(row, row);
    case 2:
      if (col && !row) {
        const A = getLetters(col);
        return join(A, A);
      }
      return A1;
    case 3:
      const A5 = getLetters(col).concat(lastRow);
      return join(A1, A5);
    case 4:
      const Z5 = getLetters(lastCol).concat(lastRow);
      return join(A1, Z5);
    default:
      throw new Error('Function expects at least one argument');
  }
}

export default getA1Notation;
