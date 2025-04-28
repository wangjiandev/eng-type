import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import InputWord from '@/components/input-word'
import { useState } from 'react'

const WordCard = () => {
  const [word_cn] = useState('我喜欢做这件事情')
  const [word_en] = useState('I like to do it'.toLowerCase())

  return (
    <Card className="w-full">
      <CardContent className="flex h-96 flex-col items-center justify-center">
        <CardTitle className="mb-2 text-center text-3xl">{word_cn}</CardTitle>
        <CardTitle className="text-center text-3xl text-gray-500/80">{word_en}</CardTitle>
        <InputWord word_en={word_en} />
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-center gap-2">
        <Button variant="ghost">
          <Badge variant="secondary">Ctrl+C</Badge>播放发音
        </Button>
        <Button variant="ghost">
          <Badge variant="secondary">Ctrl+M</Badge>掌握
        </Button>
        <Button variant="ghost">
          <Badge variant="secondary">Enter</Badge>提交
        </Button>
        <Button variant="ghost">
          <Badge variant="secondary">Ctrl+;</Badge>显示答案
        </Button>
      </CardFooter>
    </Card>
  )
}

export default WordCard
