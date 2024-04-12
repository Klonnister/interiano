import { existsSync, statSync } from 'fs';

const isValidPath = (rawPath: string) => {
  const filePath = `./public${rawPath}`;
  if (!existsSync(filePath)) return false;

  const isDirectory = statSync(filePath).isDirectory();
  if (isDirectory) return false;

  const acceptedExts = ['.jpeg', '.jpg', '.png', '.webp', '.svg'];
  const ext = filePath.slice(filePath.lastIndexOf('.'));
  if (!acceptedExts.includes(ext)) return false;

  return true;
};

export const isDeletablePath = (rawPath: string) => {
  if (!rawPath) return false;
  if (!isValidPath(rawPath)) return false;

  return true;
};

export const isAssignablePath = (rawPath: string) => {
  if (rawPath) {
    if (!isValidPath(rawPath)) return false;
  }

  return true;
};
