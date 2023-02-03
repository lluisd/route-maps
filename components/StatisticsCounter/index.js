import dynamic from 'next/dynamic'

const StatisticsCounter = dynamic(() => import('./statisticsCounter'), {
   ssr: false
})

export default StatisticsCounter
