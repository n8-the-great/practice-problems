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

  // create a substring of the central office + line code, possibly separated or not.
  // might have part of area code, so regex includes that
  // if not valid, return false
  let colinecode = str.substring(str.length-8, str.length);
  let regexLineCode = /^([-) \d]?)(\d{3})([- \d])?(\d{4})$/;
  // console.log(colinecode);
  if (!regexLineCode.test(colinecode)) {
    return false;
  }

  // update string -> remove central office code and line code
  // if 5th from end is a digit, phone number format should be \d{7}
  if(/\d/.test(str[str.length - 5])) {
    str = str.substring(0, str.length - 7);
  } else {
    str = str.substring(0, str.length - 8);
  };

  // possibilities: remaining str ends with ), -, empty space, and/or num
  if (str[str.length - 1] === ' ' || str[str.length - 1] === '-') {
    // if empty space, continue.  if -, no ) is allowed before it
    if (str[str.length - 1] === ' ') {
      str = str.substring(0, str.length - 1);
    } else if (str[str.length - 1] === '-') {
      if (str[str.length - 2] === ')') {
        return false;
      }
      str = str.substring(0, str.length - 1);
    }
    // two in a row not allowed
    if (str[str.length - 1] === ' ' || str[str.length - 1] === '-') {
      return false;
    }
  }

  // test for close parens, and if found, test for open parens -3 positions.
  // if both found, remove for simpler processing.  if no open parens found, return false
  // was not able to figure out a single regex for this
  if (str[str.length - 1] === ')') {
    if (str[str.length - 5] === '(') {
      if (str[str.length - 6] === '-') {
        return false;
      }
      str = str.substring(0, str.length - 5).concat(str.substring(str.length - 4, str.length - 1));
      // console.log('should be area code: ' + str);
    } else { return false };
  }

  // test area code   // test county code
  let regex = /^\s*(1?)[- ]?([2-9])(\d{2})$/;

  if(!regex.test(str)) {
    return false;
  }

  // no mismatches, so return true
  return true;
}

// unit testing
// let test1 = '1(452)2345678';
// let test2 = '1(322) 2153678';
// let test3 = '1 (452)-234-5678';
// let test4 = '1-(322) 234 5678';

// console.log(`${test1} shoud be T: ${telephoneCheck(test1)}`);
// console.log(`${test2} should be T: ${telephoneCheck(test2)}`);
// console.log(`${test3} shoud be F: ${telephoneCheck(test3)}`);
// console.log(`${test4} should be F: ${telephoneCheck(test4)}`);


// test1 = '(452)234+5678';
// test2 = '(322) 215678';
// test3 = '(452) 234x5678';
// test4 = '(322)234  5678';

// console.log(`${test1} shoud be F: ${telephoneCheck(test1)}`);
// console.log(`${test2} should be F: ${telephoneCheck(test2)}`);
// console.log(`${test3} shoud be F: ${telephoneCheck(test3)}`);
// console.log(`${test4} should be F: ${telephoneCheck(test4)}`);

// final test suite
console.log('\n\n1 555-555-5555 should be true?: ' + telephoneCheck("1 555-555-5555"));
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
