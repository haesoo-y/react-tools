import { useEffect, useRef } from "react";

/**
 * requestAnimationFrame을 사용하여 주어진 콜백 함수를 실행하는 커스텀 훅입니다.
 * @description
 * - requestAnimationFrame을 사용하여 애니메이션을 구현할 수 있습니다.
 * - isActive 값이 true일 때만 애니메이션을 실행합니다.
 * - FPS(초당 프레임 수)를 설정하여 애니메이션 속도를 조절할 수 있습니다.
 *
 * @param callback - 프레임 간격(deltaTime)을 매개변수로 받는 콜백 함수
 * @param isActive - 애니메이션이 활성화되는지 여부를 나타내는 boolean 값
 * @param fps - 프레임 속도(FPS)를 나타내는 숫자 값 (기본값: 60)
 * @returns - 훅의 반환 값은 없습니다.
 *
 * @example
 * ```tsx
 * const MyComponent = () => {
 *   const isActive = true;
 *   const fps = 30;
 *
 *   useAnimationFrame((deltaTime) => {
 *     // 주어진 콜백 함수에서 애니메이션 로직을 작성합니다.
 *     // deltaTime을 사용하여 프레임 간격에 따른 애니메이션을 조정할 수 있습니다. (optional)
 *   }, isActive, fps);
 *
 *   return <div>My Component</div>;
 * }
 * ```
 */
export const useAnimationFrame = (
  callback: (deltaTime: number) => void,
  isActive: boolean,
  fps: number = 60
) => {
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);
  const fpsInterval = 1000 / fps;

  const animate = (time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaTime = time - previousTimeRef.current;

      if (deltaTime >= fpsInterval) {
        // 이전time부터 현재time까지의 시간이 fpsInterval 이라고 판단될 경우에만 콜백함수 실행
        callback(deltaTime);
        previousTimeRef.current = time;
      }
    } else {
      previousTimeRef.current = time;
    }

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isActive) {
      previousTimeRef.current = null;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    }

    return () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isActive, fps]);
};
