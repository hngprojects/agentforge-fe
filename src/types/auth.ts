export interface TokenResponse {
  access_token: string
  token_type: 'bearer'
  refresh_token: string | null
}
export interface MessageResponse {
  message: string
}
