interface HttpClientConfig {
  baseURL?: string;
  headers?: Record<string, string>;
  params?: Record<string, string | number>; // 쿼리 파라미터를 추가하기 위한 필드 (1차원 객체만 지원)
}

// 1차원 객체를 쿼리 스트링으로 변환하는 함수
const buildQueryString = (params: Record<string, string | number>): string => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return query.toString() ? `?${query.toString()}` : "";
};

/**
 * HTTP 요청을 처리하는 클라이언트 클래스입니다.
 * @description
 * - axios와 유사한 형태로 사용할 수 있습니다.
 * - GET, POST, PUT, DELETE 메서드를 지원합니다.
 * - 기본적으로 JSON 형식의 데이터를 주고받습니다.
 * - `baseURL`을 설정하면 상대 주소로 요청을 보낼 수 있습니다.
 * - `headers`를 설정하면 모든 요청에 헤더를 추가할 수 있습니다.
 * - ⚠️ 검증되지 않은 클래스입니다. 사용 시 주의하세요.
 *
 * @example
 * const api = new HttpClient({ baseURL: 'https://harry.com/api' });
 * const getResponse = await api.get("/users", { params: { page: 1 } });
 * const postResponse = await api.post("/users", { id: "123" });
 */
class HttpClient {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor(config?: HttpClientConfig) {
    this.baseURL = config?.baseURL || "";
    this.headers = config?.headers || {};
  }

  // GET 요청
  async get(url: string, config?: HttpClientConfig) {
    return this.request({ ...config, method: "GET", url });
  }

  // DELETE 요청
  async delete(url: string, config?: HttpClientConfig) {
    return this.request({ ...config, method: "DELETE", url });
  }

  // POST 요청
  async post(url: string, data?: any, config?: HttpClientConfig) {
    return this.request({ ...config, method: "POST", url, data });
  }

  // PUT 요청
  async put(url: string, data?: any, config?: HttpClientConfig) {
    return this.request({ ...config, method: "PUT", url, data });
  }

  // 실제 요청을 처리하는 함수
  private async request(
    config: HttpClientConfig & { method: string; url: string; data?: any }
  ) {
    const { method, url, data, params } = config;

    // 쿼리 파라미터가 있으면 URL에 추가
    const queryString = params ? buildQueryString(params) : "";
    const fullUrl = this.baseURL + url + queryString; // baseURL과 쿼리 파라미터 포함한 URL

    const headers = { ...this.headers, ...config.headers };

    const options: RequestInit = {
      method,
      headers: { "Content-Type": "application/json", ...headers },
    };

    if (data) {
      options.body = JSON.stringify(data); // POST나 PUT의 경우 데이터가 필요
    }

    try {
      const response = await fetch(fullUrl, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Request failed:", error);
      throw error;
    }
  }
}

export default HttpClient;
