/**
 *  Модели
 */

/**
 * holiday_currency
 * @export
 * @interface HolidayCurrencyRequest
 */
 export interface HolidayCurrencyRequest {
  /**
   * Дата
   * @type {string}
   * @memberof HolidayCurrencyRequest
   */
  'day': string;

  /**
   * ID валюты
   * @type {Number}
   * @memberof HolidayCurrencyRequest
   */
  'currency_id': Number;

  /**
   * Тип дня | 0 (0 - Выходной, 1 - Рабочий)
   * @type {Number}
   * @memberof HolidayCurrencyRequest
   */
  'type': Number;
  
  /**
   * Комментарий
   * @type {string}
   * @memberof HolidayCurrencyRequest
   */
  'comment': string;   

}
