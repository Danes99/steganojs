// Import downloaded modules
import { stringify as YAMLstringify } from 'yaml';
import { PNG } from 'pngjs';

// Constants: generateRandomString()
const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const charactersLength: number = characters.length;

// Constants: generateRandomPNG()
// const MINIMUM_WIDTH: number = 200;
// const MAXIMUM_WIDTH: number = 200;
// const MINIMUM_HEIGHT: number = 200;
// const MAXIMUM_HEIGHT: number = 200;
// const API_BASE_URI_GENERATE_RANDOM_PNG = 'https://picsum.photos/';

export const generateRandomString = (length: number = 30) => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// export const generateRandomPNG: () => Promise<Buffer> = async (width?: number, height?: number) => {
//   width =
//     width && width > MINIMUM_WIDTH && width < MAXIMUM_WIDTH
//       ? width
//       : Math.floor(Math.random() * (MAXIMUM_WIDTH - MINIMUM_WIDTH) + MINIMUM_WIDTH);

//   height =
//     height && height > MINIMUM_HEIGHT && height < MAXIMUM_HEIGHT
//       ? height
//       : Math.floor(Math.random() * (MAXIMUM_HEIGHT - MINIMUM_HEIGHT) + MINIMUM_HEIGHT);

//   // const URI: string = `${API_BASE_URI_GENERATE_RANDOM_PNG}${width}/${height}`;
//   const URI: string = `${API_BASE_URI_GENERATE_RANDOM_PNG}${600}/${600}.png`;

//   const response = await fetch(URI);
//   const blob: Blob = await response.blob();
//   const buffer: Buffer = Buffer.from(await blob.arrayBuffer());

//   return buffer;
// };

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

export const generateRandomYAML = (): string => YAMLstringify(generateRandomJavascriptObject());
