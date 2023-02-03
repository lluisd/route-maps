import dynamic from 'next/dynamic'

const TrackCard = dynamic(() => import('./trackCard'), {
  ssr: false
})

export default TrackCard
