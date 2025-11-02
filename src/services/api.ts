/**
 * API service layer for external Python FastAPI + Ollama backend
 * Backend URL: http://localhost:8080
 */

const API_BASE_URL = 'http://localhost:8080';

export interface AIResponse {
  response: string;
  steps?: string[];
  solution?: any;
}

export interface MathSolveRequest {
  expression: string;
  type?: 'linear' | 'quadratic' | 'general';
}

export interface CodeAssistRequest {
  code: string;
  language: string;
  action: 'debug' | 'explain' | 'optimize';
}

/**
 * Solve math problems using AI backend
 */
export async function solveMathWithAI(request: MathSolveRequest): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Math solve API error:', error);
    throw error;
  }
}

/**
 * Get code assistance (debug, explain, optimize)
 */
export async function getCodeAssistance(request: CodeAssistRequest): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/code-assist`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Code assist API error:', error);
    throw error;
  }
}

/**
 * General AI chat for the assistant
 */
export async function chatWithAI(message: string, history?: Array<{role: string; content: string}>): Promise<AIResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history: history || [],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
}

/**
 * Health check for backend connection
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}
