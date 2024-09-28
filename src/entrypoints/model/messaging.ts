import { defineExtensionMessaging } from '@webext-core/messaging'

interface ProtocolMap {
  getQuestion(): string
}

export const { sendMessage, onMessage, removeAllListeners } =
  defineExtensionMessaging<ProtocolMap>()
