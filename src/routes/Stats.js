import React from 'react'
import {useSelector} from 'react-redux'
import {Chart} from 'react-google-charts'

// import {useTranslate} from '../store/actions'

const ShowQuote = () => {
  const {allQuotes} = useSelector(state => state)
  // const translate = useTranslate()

  const dict = allQuotes.reduce((acc, q) => ({
    ...acc,
    [q.author]: acc[q.author] ? acc[q.author] + 1 : 1
  }), {})

  const data = []
  for (const [key, value] of Object.entries(dict))
    data.push([key, value])

  data.sort((a, b) => b[1] - a[1])
  console.log(data)

  return (
    <main>
      <h1>Statistika</h1>
      <Chart
        width={'800px'}
        height={'500px'}
        chartType="PieChart"
        loader={<div>Loading...</div>}
        data={[
          ['Avtor', 'broj citata'],
          ...data,
        ]}
        options={{
          title: 'Avtori',
          backgroundColor: 'transparent'
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </main>
  )
}

export default ShowQuote
