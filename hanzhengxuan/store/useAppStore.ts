import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AppState, Concern, PersonalFactor, Package, defaultPersonalFactors } from './types'

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      sessionId: '',
      selectedCategory: null,
      selectedConcern: null,
      personalFactors: defaultPersonalFactors,
      recommendations: [],
      interestedPackages: [],
      
      // Session actions
      setSessionId: (id) => set({ sessionId: id }),
      
      // Category actions
      setCategory: (category) => set((state) => ({
        selectedCategory: category,
        // Clear concern when changing category
        selectedConcern: category !== state.selectedCategory ? null : state.selectedConcern
      })),
      
      clearCategory: () => set({ 
        selectedCategory: null, 
        selectedConcern: null 
      }),
      
      // Concern actions
      setConcern: (concern) => set({ selectedConcern: concern }),
      
      clearConcern: () => set({ selectedConcern: null }),
      
      // Personal factor actions
      togglePersonalFactor: (factorId) => set((state) => ({
        personalFactors: state.personalFactors.map(factor =>
          factor.id === factorId 
            ? { ...factor, checked: !factor.checked }
            : factor
        )
      })),
      
      setPersonalFactors: (factors) => set({ personalFactors: factors }),
      
      // Recommendation actions
      setRecommendations: (packages) => set({ recommendations: packages }),
      
      // Interest actions
      addInterest: (packageCode) => set((state) => {
        if (state.interestedPackages.includes(packageCode)) {
          return state
        }
        return {
          interestedPackages: [...state.interestedPackages, packageCode]
        }
      }),
      
      removeInterest: (packageCode) => set((state) => ({
        interestedPackages: state.interestedPackages.filter(code => code !== packageCode)
      })),
      
      isInterested: (packageCode) => {
        return get().interestedPackages.includes(packageCode)
      },
      
      clearAllInterests: () => set({ interestedPackages: [] }),
      
      // Reset actions
      resetWizard: () => set({
        selectedCategory: null,
        selectedConcern: null,
        personalFactors: defaultPersonalFactors,
        recommendations: []
      }),
      
      resetAll: () => set({
        sessionId: '',
        selectedCategory: null,
        selectedConcern: null,
        personalFactors: defaultPersonalFactors,
        recommendations: [],
        interestedPackages: []
      })
    }),
    {
      name: 'hanzhengxuan-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // Only persist these fields
        sessionId: state.sessionId,
        interestedPackages: state.interestedPackages
      })
    }
  )
)