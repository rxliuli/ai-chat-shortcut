<script lang="ts">
  import * as Select from '$lib/components/ui/select/'
  import { chatgpt } from '../plugins/chatgpt'
  import { claude } from '../plugins/claude'
  import { gemini } from '../plugins/gemini'
  import { poe } from '../plugins/poe'
  import { ModeWatcher } from 'mode-watcher'

  const aiOptions = [chatgpt(), poe(), claude(), gemini()].map((it) => it.name)
  let selectedAI = aiOptions[0]

  onMount(async () => {
    const { chat } = await browser.storage.local.get('chat')
    if (chat) {
      selectedAI = chat
    }
    console.log('selectedAI', selectedAI)
  })

  async function handleSelect(value?: string) {
    if (value) {
      selectedAI = value
      await browser.storage.local.set({ chat: selectedAI })
    }
  }
</script>

<div class="container mx-auto p-6 max-w-md min-h-[240px]">
  <div class="space-y-4">
    <label
      for="ai-service"
      class="block text-sm font-medium dark:text-gray-400"
    >
      Select AI Service
    </label>
    <Select.Root
      selected={{ value: selectedAI, label: selectedAI }}
      onSelectedChange={(e) => handleSelect(e?.value)}
    >
      <Select.Trigger class="w-full">
        <Select.Value placeholder="Select an AI service" />
      </Select.Trigger>
      <Select.Content>
        <Select.Group>
          {#each aiOptions as option}
            <Select.Item value={option} label={option}>{option}</Select.Item>
          {/each}
        </Select.Group>
      </Select.Content>
      <Select.Input name="selectedAI" />
    </Select.Root>
  </div>
</div>

<ModeWatcher />
