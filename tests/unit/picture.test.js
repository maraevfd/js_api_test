import { beforeAll, describe, expect, test } from '@jest/globals';
import { getImagePathByName } from '../../src/picture.js'

describe('Test function getImagePathByName', () => {

    let images;

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

    it.each([
        ['path', [1,2,3], 'Value 1,2,3 is not a string!'],
        ['', {a: 1, b: '1'}, "Value [object Object] is not a string!"],
        ['1', 333, 'Value 333 is not a string!'],
    ])('Function getImagePathByName throw an error when imageName is not string', (pathPrefix, imageName, expectedResult) => {
        expect(() => {
            getImagePathByName(pathPrefix, images, imageName);
        }).toThrow(expectedResult);
    })
})
