/** product: calculate the product of an array of numbers. */

function product(nums, i = 0) {
  // Base case, hitting end of array
  if (i === nums.length) return 1;
  // Normal case changes, keep going
  return nums[i] * product(nums, i + 1);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, long = "", i = 0) {
  // Base case, hitting end of array then returning whatever is longest
  if (i === words.length) return long.length;

  // Normal case, compare current word and longest word, updates longest word
  let current = words[i];
  if (current.length > long.length) {
    long = current;
  }
  // Keep going
  return longest(words, long, i + 1);
}

/** everyOther: return a string with every other letter. */
function everyOther(str, i = 0) {
  // Base case, hitting end of string
  if (i >= str.length) return "";

  // Keep going, index increase by two for skipping
  return str[i] + everyOther(str, i + 2);
}

/** isPalindrome: checks whether a string is a palindrome or not. */
// Start outside, recurse inwards

function isPalindrome(str) {
  // Base case, finally checks center
  if (str.length <= 1) return true;

  // Keep going towards the center, from 2nd position to 2nd to last position
  if (str[0] === str[str.length - 1]) return isPalindrome(str.slice(1, -1));
  else return false;
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */
function findIndex(arr, val, i = 0) {
  // Base case success
  if (arr[0] === val) return i;
  // Base case failure,
  else if (i > arr.length) return -1;
  // Keep going, start from next
  else return findIndex(arr.slice(1), val, i + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, rev = "") {
  // Base case, end of string
  if (str === "") return rev;
  // Changing rev
  rev = rev + str[str.length - 1];
  // Keep going without last element
  return revString(str.slice(0, -1), rev);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, arr = []) {
  // Iterating through object keys
  for (let key in obj) {
    // Base case to exit recursion
    if (typeof obj[key] === "string") arr.push(obj[key]);
    // Go deeper if encounter another object
    else if (typeof obj[key] === "object")
      arr = arr.concat(gatherStrings(obj[key]));
  }

  return arr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

// Start and end keeps changing
function binarySearch(arr, val, start = 0, end = arr.length - 1) {
  // Base case failure when there's crossover
  if (start > end) return -1;
  // Midpoint
  const mid = Math.floor((start + end) / 2);
  // Base case success
  if (arr[mid] === val) return mid;

  // Going deeper left side
  if (val < arr[mid]) return binarySearch(arr, val, start, mid - 1);
  // Going deeper right side
  else return binarySearch(arr, val, mid + 1, end);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch,
};
