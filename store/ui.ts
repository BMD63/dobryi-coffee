export const state = () => ({ mobileMenuOpen: false as boolean })
export type UiState = ReturnType<typeof state>
export const mutations = {
  setMobileMenuOpen (state: UiState, value: boolean) { state.mobileMenuOpen = !!value }
}
