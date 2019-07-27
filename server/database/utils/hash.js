// What even is a hash?
// Its a function that takes any string, and outputs a different string.
// Purity: This function given the same string twice, outputs the same string twice.

const hash = s => {
  let hashString = '';

  for (let i = 0; i < s.length; ++i) {
    const c = s[i];

    hashString += c.charCodeAt(0);
  }

  return hashString;
};

module.exports = hash;
