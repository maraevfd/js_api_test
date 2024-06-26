import { beforeAll, describe, expect, test } from '@jest/globals';
import { getImagePathByName } from '../../src/picture'

describe('Test function getImagePathByName', () => {

  let images: string[];

  beforeAll(() => {
    images = [
      'random_image1.jpeg',
      'random_image2.jpg',
      'random_image3.img',
      'random_image4.exe',
      'random_image5'
    ];
  })
    
  test('Function getImagePathByName returns random value of the provided list', () => {
    const randomValue = getImagePathByName('', images);
    expect(images).toContain(randomValue);
  })

  test('Function getImagePathByName correctly works with prefix', () => {
    const prefix = 'random_prefix'
    const imagesPaths = images.map((imageName) => `${prefix}/${imageName}`);
    const randomValue = getImagePathByName(prefix, images);
    expect(imagesPaths).toContain(randomValue);
  })
    
  it.each([
    ['path', 'random_image1', 'path/random_image1.jpeg'],
    ['other/path', 'random_image1.jpeg', 'other/path/random_image1.jpeg'],
  ])('Function getImagePathByName returns correct path by picture name', (pathPrefix, imageName, expectedResult) => {
    expect(getImagePathByName(pathPrefix, images, imageName)).toEqual(expectedResult);
  })

  it.each([
    ['path', 'not_exists_image1.jpeg', ''],
    ['', 'not_exists_image2', ''],
  ])('Function getImagePathByName returns empty string when imageName is not found', (pathPrefix, imageName, expectedResult) => {
    expect(getImagePathByName(pathPrefix, images, imageName)).toBe(expectedResult);
  })
})
