import { onMessage } from './model/messaging'
import { chatgpt } from './plugins/chatgpt'
import { claude } from './plugins/claude'
import { gemini } from './plugins/gemini'
import { poe } from './plugins/poe'

export default defineBackground(() => {
  console.log('Hello background!', { id: browser.runtime.id })

  browser.omnibox.onInputChanged.addListener(async (text, suggest) => {
    const list = [
      'tell me a joke',
      'hi',
      'what can you do',
      'who is brand nat',
      'tab',
      'whatsapp',
      'yellow',
      'help',
    ].map((it) => ({
      content: it,
      description: it,
    }))
    suggest(list)
  })
  let question = ''

  const list = [chatgpt(), poe(), claude(), gemini()]
  browser.omnibox.onInputEntered.addListener(async (content) => {
    console.log('onInputEntered', content)
    question = content
    const { chat } = await browser.storage.local.get('chat')
    const ai = list.find((it) => it.name === chat) ?? list[0]
    await browser.tabs.create({
      url: ai.redirct ?? ai.origin,
      active: true,
    })
  })
  onMessage('getQuestion', () => {
    const r = question
    question = ''
    return r
  })
})
