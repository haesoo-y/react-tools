import { RefObject, useEffect, useRef, useState } from "react";

/**
 * 해당 요소의 가시성을 감지하는 커스텀 훅입니다.
 * @description
 * - IntersectionObserver를 사용하여 요소의 가시성을 감지합니다.
 * - 요소의 가시성 여부를 반환합니다.
 * - 가시성 여부가 변경될 때마다 상태를 업데이트합니다. (isInView)
 * - 요소가 처음 가시성에 들어왔을 때를 감지합니다. (isFirstView)
 * - ⚠️ IntersectionObserver는 IE에서 지원하지 않습니다.
 *
 * @template T - 가시성을 감지할 요소의 타입
 * @param {IntersectionObserverInit} [options] - IntersectionObserver의 옵션 객체
 * @returns {{ viewRef: RefObject<T>; isInView: boolean, isFirstView: boolean }} - 가시성을 감지할 요소의 RefObject와 가시성 여부를 담은 객체
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { useInView } from './hooks/useInView';
 *
 * const ExampleComponent = () => {
 *   const { viewRef, isInView, isFirstView } = useInView<HTMLDivElement>();
 *
 *   return (
 *     <div ref={viewRef}>
 *       {isInView ? 'Visible' : 'Not Visible'}
 *     </div>
 *   );
 * };
 * ```
 */
export const useInView = <T extends HTMLElement>(
  options?: IntersectionObserverInit
): { viewRef: RefObject<T>; isInView: boolean; isFirstView: boolean } => {
  const [isInView, setIsInView] = useState(false);
  const [isFirstView, setIsFirstView] = useState(false);
  const viewRef = useRef<T>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, options);

    const currentElement = viewRef.current;

    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  useEffect(() => {
    if (isInView && !isFirstView) {
      setIsFirstView(true);
    }
  }, [isInView]);

  return { viewRef, isInView, isFirstView };
};
