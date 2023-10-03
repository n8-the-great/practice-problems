/*
Telephone Number Validator
Return true if the passed string looks like a valid US phone number.

The user may fill out the form field any way they choose as long as it has the format of a valid US number.
The following are examples of valid formats for US numbers (refer to the tests below for other variants):

555-555-5555
(555)555-5555
(555) 555-5555
555 555 5555
5555555555
1 555 555 5555


For this challenge you will be presented with a string such as 800-692-7753 or 8oo-six427676;laskdjf.
Your job is to validate or reject the US phone number based on any combination of the formats provided above.
The area code is required. If the country code is provided, you must confirm that the country code is 1. Return
true if the string is a valid US phone number; otherwise return false.
*/


function telephoneCheck(str) {

  // if any alphabetic characters, return false
  if (/[A-Za-z]/.test(str)) {
    return false;
  }

  // create a substring of the last 6 and check for 1 + 4 digits, possibly separated or not. if not 4 digits, return false
  let lineCode = str.substring(str.length-6, str.length);
  let regexLineCode = /^(\d{1})([- \d]?)(\d{4})$/;
  console.log(lineCode);
  if (!regexLineCode.test(lineCode)) {
    return false;
  }

  // update string and remove lineCode
  str = str.substring(0, str.length - 4);
  // console.log(str);




  // ^(1)?([-\s])?([2-9])(\d{2})$ up to area code.
  // how to add optional braces, but if one is present, both need to be present
  let regexCountryCode = /^(1)?$/
  let regexAreaCode = /^([2-9])(\d{2})$/;
  let regexCOCode = /^(\d{3})$/; //central office code


  let regexTest = /\w/;


  // str = "T";


  // return regexTest.test(str);
  // return str.match(regexTest);
  return true;
}



console.log('1 555-555-5555 should be true?: ' + telephoneCheck("1 555-555-5555"));
console.log('1 (555) 555-5555 should be true?: ' + telephoneCheck("1 (555) 555-5555"));
console.log('5555555555 should be true?: ' + telephoneCheck("5555555555"));
console.log('555-555-5555 should be true?: ' + telephoneCheck("555-555-5555"));
console.log('(555)555-5555 should be true?: ' + telephoneCheck("(555)555-5555"));
console.log('1(555)555-5555 should be true?: ' + telephoneCheck("1(555)555-5555"));
console.log('1 456 789 4444 should be true?: ' + telephoneCheck("1 456 789 4444"));


console.log('\n555-5555 should be false?: ' + telephoneCheck("555-5555"));
console.log('5555555 should be false?: ' + telephoneCheck("5555555"));
console.log('1 555)555-5555 should be false?: ' + telephoneCheck("1 555)555-5555"));
console.log('123**&!!asdf# should be false?: ' + telephoneCheck("123**&!!asdf#"));
console.log('55555555 should be false?: ' + telephoneCheck("55555555"));
console.log('(6054756961) should be false?: ' + telephoneCheck("(6054756961)"));
console.log('2 (757) 622-7382 should be false?: ' + telephoneCheck("2 (757) 622-7382"));
console.log('10 (757) 622-7382 should be false?: ' + telephoneCheck("10 (757) 622-7382"));
console.log('0 (757) 622-7382 should be false?: ' + telephoneCheck("0 (757) 622-7382"));
console.log('2 757 622-7382 should be false?: ' + telephoneCheck("2 757 622-7382"));
console.log('-1 (757) 622-7382 should be false?: ' + telephoneCheck("-1 (757) 622-7382"));
console.log('27576227382 should be false?: ' + telephoneCheck("27576227382"));
console.log('(275)76227382 should be false?: ' + telephoneCheck("(275)76227382"));
console.log('2(757)6227382 should be false?: ' + telephoneCheck("2(757)6227382"));
console.log('2(757)622-7382 should be false?: ' + telephoneCheck("2(757)622-7382"));
console.log('555)-555-5555 should be false?: ' + telephoneCheck("555)-555-5555"));
console.log('(555-555-5555 should be false?: ' + telephoneCheck("(555-555-5555"));
console.log('(555)5(55?)-5555 should be false?: ' + telephoneCheck("(555)5(55?)-5555"));
console.log('55 55-55-555-5 should be false?: ' + telephoneCheck("55 55-55-555-5"));
console.log('11 555-555-5555 should be false?: ' + telephoneCheck("11 555-555-5555"));
// console.log('55555555 should be false?: ' + telephoneCheck("55555555"));
// console.log('55555555 should be false?: ' + telephoneCheck("55555555"));
// console.log('55555555 should be false?: ' + telephoneCheck("55555555"));
// console.log('55555555 should be false?: ' + telephoneCheck("55555555"));
// isValid = telephoneCheck("3s");
