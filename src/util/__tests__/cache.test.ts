import * as cache from '../cache';

describe('getItem', () => {
  it('return null on error', () => {
    Storage.prototype.getItem = () => {
      throw new Error('bam');
    };
    expect(cache.getItem('test-set-item')).toBeNull();
  });
  it('return an object', () => {
    Storage.prototype.getItem = () => {
      return '{"bob":"ross"}';
    };
    expect(cache.getItem('test-set-item')).toStrictEqual({ bob: 'ross' });
  });
});

describe('setItem', () => {
  it('return undefined on error', () => {
    Storage.prototype.setItem = () => {
      throw new Error('bam');
    };
    expect(cache.setItem('test-set-item', 'test')).toBeUndefined();
  });
});

describe('removeItem', () => {
  it('return undefined on error', () => {
    Storage.prototype.removeItem = () => {
      throw new Error('bam');
    };
    expect(cache.removeItem('test-set-item')).toBeUndefined();
  });
});

describe('clear', () => {
  it('return undefined on error', () => {
    Storage.prototype.clear = () => {
      throw new Error('bam');
    };
    expect(cache.clear()).toBeUndefined();
  });
});
