import { beforeAll, describe, expect, test } from '@jest/globals';
import { ApiServiceController } from '../../taf/api/controller.js'
import e from 'express';

describe('Test /random_picture GET API endpoint', () => {
    let apiController;

    beforeAll(() => {
        apiController = new ApiServiceController('http://localhost:3001');
    })

    it.each([
        [null],
        [null],
    ])('Test /random_picture endpoint', async (test_case) => {
        let response = await apiController.sendRequest('/random_picture');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/image\/.*/);
    })

    it.each([
        ['/random_endpoint'],
        ['/'],
    ])('Test get unexisting endpoint', async (endpoint) => {
        let error = await apiController.sendRequest(endpoint);
        expect(error.response.status).toBe(404);
        expect(error.response.statusText).toBe('Not Found');
    })
})

describe('Test /picture POST API endpoint', () => {
    let apiController;

    beforeAll(() => {
        apiController = new ApiServiceController('http://localhost:3001');
    })

    it.each([
        [{picture: 'image_1.jpeg'}],
        [{picture: 'image_2'}],
    ])('Test /picture endpoint', async (payload) => {
        let response = await apiController.sendRequest('/picture', 'post', payload);
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/image\/.*/);
    })

    it.each([
        [{picture: ''}, 400, 'Bad Request'],
        [{picture: 'non_existing_image.jpeg'}, 404, 'Not Found'],
        [{picture: {pictureName: 'image_2'}}, 400, 'Bad Request'],
    ])('Test /picture endpoint with non-existing image', async (payload, error_code, error_message) => {
        let error = await apiController.sendRequest('/picture', 'post', payload);
        expect(error.response.status).toBe(error_code);
        expect(error.response.statusText).toBe(error_message);
    })
})