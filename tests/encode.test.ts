// Import built-in modules
import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

// Import downloaded modules
// import { PNG } from 'pngjs';
import { expect } from 'chai';
import { createHash, Hash } from 'crypto';

// Import functions to test
import { reveal, conceal } from '../src';

// Import custom functions
import { generateRandomPNG } from './utils';

// Constants: Image folders location
const IMAGE_FOLDER_LOCATION = `${__dirname}/img`;
const IMAGE_OUTPUT_FOLDER_LOCATION = IMAGE_FOLDER_LOCATION + '/out';

// Constants: Images location
const IMAGE_INPUT_1 = IMAGE_FOLDER_LOCATION + '/img1.png';
const IMAGE_OUTPUT_1 = IMAGE_OUTPUT_FOLDER_LOCATION + '/test.png';

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

// const readTestPNG = async (): Promise<Buffer> => await readFile(IMAGE_INPUT_1);

describe('Test PNG', function () {
  this.timeout(1000000);

  it('Can encode a string', async () => {
    for (let i = 0; i < 10; i++) {
      const message = generateRandomString();
      const file = await readFile(IMAGE_INPUT_1);

      // Encode message in file
      const encodedFile = conceal(file, message);
      const result = reveal(encodedFile);

      expect(result.toString(), 'Message do not correspond').to.equal(message);

      // Test compare files' hash
      const targetFileHash: Hash = createHash('sha256').update(file);
      const testFileHash: Hash = createHash('sha256').update(encodedFile);

      expect(testFileHash).not.equal(targetFileHash);
    }
  });

  it('Can write and read file', async () => {
    for (let i = 0; i < 10; i++) {
      const message = generateRandomString();
      const file = await readFile(IMAGE_INPUT_1);
      const testFilePath = IMAGE_OUTPUT_1;

      // Encode message in file
      const encodedFile = conceal(file, message);

      if (!existsSync(IMAGE_OUTPUT_FOLDER_LOCATION)) {
        mkdirSync(IMAGE_OUTPUT_FOLDER_LOCATION, { recursive: true });
      }

      await writeFile(testFilePath, encodedFile);

      const fileToRead = await readFile(testFilePath);
      const result = reveal(fileToRead);

      expect(result.toString(), 'Message do not correspond').to.equal(message);

      // Test compare files' hash
      const targetFileHash: Hash = createHash('sha256').update(file);
      const testFileHash: Hash = createHash('sha256').update(encodedFile);

      expect(testFileHash).not.equal(targetFileHash);
    }
  });
});
