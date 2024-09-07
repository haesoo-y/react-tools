/**
 * 객체를 깊은 복사하여 반환합니다.
 * @description
 * - 객체를 JSON 문자열로 변환한 뒤, 다시 객체로 변환하여 깊은 복사를 수행합니다.
 * - 객체의 프로퍼티가 함수, undefined, 심볼 등의 특별한 타입인 경우 복사되지 않습니다.
 *
 * @param obj 복사할 객체
 * @returns 복사된 객체
 * @example
 * const obj = { name: 'John', age: 25 };
 * const clonedObj = deepClone(obj);
 * console.log(clonedObj); // { name: 'John', age: 25 }
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};
