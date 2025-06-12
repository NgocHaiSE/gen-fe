type ObjectArgument = Record<string, unknown> | any[] | null;

const toCamelCase = (snakeCase: string): string =>
  snakeCase.replace(/_[a-z]/g, (characters: string) => characters[1].toUpperCase());

const toSnakeCase = (camelCase: string): string =>
  camelCase.replace(/[A-Z]/g, (character: string) => `_${character.toLowerCase()}`);

const convert = (obj: ObjectArgument, fn: (arg: string) => string) => {
  // validate input
  if (obj === null || obj === undefined) return obj;
  if (!(obj instanceof Object)) return null;
  if (obj instanceof Function) return null;

  // if argument is an array, recursive this function with each element of array
  if (Array.isArray(obj)) {
    const newArray: any[] = [];
    obj.forEach((element) => {
      let value = element;
      if (element instanceof Object) {
        value = convert(element, fn);
      }
      newArray.push(value);
    });
    return newArray;
  }

  // if argument is a normal object
  const newObject: any = {};
  Object.keys(obj).forEach((key) => {
    const newKey: string = fn(key);
    let value: any = obj[key];
    if (value instanceof Object) {
      value = convert(value, fn);
    }
    newObject[newKey] = value;
  });
  return newObject;
};

class CaseConverter {
  // snake_case to camelCase. For example, {user_id: 1} -> {userId: 1}
  static snakeCaseToCamelCase(obj: ObjectArgument): ObjectArgument {
    return convert(obj, toCamelCase);
  }

  // camelCase to snake_case. For example, {userId: 1} -> {user_id: 1}
  static camelCaseToSnakeCase(obj: ObjectArgument): ObjectArgument {
    return convert(obj, toSnakeCase);
  }

  static toSnakeCase = toSnakeCase;

  static toCamelCase = toCamelCase;
}

export default CaseConverter;
