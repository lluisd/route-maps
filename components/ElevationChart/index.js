import dynamic from 'next/dynamic'

const ElevationChart = dynamic(() => import('./elevationChart'), {
    ssr: false
}) 

export default ElevationChart