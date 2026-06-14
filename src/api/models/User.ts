/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Пользователь
 */
export type User = {
    /**
     * ID
     */
    readonly id?: number;
    /**
     * Имя пользователя
     */
    username: string;
    /**
     * Почта
     */
    email: string;
    /**
     * Почта
     */
    birthdate: string;
    /**
     * ID любимой еды
     */
    readonly favorite_food_ids?: Array<number>;
    /**
     * ID любимой еды
     */
    'favorite_food_ids[]'?: Array<Blob>;
    /**
     * ID файла аватарки
     */
    readonly photo_id?: number;
    /**
     * Аватарка для загрузки
     */
    upload_photo?: Blob;
};

