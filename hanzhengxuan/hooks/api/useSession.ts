import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client';

interface CreateSessionRequest {
  language?: string;
  referrer?: string;
}

interface SessionResponse {
  session_id: string;
  expires_at: string;
}

export function useCreateSession() {
  return useMutation<SessionResponse, Error, CreateSessionRequest>({
    mutationFn: async (data) => {
      return apiClient.post('/sessions', data);
    },
  });
}

export function useGetSession(sessionId?: string) {
  return useMutation<SessionResponse, Error, void>({
    mutationFn: async () => {
      if (!sessionId) throw new Error('Session ID is required');
      return apiClient.get(`/sessions/${sessionId}`);
    },
  });
}