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
    console.log('e: ', e)
    const value = e.target.value
    const newChar = value.slice(-1)
    appendToString(inputIndex, newChar)
    setInputValue(value)
  }

  const appendToString = (index: number, textToAppend: string) => {
    setInputWords((prevWords) => prevWords.map((word, i) => (i === index ? word.trim() + textToAppend : word.trim())))
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
        type="text"
        className="w-full"
        placeholder="输入单词"
        autoFocus
        value={inputValue}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <div>{inputIndex}</div>
      <div className="border-input flex h-[2rem] items-center justify-center rounded-[2px] border-b-2 border-solid px-2 text-[1.5em] leading-none transition-all md:h-[4rem] md:text-[3em]">
        {word_en}
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        {wordsItemLength.map((length, index) => (
          <div
            key={index}
            onClick={() => setInputIndex(index)}
            className={cn(
              'border-input flex h-[2rem] cursor-pointer items-center justify-center rounded-[2px] border-b-2 border-solid px-2 text-[1.5em] leading-none transition-all md:h-[4rem] md:text-[3em]',
              inputIndex === index ? 'border-b-primary text-primary' : 'border-b-input text-gray-500',
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
