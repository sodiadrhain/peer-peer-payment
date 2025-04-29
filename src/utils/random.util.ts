export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomChar = (): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyz';
  return chars.charAt(getRandomInt(0, chars.length - 1));
};

export const getRandomString = (length: number): string => {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += getRandomChar();
  }
  return result;
};

export const generateRandomEmail = (): string => {
  const usernameLength = getRandomInt(5, 10);
  const domainLength = getRandomInt(3, 7);
  const tldLength = getRandomInt(2, 3);

  const username = getRandomString(usernameLength);
  const domain = getRandomString(domainLength);
  const tld = getRandomString(tldLength);

  return `${username}@${domain}.${tld}`;
};
