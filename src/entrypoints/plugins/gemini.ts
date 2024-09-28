import { wait } from '@liuli-util/async'
import { IChat } from './model'

export function gemini(): IChat {
  return {
    name: 'Gemini',
    origin: 'https://gemini.google.com',
    redirct: 'https://gemini.google.com/app',
    async sendPrompt(text: string) {
      const getSendButton = () =>
        document.querySelector(
          '[aria-label="Send message"]',
        ) as HTMLButtonElement
      const getInput = () =>
        document.querySelector('.ql-editor.textarea') as HTMLElement
      await Promise.race([
        wait(() => !!getInput() && !!getSendButton()),
        wait(10_000).then(() => {
          throw new Error('No input or send button found')
        }),
      ])
      const $input = getInput()
      $input.innerHTML = `<p>${text}</p>`
      const $sendButton = getSendButton()
      await wait(() => $sendButton.getAttribute('aria-disabled') === 'false')
      $sendButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    },
  }
}
