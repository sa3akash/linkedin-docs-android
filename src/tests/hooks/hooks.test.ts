import { mmkvStorage } from '../../services/storage/mmkv.storage';

describe('Production Hooks & Storage Architecture', () => {
  beforeEach(() => {
    mmkvStorage.clear();
  });

  it('should set and retrieve item correctly via MMKV storage adapter', () => {
    mmkvStorage.setItem('test_key', 'hello_world');
    expect(mmkvStorage.getItem('test_key')).toBe('hello_world');
  });

  it('should remove item correctly from MMKV storage adapter', () => {
    mmkvStorage.setItem('test_key', 'value_to_delete');
    mmkvStorage.removeItem('test_key');
    expect(mmkvStorage.getItem('test_key')).toBeNull();
  });
});
