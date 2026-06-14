/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class FileService {
    /**
     * Получение файла по Id
     * @param id Id файла
     * @returns binary success
     * @throws ApiError
     */
    public static fa30428495020Ddc037B40F1790Fcef3(
        id: number,
    ): CancelablePromise<Blob> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/file/get',
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
     * Удаление файла по Id
     * @param id Id файла
     * @returns void
     * @throws ApiError
     */
    public static fffad0540D2670Ec156390C0Ff863(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/file/delete',
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
}
