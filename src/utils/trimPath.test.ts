import { describe, it, expect } from 'vitest';
import { trimPath } from './trimPath';

describe('trimPath', () => {
  it('should trim the path up to the specified word', () => {
    const path = 'home/user/documents/project/file.txt';
    const word = 'project';
    const result = trimPath(path, word);
    expect(result).toBe('home/user/documents/');
  });

  it('should return the full path with trailing slash if the word is not found', () => {
    const path = 'home/user/documents/project/file.txt';
    const word = 'nonexistent';
    const result = trimPath(path, word);
    expect(result).toBe('home/user/documents/project/file.txt/');
  });

  it('should handle cases where the word is the last segment of the path', () => {
    const path = 'home/user/documents/project';
    const word = 'project';
    const result = trimPath(path, word);
    expect(result).toBe('home/user/documents/');
  });

  it('should handle cases where the path is empty', () => {
    const path = '';
    const word = 'anyword';
    const result = trimPath(path, word);
    expect(result).toBe('/');
  });

  it('should handle cases where the word is an empty string', () => {
    const path = 'home/user/documents/project/file.txt';
    const word = '';
    const result = trimPath(path, word);
    expect(result).toBe('home/user/documents/project/file.txt/');
  });
});
