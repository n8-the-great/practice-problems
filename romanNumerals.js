let convertToRoman = (num) => {
  let result = '';
  const ROMAN = [['M', 1000], ['CM', 900],
  ['D', 500], ['CD', 400], ['C', 100],
  ['XC', 90], ['L', 50], ['XL', 40],
  ['X', 10], ['IX', 9], ['V', 5], ['IV', 4],
  ['I', 1]];

  var i = 0;
  while(i < ROMAN.length){
    while(num >= ROMAN[i][1]){
      result = result.concat(ROMAN[i][0]);
      num = num - ROMAN[i][1];
      console.log(num);
    }

    i++;
  }
  console.log(result);
  return result;
}

convertToRoman(36);