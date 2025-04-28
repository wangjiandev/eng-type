import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'

interface InputWordProps {
  word_en: string
}
// 1 - 1.7ch
// 2 - 2.4ch
// 3 - 3.8ch
// 4 - 5.4ch
// 5 - 5.5ch
// 6 - 6.8ch
// 7 - 7.3ch
// 9 - 9.7ch

const InputWord = ({ word_en }: InputWordProps) => {
  // 用户输入存储框
  const [inputWords, setInputWords] = useState<string[]>(() => word_en.split(' ').map(() => ''))
  // 用户输入框
  const [inputValue, setInputValue] = useState('')
  // 用户输入框索引
  const [inputIndex, setInputIndex] = useState(0)
  // 每个单词长度
  const [wordsItemLength, setWordsItemLength] = useState<number[]>([])

  useEffect(() => {
    // 计算单词数量
    const words = word_en.split(' ')
    // 计算每个单词的长度
    const wordsItemLength = words.map((item) => item.length)
    setWordsItemLength(wordsItemLength)
  }, [word_en])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (inputValue.length < value.length) {
      const newChar = value.slice(-1)
      const lastChar = inputValue.slice(-1)
      if (newChar === ' ' && lastChar === ' ') {
        return
      }
      appendToString(inputIndex, newChar)
    } else {
      deleteToString(inputIndex)
    }
    setInputValue(value)
  }

  const appendToString = (index: number, textToAppend: string) => {
    setInputWords((prevWords) => prevWords.map((word, i) => (i === index ? word + textToAppend : word)))
  }

  const deleteToString = (index: number) => {
    setInputWords((prevWords) => prevWords.map((word, i) => (i === index ? word.slice(0, -1) : word)))
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputWords[inputIndex].trim() !== '' && inputIndex < wordsItemLength.length - 1) {
        setInputIndex(inputIndex + 1)
      }
    }
    if (e.key === ' ') {
      if (inputWords[inputIndex].trim() !== '' && inputIndex < wordsItemLength.length - 1) {
        setInputIndex(inputIndex + 1)
      }
    }
    if (e.key === 'Backspace') {
      if (inputWords[inputIndex].trim() === '' && inputIndex > 0) {
        setInputIndex(inputIndex - 1)
      }
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2">
      <Input
        type="password"
        className="w-full opacity-0"
        placeholder="输入单词"
        autoFocus
        value={inputValue}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <div className="flex flex-row items-center justify-center gap-2">
        {wordsItemLength.map((length, index) => (
          <div
            key={index}
            className={cn(
              'border-input flex h-[2rem] items-center justify-center rounded-[2px] border-b-2 border-solid px-2 text-[1.5em] leading-none transition-all md:h-[4rem] md:text-[3em]',
              inputIndex === index ? 'border-b-primary text-primary' : 'border-b-input text-card-foreground',
            )}
            style={{
              minWidth: `${length + 0.8}ch`,
            }}>
            {inputWords[index]}
          </div>
        ))}
      </div>
    </div>
  )
}

export default InputWord
