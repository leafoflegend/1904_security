const hash = require('../server/database/utils/hash.js');

describe('Hash Function', () => {
  it('Given a string, returns a string.', () => {
    expect(typeof hash('alaksndlaknsdlk')).toEqual('string');
  })
});
