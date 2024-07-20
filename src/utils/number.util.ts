export class NumberUtil {
  static formatterNumber(value: number | string) {
    if (!value) return '0';
    return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static parserNumber(value: number | string) {
    if (!value) return 0;
    return Number(String(value).replace(/\$\s?|(,*)/g, ''));
  }
}
