import type {
  ApiService,
  CalculatePayload,
  CalculateResponse,
} from "./api.service";

export class BackendApiService implements ApiService {
  static readonly URL = "http://localhost:3000";

  private fetchFn: typeof fetch;

  constructor(fetchFn: typeof fetch = window.fetch.bind(window)) {
    this.fetchFn = fetchFn;
  }

  public async calculate(
    payload: CalculatePayload
  ): Promise<CalculateResponse> {
    const response = await this.fetchFn(`${BackendApiService.URL}/calculate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error("Failed to calculate!");

    return response.json();
  }
}
