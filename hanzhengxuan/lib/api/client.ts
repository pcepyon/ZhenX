export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

class ApiClient {
  private baseURL = '/api/v1'
  
  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
      throw new ApiError(
        errorData.error || `HTTP ${response.status} error`,
        response.status,
        errorData.code
      )
    }
    
    const data = await response.json()
    return data
  }
  
  async get<T = any>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    
    return this.handleResponse<T>(response)
  }
  
  async post<T = any>(url: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    
    return this.handleResponse<T>(response)
  }
  
  async put<T = any>(url: string, body?: any, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    
    return this.handleResponse<T>(response)
  }
  
  async delete<T = any>(url: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    })
    
    return this.handleResponse<T>(response)
  }
}

export const apiClient = new ApiClient()