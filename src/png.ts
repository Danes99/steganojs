// const { BYTE_SIZE } = require('./defaults')
import { BYTE_SIZE } from './defaults';

const CHANNEL_COUNT = ['r', 'g', 'b', 'a'].length;

export const countBytesForNRgbBytes = (n: number) => Math.floor((n * BYTE_SIZE * CHANNEL_COUNT) / (CHANNEL_COUNT - 1));

export const isAlphaByte = (_: number, i: number) => !((i + 1) % CHANNEL_COUNT);
export const isRgbByte = (_: number, i: number) => (i + 1) % CHANNEL_COUNT;

export const recombineRgbAndAlpha = (rgb: Buffer, alpha: Uint8Array) =>
  Buffer.from(
    Array(rgb.length + alpha.length)
      .fill(null)
      .map((_, i) => ((i + 1) % CHANNEL_COUNT ? rgb[i - Math.floor(i / CHANNEL_COUNT)] : alpha[i % CHANNEL_COUNT])),
  );

export const splitRgbAndAlpha = (data: Uint8Array) => {
  const rgbBytes = data.filter(isRgbByte);
  const alphaBytes = data.filter(isAlphaByte);
  return [rgbBytes, alphaBytes];
};
