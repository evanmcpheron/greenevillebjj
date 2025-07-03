export const parseJSON = (jsonString: string): unknown => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    return {};
  }
};

export const JSONStringify = (obj: unknown) => {
  let cache: unknown[] | null = [];
  let str = JSON.stringify(obj, function (_key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache?.indexOf(value) !== -1) {
        return;
      }
      cache?.push(value);
    }
    return value;
  });
  cache = null;
  return str;
};

export const removeUndefined = (obj: unknown) => {
  return JSON.parse(JSONStringify(obj));
};
