import { sendMessage } from './model/messaging'
import { chatgpt } from './plugins/chatgpt'
import { claude } from './plugins/claude'
import { gemini } from './plugins/gemini'
import { poe } from './plugins/poe'

export default defineUnlistedScript({
  async main() {
    const question = await sendMessage('getQuestion', undefined)
    if (!question) {
      return
    }
    const chats = [chatgpt(), poe(), claude(), gemini()]
    const chat = chats.find((chat) => chat.origin === location.origin)
    if (!chat) {
      return
    }
    console.log('Injected.', question, chat)
    await chat.sendPrompt(question)
  },
})
