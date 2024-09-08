import { useRef, useState } from "react";

import { useRaf } from "@hooks/useRaf";

const AnimationTest = () => {
  const [position, setPosition] = useState(0); // 공의 좌우 위치
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션 활성화 여부
  const ballWidth = 50; // 공의 크기
  const containerWidth = 400; // 애니메이션이 진행될 컨테이너 크기
  const directionRef = useRef(1); // 방향을 상태 대신 ref로 관리하여 즉시 반영

  // useRaf 훅을 이용해 공의 위치를 프레임마다 업데이트 (60 FPS)
  useRaf(
    (deltaTime) => {
      const speed = 5; // 공의 이동 속도
      setPosition((prevPosition) => {
        let newPos = prevPosition + directionRef.current * speed;

        // 공이 좌우 경계에 닿으면 방향을 반대로 전환
        if (newPos <= 0) {
          directionRef.current = 1; // 오른쪽으로 이동
          newPos = 0; // 공이 경계를 넘지 않도록
        } else if (newPos >= containerWidth - ballWidth) {
          directionRef.current = -1; // 왼쪽으로 이동
          newPos = containerWidth - ballWidth; // 공이 경계를 넘지 않도록
        }

        return newPos;
      });
    },
    isAnimating,
    60
  ); // 60 FPS로 애니메이션 진행

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: containerWidth,
          height: 100,
          border: "2px solid black",
          position: "relative",
          overflow: "hidden",
          margin: "20px auto",
        }}
      >
        <div
          style={{
            width: ballWidth,
            height: ballWidth,
            borderRadius: "50%",
            backgroundColor: "red",
            position: "absolute",
            left: position, // 공의 좌우 위치
            top: 25, // 공의 상단 위치
          }}
        />
      </div>
      <button onClick={() => setIsAnimating((prev) => !prev)}>
        {isAnimating ? "Stop" : "Start"} Animation
      </button>
    </div>
  );
};

export default AnimationTest;
