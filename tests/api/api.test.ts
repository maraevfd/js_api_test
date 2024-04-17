import { beforeAll, describe, expect, it } from '@jest/globals';
import { ApiServiceController } from '../../taf/api/controller'
import { AxiosError, AxiosResponse } from 'axios';
import { PayloadType } from '../../types/request';

let apiController: ApiServiceController;


describe('Test /random_picture GET API endpoint', () => {

  beforeAll(() => {
    apiController = new ApiServiceController('http://localhost:3001');
  })

  it.each([
    [null],
    [null],
  ])('Test /random_picture endpoint', async (test_case) => {
    const response: AxiosResponse = await apiController.sendRequest('/random_picture');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/image\/.*/);
  })

  it.each([
    ['/random_endpoint'],
    ['/'],
  ])('Test get unexisting endpoint', async (endpoint) => {
    let error: AxiosError
    expect(async () => {
      error = await apiController.sendRequest(endpoint);
    }).rejects.toThrow(AxiosError);
        
  })
})

describe('Test /picture POST API endpoint', () => {

  beforeAll(() => {
    apiController = new ApiServiceController('http://localhost:3001');
  })

  it.each([
    [{picture: 'image_1.jpeg'}],
    [{picture: 'image_2'}],
  ])('Test /picture endpoint', async (payload) => {
    const response: AxiosResponse  = await apiController.sendRequest('/picture', 'POST', payload);
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/image\/.*/);
  })

  it.each([
    [{ picture: '' }, 400, 'Bad Request'],
    [{ picture: 'non_existing_image.jpeg' }, 404, 'Not Found'],
  ])('Test /picture endpoint with non-existing image', async (payload, error_code, error_message) => {
    try {
      await apiController.sendRequest('/picture', 'POST', payload);
      throw new Error('there should have been an error in the instructions above, but this raised')
    } catch (error) {
      expect(error.response.status).toBe(error_code);
      expect(error.response.statusText).toBe(error_message);
    }
  })
})

