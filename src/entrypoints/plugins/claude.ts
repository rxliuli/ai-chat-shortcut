import { wait } from '@liuli-util/async'
import { IChat } from './model'

export function claude(): IChat {
  return {
    name: 'Claude',
    origin: 'https://claude.ai',
    async sendPrompt(text: string) {
      const getSendButton = () =>
        document.querySelector(
          '[aria-label="Send Message"]',
        ) as HTMLButtonElement
      const getInput = () =>
        document.querySelector('[contenteditable="true"]') as HTMLElement
      await Promise.race([
        wait(() => !!getInput()),
        wait(10_000).then(() => {
          throw new Error('No input or send button found')
        }),
      ])
      const $input = getInput()
      $input.innerHTML = `<p>${text}</p>`
      await wait(() => !!getSendButton())
      getSendButton().dispatchEvent(new MouseEvent('click', { bubbles: true }))
    },
  }
}
