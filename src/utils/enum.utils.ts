interface EnumItem<T> {
  key: string;
  value: T;
}
/*
NOTE: all of this function only works for enums with the same type of values.
Example: enum { A = 1, B = 2, C = 3 } is valid
         enum { A = 'abc', B = 'def', C = 'ghi' } is valid
         enum { A = 1, B = 'abc', C = 3 } is invalid
*/
export class EnumUtils {
  static numericEnumToArray<T extends object>(enumObject: T): EnumItem<number>[] {
    const keysAndValues = Object.values(enumObject);
    const keys = keysAndValues.slice(0, keysAndValues.length / 2);

    return keys.map((key) => ({
      key,
      value: enumObject[key as keyof typeof enumObject] as number,
    }));
  }

  static stringEnumToArray<T extends object>(enumObject: T): EnumItem<string>[] {
    const keys = Object.keys(enumObject);
    return keys.map((key) => ({
      key,
      value: enumObject[key as keyof typeof enumObject] as string,
    }));
  }

  static getNumericEnumKeys<T extends object>(enumObject: T): string[] {
    const keysAndValues = Object.keys(enumObject);
    const keys = keysAndValues.slice(0, keysAndValues.length / 2);
    return keys;
  }

  static getNumericEnumValues<T extends object>(enumObject: T): number[] {
    const enumItems = this.numericEnumToArray(enumObject);
    return enumItems.map((item) => item.value);
  }

  static getStringEnumKeys<T extends object>(enumObject: T): string[] {
    return Object.keys(enumObject);
  }

  static getStringEnumValues<T extends object>(enumObject: T): string[] {
    return Object.values(enumObject);
  }

  static getStringEnumKeyByValue<T extends object>(
    enumObject: T,
    value: string,
  ): string | undefined {
    return Object.keys(enumObject).find(
      (key) => enumObject[key as keyof typeof enumObject] === value,
    );
  }
}
