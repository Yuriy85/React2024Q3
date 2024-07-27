import { ICard } from '../store/reducers/CheckedSlice';

export function downloadCSV(cards: ICard[], filename: string): void {
  const header = '#;Name;ID;URL\n';
  const content = cards
    .map((person) => `${person.number};${person.name};${person.id};${person.url}`)
    .join('\n');
  const blobObj = new Blob(['\uFEFF' + header + content], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blobObj);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
