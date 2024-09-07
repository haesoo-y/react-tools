/**
 * 입력된 숫자나 문자열을 형식화된 문자열로 변환합니다.
 * @description
 * - 숫자나 문자열을 천 단위로 콤마(,)를 추가하여 반환합니다.
 * - 숫자가 아닌 값이 입력되면 빈 문자열을 반환합니다.
 *
 * @param input 변환할 숫자나 문자열
 * @returns 형식화된 숫자 문자열
 * @example
 * formatNumber(1234567); // "1,234,567"
 * formatNumber("9876543"); // "9,876,543"
 * formatNumber(123.456); // "123.456"
 */
export const formatNumber = (input: number | string): string => {
  // 입력이 문자열이면 숫자로 변환
  const num = typeof input === "string" ? parseFloat(input) : input;

  // 변환이 실패하거나 NaN이면 빈 문자열 반환
  if (isNaN(num)) {
    return "";
  }

  // 정상적인 숫자면 포맷팅 진행
  return new Intl.NumberFormat().format(num);
};
