import { wait } from '@liuli-util/async'
import { IChat } from './model'

export function poe(): IChat {
  return {
    name: 'Poe',
    origin: 'https://poe.com',
    async sendPrompt(text: string) {
      const getSendButton = () =>
        document.querySelector(
          'button:has(> svg > [d="M4 13h14.09l-6.79 6.79a.996.996 0 1 0 1.41 1.41l8.5-8.5c.06-.06.09-.13.13-.2.03-.04.06-.08.08-.13a.91.91 0 0 0 .08-.37c0-.03-.01-.05-.01-.07-.01-.1-.02-.21-.06-.31a.955.955 0 0 0-.22-.33L12.72 2.8c-.2-.2-.45-.29-.71-.29-.26 0-.51.1-.71.29a.996.996 0 0 0 0 1.41L18.08 11H4c-.55 0-1 .45-1 1s.45 1 1 1Z"])',
        ) as HTMLButtonElement
      const getInput = () =>
        document.querySelector(
          '[class*="ChatMessageInputContainer_textArea__"] textarea',
        ) as HTMLTextAreaElement
      await Promise.race([
        wait(() => !!getInput() && !!getSendButton()),
        wait(10_000).then(() => {
          throw new Error('No input or send button found')
        }),
      ])
      const $input = getInput()
      $input.value = text
      $input.dispatchEvent(new InputEvent('input', { bubbles: true }))
      const $sendButton = getSendButton()
      await wait(() => !$sendButton.hasAttribute('disabled'))
      $sendButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    },
  }
}
