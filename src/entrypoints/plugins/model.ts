export interface IChat {
  name: string
  origin: string
  redirct?: string
  sendPrompt(text: string): void | Promise<void>
}
