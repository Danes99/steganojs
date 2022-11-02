// Import downloaded modules
import { PNG } from 'pngjs';

// Customs functions
const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength: number = characters.length;

export const generateRandomString = (length: number = 30) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateRandomPNG = (): Buffer => {
  const height = 1000;
  const width = 1000;

  const baseOptions = {
    fill: true,
    height,
    width,
  };

  const packerOptions = {
    bgColor: {
      red: 100,
      green: 100,
      blue: 100,
    },
  };

  const pngOptions = { ...baseOptions, ...packerOptions };

  const png: PNG = new PNG(pngOptions);

  // The property png.data will contain an array of int8
  //   for (var i = 0; i < height * width; i++) {
  //     png.data[i * 4 + 0] = (Math.random() * 256) | 0; // Red
  //     png.data[i * 4 + 1] = (Math.random() * 256) | 0; // Green
  //     png.data[i * 4 + 2] = (Math.random() * 256) | 0; // Blue
  //     png.data[i * 4 + 3] = 90; // alpha (transparency)
  //   }

  return png.data;
};

export const generateRandomJavascriptObject = (): object => {
  const randomObject: any = {};

  for (let i = 0; i < 100; i++) {
    const key: string = generateRandomString();
    const value: string = generateRandomString();
    randomObject[key] = value;
  }

  return randomObject as Object;
};

export const generateRandomJSON = (): string => JSON.stringify(generateRandomJavascriptObject());
