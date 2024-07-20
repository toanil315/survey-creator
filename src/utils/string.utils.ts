export class StringUtils {
  static convertToLabel(str: string, keepTextTransform = false): string {
    const newStr = keepTextTransform ? str : str.toLowerCase();
    return newStr.split('_').join(' ');
  }
}
