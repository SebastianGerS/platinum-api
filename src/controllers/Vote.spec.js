import Vote from './Vote';

import { expect } from 'chai';

describe('Vote', () => {
  describe('list', () => {
    it('It should be a function called list', () => {
      expect(Vote.list).to.be.a('function');
    });
  });
});
