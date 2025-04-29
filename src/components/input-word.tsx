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

  useEffect(() => {
    // 计算单词数量
    const words = word_en.split(' ')
    // 计算每个单词的长度
    setWordsItemLength(words.map((item) => item.length))
    setInputWords(words.map(() => ''))
  }, [word_en])

  useHotkeys(keymap, (keyboardEvent: KeyboardEvent) => {
    playKeySound()
    const key = keyboardEvent.key
    appendToString(inputIndex, key)
  })

  useHotkeys('space', () => {
    if (inputIndex < wordsItemLength.length - 1) {
      setInputIndex((prev) => prev + 1)
    } else {
      alert('end')
    }
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

  const deleteToString = (index: number) => {
    setInputWords((prevWords) => prevWords.map((word, i) => (i === index ? word.slice(0, -1) : word)))
  }

  const playKeySound = () => {
    const audio = new Audio('/click.wav')
    audio.volume = 0.4
    audio.play()
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-2">
      <div>{JSON.stringify(inputWords)}</div>
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
