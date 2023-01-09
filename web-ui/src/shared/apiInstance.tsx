/**
 * Инициализация контекста
*/
import { endpoint } from '~/constants/hostConfig';
import { axiosInstance } from '~/shared/axiosInstance';
import { initApi } from './ApiService';
/**
 * Инициализируем набор API
 */
export const apiInstance = initApi(axiosInstance, endpoint);
