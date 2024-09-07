import { useEffect, useState } from "react";

/**
 * `useDebounce`는 지정된 지연 시간 후에만 값의 최신 상태를 반영하도록 하는 커스텀 훅입니다.
 * @description
 * - 이 훅은 사용자 입력과 같이 빠르게 변경되는 값을 처리할 때 유용합니다.
 * - 값이 변경될 때마다 지정된 지연 시간이 지난 후에만 최종 값을 `debouncedValue`로 설정합니다.
 *
 * @template T - debounce 처리할 값의 타입
 * @param {T} value - debounce 처리할 값
 * @param {number} [delay=500] - debounce 지연 시간(ms), 기본값은 500ms
 * @returns {T} - debounce 처리된 값
 *
 * @example
 * const useSearchQuery = (
 *   value: string,
 *   options?: checkNameOptions
 * ) => {
 *   const { getSearchItem } = searchApi();
 *
 *   const debounceName = useDebounce(value); // 결과를 리액트 쿼리에 사용합니다.
 *
 *   const fetcher = async () => {
 *     await getSearchItem({ name: debounceName });
 *   };
 *
 *   return useQuery({
 *     queryKey: [QUERY_KEY.SEARCH_KEY, debounceName],
 *     queryFn: fetcher,
 *     ...options
 *   });
 * };
 */
export function useDebounce<T>(value: T, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler: ReturnType<typeof setTimeout> = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
