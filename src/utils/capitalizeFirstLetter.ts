/**
 * 주어진 문자열의 첫 글자를 대문자로 변환하고, 나머지는 소문자로 변환하는 함수입니다.
 * @description
 * - 문자열을 공백을 기준으로 단어로 분리한 뒤, 각 단어의 첫 글자를 대문자로 변환하고 나머지는 소문자로 변환합니다.
 * - 각 단어를 다시 문자열로 결합하여 반환합니다.
 *
 * @param str 변환할 문자열
 * @returns 변환된 문자열
 *
 * @example
 * const result = capitalizeFirstLetter("hello world");
 * console.log(result); // "Hello World"
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str
    .split(" ") // 문자열을 공백을 기준으로 단어로 분리
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // 각 단어의 첫 글자는 대문자로, 나머지는 소문자로 변환
    .join(" "); // 다시 문자열로 결합
};
