// What even is a hash?
// Its a function that takes any string, and outputs a different string.
// Purity: This function given the same string twice, outputs the same string twice.

const hash = s => {
  let saltedS = s + process.env.SALT;
  let hashString = '';

  for (let i = 0; i < saltedS.length; ++i) {
    const c = saltedS[i];

    hashString += c.charCodeAt(0) * 2;
  }

  return hashString;
};

module.exports = hash;
