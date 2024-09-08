/**
 * 주어진 시간(ms)만큼 지연 후에 Promise를 해결하는 함수입니다.
 * @description
 * - `setTimeout` 함수를 사용하여 비동기적으로 지정된 시간만큼 대기합니다.
 *
 * @param ms - 지연할 시간(밀리초)
 * @returns Promise<void>
 *
 * @example
 * await delay(1000); // 1초 동안 지연
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
