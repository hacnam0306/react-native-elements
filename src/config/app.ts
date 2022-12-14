export const DESIGN_WIDTH = 375;
export const DATETIME_FORMAT = 'DD-MM-YYYY hh:mm:ss';
export const DATE_FORMAT = 'DD-MM-YYYY';
export const TIME_FORMAT = 'hh:mm:ss';
export const TIMEZONE = 'UTC+7';
export const getFormatByDateMode = (mode?: 'date' | 'time' | 'datetime') => {
  return mode == 'datetime'
    ? DATETIME_FORMAT
    : mode == 'date'
    ? DATE_FORMAT
    : TIME_FORMAT;
};
