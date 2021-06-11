import React from 'react'
import {useSelector} from 'react-redux'
import {Chart} from 'react-google-charts'

// import {useTranslate} from '../store/actions'

const ShowQuote = () => {
  const {allQuotes} = useSelector(state => state)
  // const translate = useTranslate()
  console.log(allQuotes)

  return (
    <main>
      <h1>Statistika</h1>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Task', 'Hours per Day'],
          ['Work', 11],
          ['Eat', 2],
          ['Commute', 2],
          ['Watch TV', 2],
          ['Sleep', 7],
        ]}
        options={{
          title: 'My Daily Activities',
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </main>
  )
}

export default ShowQuote
