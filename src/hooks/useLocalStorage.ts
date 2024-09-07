import { useState } from "react";

interface StoredValue<T> {
  value: T;
  expiry?: number; // 만료 시간 (밀리초)
}

/**
 * 로컬 스토리지를 사용하는 커스텀 훅입니다.
 * @description
 * - 로컬 스토리지에 값을 저장하고 가져오는 기능을 제공합니다.
 * - 값의 만료 시간을 설정할 수 있습니다.
 * - 만료 시간이 지난 값은 자동으로 삭제됩니다.
 * - 만료 시간을 설정하지 않으면 기본값은 24시간입니다.
 * - ⚠️ 검증되지 않은 훅입니다. 사용 시 주의하세요.
 *
 * @param {string} key - 로컬 스토리지에 저장할 값의 키
 * @param {T} initialValue - 초기값
 * @param {number} [expiryTime=1000 * 60 * 60 * 24] - 값의 만료 시간 (기본값: 24시간)
 *
 * @example
 * const [user, setUser] = useLocalStorage<User>('user', initialUser, 1000 * 60 * 60 * 24 * 7); // 7일
 * console.log(user); // 로컬 스토리지에 저장된 user 객체 출력 (없으면 초기값 출력)
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T,
  expiryTime: number = 1000 * 60 * 60 * 24 // 24시간
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem: StoredValue<T> = JSON.parse(item);
        if (parsedItem.expiry && Date.now() < parsedItem.expiry) {
          return parsedItem.value; // 만료되지 않았으면 값을 반환
        }
        // 만료되었으면 로컬 스토리지에서 해당 키 삭제
        window.localStorage.removeItem(key);
        return initialValue;
      }
      return initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const expiry = Date.now() + expiryTime; // 만료 시간 설정
      const valueToStore: StoredValue<T> = { value, expiry };
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
