// src/composables/usePracticeHistory.ts
import { useStorage } from '@vueuse/core'

export type PracticeRecord = {
  id: string          // 题目/单词唯一ID
  prompt: string      // 单词/题干
  input: string       // 你的输入
  correct: boolean
  ts: number          // 时间戳
}

export const usePracticeHistory = () => {
  const history = useStorage<PracticeRecord[]>('my-ielts:practice-history', [])

  const addRecord = (r: PracticeRecord) => {
    history.value.unshift(r)
    // 可选：限制长度
    if (history.value.length > 2000) history.value.length = 2000
  }

  const clear = () => { history.value = [] }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(history.value, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `my-ielts-history-${new Date().toISOString().slice(0,10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return { history, addRecord, clear, exportJson }
}
