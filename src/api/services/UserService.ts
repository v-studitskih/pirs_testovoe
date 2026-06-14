/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { User } from '../models/User';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UserService {
    /**
     * Получение списка пользователей
     * @param page Страница
     * @param perPage Кол-во элементов на странице
     * @param fields Список базовых полей, можно перечислить через ','
     * @param expand Список доп. полей, можно перечислить через ','
     * @param sort Сортировка
     * @param userSearchId Поиск по id
     * @param userSearchUsername Поиск по username
     * @param userSearchEmail Поиск по email
     * @param userSearchBirthdateStart Начала диапазона дня рождения
     * @param userSearchBirthdateEnd Окончание диапазона дня рождения
     * @returns User success
     * @throws ApiError
     */
    public static a2Cf543De9B4627B5E955D7Fc87E6Ba5(
        page?: number,
        perPage?: number,
        fields?: string,
        expand?: string,
        sort?: string,
        userSearchId?: string,
        userSearchUsername?: string,
        userSearchEmail?: string,
        userSearchBirthdateStart?: string,
        userSearchBirthdateEnd?: string,
    ): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/index',
            query: {
                'page': page,
                'per-page': perPage,
                'fields': fields,
                'expand': expand,
                'sort': sort,
                'UserSearch[id]': userSearchId,
                'UserSearch[username]': userSearchUsername,
                'UserSearch[email]': userSearchEmail,
                'UserSearch[birthdateStart]': userSearchBirthdateStart,
                'UserSearch[birthdateEnd]': userSearchBirthdateEnd,
            },
            errors: {
                401: `Не авторизован`,
                403: `Доступ запрещён`,
                404: `Не найдено`,
                422: `Некорректные входные данные`,
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
    /**
     * Просмотри
     * @param id ID пользователя
     * @param fields Список базовых полей, можно перечислить через ','
     * @param expand Список доп. полей, можно перечислить через ','
     * @returns User success
     * @throws ApiError
     */
    public static a56E857A7D74E43Aa917B98549066E8(
        id: number,
        fields?: string,
        expand?: string,
    ): CancelablePromise<Array<User>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/view',
            query: {
                'id': id,
                'fields': fields,
                'expand': expand,
            },
            errors: {
                401: `Не авторизован`,
                403: `Доступ запрещён`,
                404: `Не найдено`,
                422: `Некорректные входные данные`,
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
    /**
     * Удаление
     * @param id ID пользователя
     * @returns void
     * @throws ApiError
     */
    public static f71Cb7Cd7429Cab6A310F244Bec44C4(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/v1/user/delete',
            query: {
                'id': id,
            },
            errors: {
                401: `Не авторизован`,
                403: `Доступ запрещён`,
                404: `Не найдено`,
                422: `Некорректные входные данные`,
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
    /**
     * Список еды
     * @returns string Успех
     * @throws ApiError
     */
    public static fc5Ceabf3C60Ca2Cd339Ed4A15888C10(): CancelablePromise<Record<string, string>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/v1/user/get-food-list',
            errors: {
                401: `Не авторизован`,
                403: `Доступ запрещён`,
                404: `Не найдено`,
                422: `Некорректные входные данные`,
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
    /**
     * Создание
     * @param formData
     * @returns any success
     * @throws ApiError
     */
    public static c0078D04Ffdac38200Fc4F23Fccfd55A(
        formData?: User,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/v1/user/create',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Не авторизован`,
                403: `Доступ запрещён`,
                404: `Не найдено`,
                422: `Некорректные входные данные`,
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
    /**
     * Редактирование
     * @param id ID пользователя
     * @param formData
     * @returns any success
     * @throws ApiError
     */
    public static e8Fb86235D2C32236C4359552153923(
        id: number,
        formData?: User,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/v1/user/update',
            query: {
                'id': id,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                401: `Не авторизован`,
                403: `Доступ запрещён`,
                404: `Не найдено`,
                422: `Некорректные входные данные`,
                500: `Внутренняя ошибка сервера`,
            },
        });
    }
}
