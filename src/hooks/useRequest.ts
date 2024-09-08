import { useState } from "react";

/**
 * 비동기 요청을 처리하는 커스텀 훅입니다.
 * @description
 * - 비동기 요청을 수행하고 요청 상태를 관리합니다.
 * - 요청 중, 요청 성공, 요청 실패 상태를 제공합니다.
 * - useMutation과 유사하게 동작합니다.
 * - ⚠️ 검증되지 않은 훅입니다. 사용 시 주의하세요.
 *
 * @template T - 요청 결과의 타입
 * @param {function} requestFn - 비동기 요청을 수행하는 함수
 * @returns {object} - 데이터, 로딩 상태, 에러 상태, 에러 객체, 성공 상태, 요청 함수를 포함한 객체
 *
 * @example
 * ```tsx
 * const fetchData = async () => {
 *   const response = await fetch('https://api.example.com/data');
 *   const data = await response.json();
 *   return data;
 * };
 *
 * const MyComponent = () => {
 *   const { data, isLoading, isError, error, isSuccess, request } = useRequest(fetchData);
 *
 *   useEffect(() => {
 *     request();
 *   }, []);
 *
 *   if (isLoading) {
 *     return <div>Loading...</div>;
 *   }
 *
 *   if (isError) {
 *     return <div>Error: {error.message}</div>;
 *   }
 *
 *   if (isSuccess) {
 *     return <div>Data: {JSON.stringify(data)}</div>;
 *   }
 *
 *   return null;
 * };
 * ```
 */
export const useRequest = <T = any>(requestFn: (data?: any) => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<null | Error>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const request = async (requestData?: any) => {
    setIsLoading(true);
    setIsError(false);
    setIsSuccess(false);
    setError(null);

    try {
      const result = await requestFn(requestData); // 비동기 요청 실행
      setData(result); // 요청 성공 시 데이터를 저장
      setIsSuccess(true); // 성공 상태로 설정
    } catch (err) {
      setIsError(true); // 에러 발생 시 에러 상태로 전환
      setError(err instanceof Error ? err : new Error("Unknown error")); // 에러 메시지 저장
    } finally {
      setIsLoading(false); // 요청이 끝나면 로딩 상태를 false로
    }
  };

  return { data, isLoading, isError, error, isSuccess, request };
};
