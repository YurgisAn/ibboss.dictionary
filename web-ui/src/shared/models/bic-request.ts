/**
 *  Модели
 */

/**
 * Бик
 * @export
 * @interface BicRequest
 */
export interface BicRequest {
    /**
     * БИК
     * @type {string}
     * @memberof BicRequest
     */
    'bicCode': string;

    /**
     * БИК головной организации
     * @type {string}
     * @memberof BicRequest
     */
    //'parentBicCode'?: string;

    /**
     * Наименование
     * @type {string}
     * @memberof BicRequest
     */
    'participantName': string;
    
    /**
     * признак активности
     * @type {boolean}
     * @memberof BicRequest
     */
    //'isActive': boolean;   

    /**
     * код страны
     * @type {string}
     * @memberof BicRequest
    */
    //'countyCode': string;

    /**
     * Код регион
     * @type {string}
     * @memberof BicRequest
     */
    //'regionCode': string;

    /**
     * Тип населенного пункта.
     * @type {string}
     * @memberof BicRequest
     */
    //'localityType': string;  
    
    /**
     * Наименование населенного пункта.
     * @type {string}
     * @memberof BicRequest
     */
    //'localityName': string;

    /**
     * Адрес
     * @type {string}
     * @memberof BicRequest
     */
    //'address': string;  

    /**
     * Дата включения в состав участников перевода. 
     * @type {string}
     * @memberof BicRequest
     */
    'dateIn': string;

    /**
     * Дата исключения информации об Участнике
     * @type {string}
     * @memberof BicRequest
     */
    //'dateOut': string;  

    /**
     * Тип участника перевода
     * @type {number}
     * @memberof BicRequest
     */
    //'participantType': number;  

    /**
     * Доступные сервисы перевода денежных средств
     * @type {number}
     * @memberof BicRequest
     */
    //'transferService': number;

    /**
     * Участник обмена
     * @type {string}
     * @memberof BicRequest
     */
    //'exchangeParticipant': string;     
    
    /**
     * Статус участника
     * @type {number}
     * @memberof BicRequest
     */
    //'participantStatus': number;

    /**
     * Регистрационный порядковый номер.
     * @type {string}
     * @memberof BicRequest
     */
    //'registrationNumber': string;  

    /**
     * Наименование участника на английском языке
     * @type {string}
     * @memberof BicRequest
     */
    //'englishName': string;  

    /**
     * Место нахождение
     * @type {number}
     * @memberof BicRequest
     */
    //'restrictionCode': number;

    /**
     * Дата начала действия ограничения участника
     * @type {string}
     * @memberof BicRequest
     */
    //'restrictionDate': string; 
    
    /**
     * БИК (СВИФТ)
     * @type {string}
     * @memberof BicRequest
    */
    //'swiftBic': string;  

}

