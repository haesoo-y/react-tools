import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { stringify } from "qs";

/**
 * 라우터 훅을 사용하여 라우터 객체를 반환합니다.
 * 라우터 객체는 브라우저 히스토리를 조작할 수 있는 메서드를 제공합니다.
 *
 * @returns 라우터 객체
 * @example
 * const router = useRouter();
 * router.push('/search', { id: 1 });
 * router.back();
 * router.replace('/login');
 */
export function useRouter() {
  const navigate = useNavigate();
  return useMemo(() => {
    return {
      back(steps = 1) {
        navigate(-steps);
      },
      push(path: RoutePath, search?: any) {
        navigate({
          pathname: path,
          search: search ? stringify(search, { indices: false }) : undefined,
        });
      },
      replace(path: RoutePath) {
        navigate({ pathname: path }, { replace: true });
      },
    };
  }, [navigate]);
}

export type RoutePath = "/main" | "/todos";
