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
  // 错误单词索引
  const [errorIndex, setErrorIndex] = useState<number[]>([])
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
    playKeySound()
    const value = e.target.value
    if (inputValue.length < value.length) {
      const newChar = value.slice(-1)
      if (newChar === ' ') {
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

  const playKeySound = () => {
    const audio = new Audio('/click.wav')
    audio.volume = 0.7
    audio.play()
  }

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (inputWords[inputIndex].trim() !== '' && inputIndex < wordsItemLength.length - 1) {
        setInputIndex(inputIndex + 1)
      }
    }
    if (e.key === ' ') {
      if (inputWords[inputIndex].trim() !== '') {
        if (inputIndex < wordsItemLength.length - 1) {
          setInputIndex(inputIndex + 1)
        } else {
          checkInputWords()
        }
      }
    }
    if (e.key === 'Backspace') {
      if (inputWords[inputIndex].trim() === '' && inputIndex > 0) {
        setInputIndex(inputIndex - 1)
      }
    }
  }

  const checkInputWords = () => {
    inputWords.forEach((word, index) => {
      if (word !== word_en.split(' ')[index]) {
        setErrorIndex((prev) => [...prev, index])
      }
    })
    if (errorIndex.length > 0) {
      setInputIndex(errorIndex[0])
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
      <div>{JSON.stringify(inputWords)}</div>
      <div
        className={cn(
          'flex flex-row items-center justify-center gap-2 opacity-1 transition-opacity',
          errorIndex.length > 0 ? 'opacity-100' : 'opacity-0',
        )}>
        {word_en.split(' ').map((item, index) => (
          <div
            key={index}
            className={cn(
              'border-input flex h-[2rem] items-center justify-center px-2 text-[1.5em] leading-none transition-all md:h-[4rem] md:text-[3em]',
              errorIndex.includes(index) ? 'border-b-green-500 text-green-500' : 'border-b-input text-input',
            )}
            style={{
              minWidth: `${item.length + 0.8}ch`,
            }}>
            {item}
          </div>
        ))}
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        {wordsItemLength.map((length, index) => (
          <div
            key={index}
            className={cn(
              'border-input flex h-[2rem] items-center justify-center border-b-2 border-solid px-2 text-[1.5em] leading-none transition-all md:h-[4rem] md:text-[3em]',
              inputIndex === index ? 'border-b-primary text-primary' : 'border-b-input text-card-foreground',
              errorIndex.includes(index) ? 'text-red-500 line-through' : '',
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
