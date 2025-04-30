import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const keymap = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
]

interface InputWordProps {
  word_en: string
}

const InputWord = ({ word_en }: InputWordProps) => {
  const [wordsItemLength, setWordsItemLength] = useState<number[]>([])
  const [inputIndex, setInputIndex] = useState(0)
  const [errorIndex, setErrorIndex] = useState<number[]>([])
  const [inputWords, setInputWords] = useState<string[]>([])
  const [isShowAnswer, setIsShowAnswer] = useState(false)

  useEffect(() => {
    // 计算单词数量
    const words = word_en.split(' ')
    // 计算每个单词的长度
    setWordsItemLength(words.map((item) => item.length))
    setInputWords(words.map(() => ''))
  }, [word_en])

  // 监听键盘输入单词
  useHotkeys(keymap, (keyboardEvent: KeyboardEvent) => {
    playKeySound()
    const key = keyboardEvent.key
    if (errorIndex.includes(inputIndex)) {
      deleteFromIndex(inputIndex)
      setErrorIndex((prev) => prev.filter((item) => item !== inputIndex))
    }
    appendToString(inputIndex, key)
  })

  useHotkeys('space', () => {
    if (inputIndex < wordsItemLength.length - 1) {
      if (errorIndex.length > 0) {
        setInputIndex(errorIndex[0])
      } else {
        setInputIndex((prev) => prev + 1)
      }
    } else {
      checkInputWords()
    }
  })

  useHotkeys('enter', () => {
    checkInputWords()
  })

  useHotkeys('ctrl+p', () => {
    setIsShowAnswer(!isShowAnswer)
  })

  useHotkeys('backspace', () => {
    const current_word = inputWords[inputIndex]
    if (current_word.length > 0) {
      deleteToString(inputIndex)
    } else {
      if (inputIndex > 0) {
        setInputIndex((prev) => prev - 1)
      }
    }
  })

  const appendToString = (index: number, textToAppend: string) => {
    setInputWords((prevWords) => prevWords.map((word, i) => (i === index ? word + textToAppend : word)))
  }

  const deleteFromIndex = (index: number) => {
    setInputWords((prevWords) => prevWords.map((word, i) => (i === index ? '' : word)))
  }

  const deleteToString = (index: number) => {
    setInputWords((prevWords) => prevWords.map((word, i) => (i === index ? word.slice(0, -1) : word)))
  }

  const playKeySound = () => {
    const audio = new Audio('/click.wav')
    audio.volume = 0.9
    audio.play()
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
      <div
        className={cn(
          'flex flex-row items-center justify-center text-[2rem] transition-opacity',
          isShowAnswer ? 'opacity-100' : 'opacity-0',
        )}>
        {word_en}
      </div>
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
