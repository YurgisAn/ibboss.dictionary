import { FILE_MAX_SIZE_ERROR, FILE_MIN_SIZE_ERROR, FILE_EXTENSION_ERROR } from './constants';

/**
 * Сортирует файлы по именам в алфавитном порядке
 * @param files
 */
export function sortFiles(files: File[]): File[] {
  return files.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    if (aName < bName) {
      return -1;
    }
    if (aName > bName) {
      return 1;
    }
    return 0;
  });
}

/**
 * кастомный обработчик файлов для react-dropzone
 * @param event
 */
export async function customFileGetter(event: any): Promise<Array<File | DataTransferItem>> {
  const files: any[] = [];
  const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

  for (let i = 0; i < fileList.length; i++) {
    const file = fileList.item ? fileList.item(i) : fileList[i];

    files.push(file);
  }

  return sortFiles(files);
}

/**
 * получение текста ошибки, по которой отклонен файл
 * @param file
 * @param maxSize
 * @param minSize
 */
export function getFileErrorReason(file: File, maxSize?: number, minSize?: number): string {
  if (maxSize && file.size > maxSize) {
    return FILE_MAX_SIZE_ERROR;
  }
  if (minSize && file.size < minSize) {
    return FILE_MIN_SIZE_ERROR;
  }
  return FILE_EXTENSION_ERROR;
}

export function formatBytesToMegabytes(bytes: number) {
  const megabytes = bytes / 1024 / 1024;
  return Math.round((megabytes + Number.EPSILON) * 100) / 100;
}
