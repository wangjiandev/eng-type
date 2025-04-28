import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import InputWord from '@/components/input-word'
import { useState } from 'react'

const WordCard = () => {
  const [word_cn] = useState('躲在松散的满是灰尘的窗帘后面')
  const [word_en] = useState('hiding behind the loose dusty curtain'.toLowerCase())

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-center">
        <CardTitle>{word_cn}</CardTitle>
      </CardHeader>
      <CardContent className="flex h-96 flex-row items-center justify-center">
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
