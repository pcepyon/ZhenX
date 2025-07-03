import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { AppState, Concern, PersonalFactor, Package, defaultPersonalFactors } from './types'

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial state
      sessionId: '',
      selectedCategories: [],
      selectedConcerns: [],
      personalFactors: defaultPersonalFactors,
      recommendations: [],
      interestedPackages: [],
      
      // Session actions
      setSessionId: (id) => set({ sessionId: id }),
      
      // Category actions
      addCategory: (category) => set((state) => {
        if (state.selectedCategories.includes(category)) {
          return state
        }
        // Maximum 3 categories allowed
        const newCategories = [...state.selectedCategories, category].slice(0, 3)
        return { selectedCategories: newCategories }
      }),
      
      removeCategory: (category) => set((state) => ({
        selectedCategories: state.selectedCategories.filter(c => c !== category),
        // Also remove concerns from this category
        selectedConcerns: state.selectedConcerns.filter(concern => concern.categoryId !== category)
      })),
      
      clearCategories: () => set({ 
        selectedCategories: [], 
        selectedConcerns: [] 
      }),
      
      // Concern actions
      toggleConcern: (concern) => set((state) => {
        const exists = state.selectedConcerns.find(c => c.id === concern.id)
        if (exists) {
          return {
            selectedConcerns: state.selectedConcerns.filter(c => c.id !== concern.id)
          }
        } else {
          return {
            selectedConcerns: [...state.selectedConcerns, concern]
          }
        }
      }),
      
      clearConcerns: () => set({ selectedConcerns: [] }),
      
      setConcernsByCategoryId: (categoryId, concerns) => set((state) => {
        // Remove old concerns from this category and add new ones
        const otherConcerns = state.selectedConcerns.filter(c => c.categoryId !== categoryId)
        return {
          selectedConcerns: [...otherConcerns, ...concerns]
        }
      }),
      
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
        selectedCategories: [],
        selectedConcerns: [],
        personalFactors: defaultPersonalFactors,
        recommendations: []
      }),
      
      resetAll: () => set({
        sessionId: '',
        selectedCategories: [],
        selectedConcerns: [],
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