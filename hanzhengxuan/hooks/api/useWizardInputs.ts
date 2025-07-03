import { useMutation, useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api/client'
import { useAppStore } from '@/store/useAppStore'

export interface WizardInput {
  step_number: number
  selected_categories?: string[]
  selected_concerns?: string[]
  personal_factors?: string[]
}

interface SaveInputPayload {
  step_number: number
  selected_categories?: string[]
  selected_concerns?: string[]
  personal_factors?: string[]
}

export function useSaveWizardInput() {
  const sessionId = useAppStore((state) => state.sessionId)
  
  return useMutation({
    mutationFn: async (payload: SaveInputPayload) => {
      if (!sessionId) {
        throw new Error('No session ID available')
      }
      
      const response = await apiClient.post(
        `/sessions/${sessionId}/inputs`,
        payload
      )
      
      if (!response.success) {
        throw new Error(response.error || 'Failed to save wizard input')
      }
      
      return response.data
    },
  })
}

export function useWizardInputs() {
  const sessionId = useAppStore((state) => state.sessionId)
  
  return useQuery({
    queryKey: ['wizard-inputs', sessionId],
    queryFn: async () => {
      if (!sessionId) {
        throw new Error('No session ID available')
      }
      
      const response = await apiClient.get<{ inputs: WizardInput[] }>(
        `/sessions/${sessionId}/inputs`
      )
      
      if (!response.success || !response.data) {
        throw new Error(response.error || 'Failed to fetch wizard inputs')
      }
      
      return response.data.inputs
    },
    enabled: !!sessionId,
  })
}