/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function getIndex(i, str, category) {
  while (!(str[i].charCodeAt(0) >= 65 && str[i].charCodeAt(0) <= 90 || str[i].charCodeAt(0) >= 97 && str[i].charCodeAt(0) <= 122)) {
    if (category == "start") {
      i++
    } else i--;
  }
  return i;
}


function isPalindrome(str) {
  str = str.toLowerCase();
  let start = 0;
  let end = str.length - 1;
  while (start < end) {
    start = getIndex(start, str, "start");
    end = getIndex(end, str, "end");
    if (str[start] != str[end]) {
      return false
    }
    start++;
    end--;
  }
  return true
}

module.exports = isPalindrome;
