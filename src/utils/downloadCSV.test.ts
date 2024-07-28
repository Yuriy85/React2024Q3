import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { downloadCSV } from './downloadCSV';
import { ICard } from '../store/reducers/CheckedSlice';

describe('downloadCSV', () => {
  // Mock URL.createObjectURL and URL.revokeObjectURL
  let createObjectURLMock: ReturnType<typeof vi.fn>;
  let revokeObjectURLMock: ReturnType<typeof vi.fn>;

  beforeAll(() => {
    global.URL.createObjectURL = createObjectURLMock = vi.fn().mockReturnValue('mock-url');
    global.URL.revokeObjectURL = revokeObjectURLMock = vi.fn();
  });

  afterAll(() => {
    createObjectURLMock.mockRestore();
    revokeObjectURLMock.mockRestore();
  });

  it('should create a CSV file and trigger download', () => {
    const mockCards: ICard[] = [
      { number: 1, name: 'John Doe', id: '123', url: 'http://example.com' },
      { number: 2, name: 'Jane Doe', id: '456', url: 'http://example.com' },
    ];
    const filename = 'test.csv';

    // Mock document.createElement
    const clickMock = vi.fn();
    const anchorMock = {
      click: clickMock,
      set href(value: string) {},
      set download(value: string) {},
    };
    vi.spyOn(document, 'createElement').mockReturnValue(anchorMock as unknown as HTMLAnchorElement);

    downloadCSV(mockCards, filename);

    // Check URL.createObjectURL was called with a Blob
    expect(createObjectURLMock).toHaveBeenCalled();

    // Check the click event was triggered
    expect(clickMock).toHaveBeenCalled();

    // Check URL.revokeObjectURL was called with the correct URL
    expect(revokeObjectURLMock).toHaveBeenCalledWith('mock-url');
  });
});
