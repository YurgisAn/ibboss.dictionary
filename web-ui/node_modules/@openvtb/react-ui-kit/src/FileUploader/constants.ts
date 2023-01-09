export const UPLOAD_TEXT = 'Перетащите файлы в эту область или нажмите для загрузки';
export const FILE_MAX_SIZE_ERROR = 'Размер файла превышает разрешенный размер';
export const FILE_MIN_SIZE_ERROR = 'Размер файла меньше минимального размера';
export const FILE_EXTENSION_ERROR = 'Файл не соответствует допустимым расширениям';
export const GET_FILE_COUNT_EXCEED_ERROR = `Несколько файлов не было загружено, так как превышен лимит количества загружаемых файлов`;
export const GET_FILE_TOTAL_SIZE_ERROR = (megabytes: number) =>
  `Суммарно размер файлов не должен превышать ${megabytes} Mb`;
export const DEFAULT_MAX_TOTAL_SIZE = 1024 * 1024 * 100;
export const UPLOAD_TEXT_MOBILE = 'Нажмите для загрузки';
