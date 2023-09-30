/*
Caesars Cipher
One of the simplest and most widely known ciphers is a Caesar cipher, also known as a shift cipher. In a shift cipher the meanings of the letters are shifted by some set amount.

A common modern use is the ROT13 cipher, where the values of the letters are shifted by 13 places. Thus A ↔ N, B ↔ O and so on.

Write a function which takes a ROT13 encoded string as input and returns a decoded string.

All letters will be uppercase. Do not transform any non-alphabetic character (i.e. spaces, punctuation), but do pass them on.
*/

function rot13(str) {
  // determine what char codes are used for A-Z
  // 65-90
  // const TESTCODE = 'ABCDEFWXYZ'
  // for (let i = 0; i < str.length; i++){
  //   console.log(TESTCODE.charCodeAt(i));
  // }

  let currentCharCode;
  let charCodeArr = [];
  for (let i = 0; i < str.length; i++) {
    currentCharCode = str.charCodeAt(i);
    // console.log(currentCharCode);
    if (currentCharCode >= 65 && currentCharCode <= 90) {
      currentCharCode+=13;
      if (currentCharCode > 90) {
        currentCharCode = 64 + (currentCharCode - 90);
      }
    }
    // add char codes to arr for converting later
    charCodeArr.push(currentCharCode);
  }


  str = String.fromCharCode(...charCodeArr);
  console.log(str);

  return str;
}

// rot13("AZ");
// rot13("SERR PBQR PNZC");