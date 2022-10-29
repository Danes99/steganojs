// Import built-in modules
import { readFile, writeFile } from 'fs/promises';

// Import downloaded modules
// import { PNG } from 'pngjs';
import { expect } from 'chai';
import { createHash, Hash } from 'crypto';

// Import functions to test
import { reveal, conceal } from '../src';

// Import custom functions
import { generateRandomPNG } from './utils';

const readTestPNG = async (): Promise<Buffer> => await readFile(IMAGE_1);

// Customs functions
const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
var charactersLength: number = characters.length;

const generateRandomString = (length: number = 30) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const IMAGE_FOLDER_LOCATION = `${__dirname}/img`;
const IMAGE_1 = IMAGE_FOLDER_LOCATION + '/img2.png';

describe('Test PNG', function () {
  this.timeout(10000);

  it('Can encode a string', async () => {
    for (let i = 0; i < 10; i++) {
      const message = generateRandomString();
      const file = await readTestPNG();

      // Encode message in file
      const encodedFile = conceal(file, message);
      const result = reveal(encodedFile);

      expect(result.toString()).to.equal(message);

      // Test compare files' hash
      const targetFileHash: Hash = createHash('sha256').update(file);
      const testFileHash: Hash = createHash('sha256').update(encodedFile);

      expect(testFileHash).not.equal(targetFileHash);
    }
  });

  it('Can write and read file', async () => {
    for (let i = 0; i < 10; i++) {
      const message = generateRandomString();
      const file = await readTestPNG();
      const testFilePath = `${IMAGE_FOLDER_LOCATION}/test.png`;

      // Encode message in file
      const encodedFile = conceal(file, message);
      await writeFile(testFilePath, encodedFile);

      const fileToRead = await readFile(testFilePath);
      const result = reveal(fileToRead);

      expect(result.toString()).to.equal(message);

      // Test compare files' hash
      const targetFileHash: Hash = createHash('sha256').update(file);
      const testFileHash: Hash = createHash('sha256').update(encodedFile);

      expect(testFileHash).not.equal(targetFileHash);
    }
  });
});
