/**
 * 随机生成一定长度的字符串
 * @param startStr 随机字符串的开头格式，默认为空
 * @param length 随机字符串长度
 * @returns string
 */
export function generateRandomString(startStr: string = "", length: number = 12): string {
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters = '0123456789abcdefghijklmnopqrstuvwxyz';
  let randomString: string = startStr + '-';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString
}