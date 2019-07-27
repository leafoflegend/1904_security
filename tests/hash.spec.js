const hash = require('../server/database/utils/hash.js');

describe('Hash Function', () => {
  it('Given a string, returns a string.', () => {
    expect(typeof hash('alaksndlaknsdlk')).toEqual('string');
  });

  it('Given the same string twice, returns the same string twice.', () => {
    const stringToHash = 'hash me';

    const firstResult = hash(stringToHash);
    const secondResult = hash(stringToHash);

    expect(firstResult).toEqual(secondResult);
  });

  it('Given a string, hashes the string.', () => {
    const hashString = hash('password');

    expect(hashString).toMatchSnapshot();
  });
});
