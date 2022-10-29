// Import downloaded modules
import { PNG } from 'pngjs';

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
