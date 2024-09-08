import { useState } from "react";

/**
 * 클립보드에 텍스트를 복사하는 React Hook입니다.
 * @description
 * - 클립보드에 텍스트를 복사하고 복사 성공 여부를 반환합니다.
 * - 복사 성공 여부는 일정 시간 후에 초기화됩니다.
 *
 * @param time - 복사 상태 초기화까지의 시간 (기본값: 3000ms)
 * @returns Obj.isCopied: 복사 성공 여부
 * @returns Obj.copyToClipboard: 클립보드에 텍스트 복사하는 함수
 *
 * @example
 * const { isCopied, copyToClipboard } = useCopy();
 *
 * const handleCopy = () => {
 *   copyToClipboard("복사할 텍스트");
 * };
 *
 * return (
 *   <div>
 *     <button onClick={handleCopy}>복사하기</button>
 *     {isCopied && <p>복사되었습니다!</p>}
 *   </div>
 * );
 */
export const useCopy = (time: number = 3000) => {
  const [isCopied, setIsCopied] = useState(false); // 복사 성공 여부

  const copyToClipboard = async (text: string) => {
    try {
      // 클립보드에 텍스트 복사
      await navigator.clipboard.writeText(text);
      setIsCopied(true); // 복사 성공
    } catch (error) {
      setIsCopied(false); // 복사 실패
    }

    // 일정 시간 후에 복사 상태 초기화 (예: 3초 후)
    setTimeout(() => setIsCopied(false), time);
  };

  return { isCopied, copyToClipboard };
};
