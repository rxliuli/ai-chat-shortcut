import { IChat } from './model'
import { wait } from '@liuli-util/async'

export function chatgpt(): IChat {
  return {
    name: 'ChatGPT',
    origin: 'https://chatgpt.com',
    async sendPrompt(text: string) {
      const getSendButton = () =>
        document.querySelector(
          '[data-testid="send-button"]',
        ) as HTMLButtonElement
      const getInput = () =>
        document.querySelector('#prompt-textarea') as HTMLTextAreaElement
      await Promise.race([
        wait(() => !!getInput() && !!getSendButton()),
        wait(10_000).then(() => {
          throw new Error('No input or send button found')
        }),
      ])
      const $input = getInput()
      $input.innerHTML = `<p>${text}</p>`
      await wait(
        () => getSendButton() && !getSendButton().hasAttribute('disabled'),
      )
      getSendButton().dispatchEvent(new MouseEvent('click', { bubbles: false }))
    },
  }
}
