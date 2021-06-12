import React from 'react'
import {useSelector} from 'react-redux'
import {Chart} from 'react-google-charts'

import {useAuthorName} from '../store/actions' // useTranslate

const ShowQuote = () => {
  const {allQuotes} = useSelector(state => state)
  const getName = useAuthorName()
  // const translate = useTranslate()

  const dict = allQuotes.reduce((acc, q) => ({
    ...acc,
    [q.author]: acc[q.author] ? acc[q.author] + 1 : 1
  }), {})

  const data = []
  for (const [key, value] of Object.entries(dict))
    data.push([getName(key), value])

  data.sort((a, b) => b[1] - a[1])

  const singles = data.filter(arr => arr[1] === 4).map(arr => arr[0])
  console.log(singles)

  return (
    <main>
      <h1>Statistika</h1>
      <Chart
        width={'800px'}
        height={'500px'}
        chartType="PieChart"
        loader={<div>Loading...</div>}
        data={[
          ['Avtor', 'broj citatov'],
          ...data,
        ]}
        options={{
          title: 'Avtori po broju citatov',
          backgroundColor: 'transparent'
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </main>
  )
}

export default ShowQuote
