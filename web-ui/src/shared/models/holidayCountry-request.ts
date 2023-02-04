/**
 *  Модели
 */

/**
 * holiday_country
 * @export
 * @interface HolidayCountryRequest
 */
 export interface HolidayCountryRequest {
  /**
   * Дата
   * @type {string}
   * @memberof HolidayCurrencyRequest
   */
   'day': string;

  /**
   * ID страны
   * @type {Number}
   * @memberof HolidayCountryRequest
   */
  'country_id': Number;

  /**
   * Тип дня | 0 (0 - Выходной, 1 - Рабочий)
   * @type {Number}
   * @memberof HolidayCountryRequest
   */
  'type': Number;
  
  /**
   * Комментарий
   * @type {string}
   * @memberof HolidayCountryRequest
   */
  'comment': string;   

}
