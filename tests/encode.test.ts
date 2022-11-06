// Import built-in modules
import { deepStrictEqual } from 'assert';
import { existsSync, mkdirSync } from 'fs';
import { readFile, writeFile } from 'fs/promises';

// Import downloaded modules
import { parse as YAMLparse } from 'yaml';
import { expect } from 'chai';
import { createHash, Hash } from 'crypto';

// Import functions to test
// import { reveal, conceal } from '../src';
import { reveal, conceal } from '../lib';

// Import custom functions
import { generateRandomJSON, generateRandomString, generateRandomYAML } from './utils';

// Constants: Image folders location
const IMAGE_FOLDER_LOCATION = `${__dirname}/img`;
const IMAGE_OUTPUT_FOLDER_LOCATION = IMAGE_FOLDER_LOCATION + '/out';

// Constants: Images location
const IMAGE_INPUT_1 = IMAGE_FOLDER_LOCATION + '/img1.png';
const IMAGE_OUTPUT_1 = IMAGE_OUTPUT_FOLDER_LOCATION + '/test.png';

describe('Test PNG', function () {
  this.timeout(1000000);

  it('Can encode a string', async () => {
    for (let i = 0; i < 10; i++) {
      const message = generateRandomString();
      const file: Buffer = await readFile(IMAGE_INPUT_1);

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

      expect(testFileHash, "Files' hashes should not be the same.").not.equal(targetFileHash);
    }
  });

  it('Can encode a JSON', async () => {
    for (let i = 0; i < 10; i++) {
      const message = generateRandomJSON();
      const file = await readFile(IMAGE_INPUT_1);

      // Encode message in file
      const encodedFile = conceal(file, message);
      const result = reveal(encodedFile);

      // Test: compare raw string
      expect(result.toString(), 'Message do not correspond').to.equal(message);

      // Test: compare Javascript Object from JSON string
      const objectMessage = JSON.parse(message);
      const objectResult = JSON.parse(result.toString());
      deepStrictEqual(objectMessage, objectResult);

      // Test compare files' hash
      const targetFileHash: Hash = createHash('sha256').update(file);
      const testFileHash: Hash = createHash('sha256').update(encodedFile);

      expect(testFileHash, "Files' hashes should not be the same.").not.equal(targetFileHash);
    }
  });

  it('Can encode a YAML', async () => {
    for (let i = 0; i < 10; i++) {
      const message = generateRandomYAML();
      const file = await readFile(IMAGE_INPUT_1);

      // Encode message in file
      const encodedFile = conceal(file, message);
      const result = reveal(encodedFile);

      // Test: compare raw string
      expect(result.toString(), 'Message do not correspond').to.equal(message);

      // Test: compare Javascript Object from JSON string
      const objectMessage = YAMLparse(message);
      const objectResult = YAMLparse(result.toString());
      deepStrictEqual(objectMessage, objectResult);

      // Test compare files' hash
      const targetFileHash: Hash = createHash('sha256').update(file);
      const testFileHash: Hash = createHash('sha256').update(encodedFile);

      expect(testFileHash, "Files' hashes should not be the same.").not.equal(targetFileHash);
    }
  });
});
