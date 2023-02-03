import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import gpxParser from 'gpxparser'
import {getDistance, getPreciseDistance} from 'geolib';
import styles from './elevationChart.module.css'

const ElevationChart = ({track, onChange}) => {
  const gpx = new gpxParser()
  gpx.parse(track)
  let geoJSON = gpx.toGeoJSON()

  const calculateDistance = (lat1, long1, lat2, long2) => {
    var dis = getDistance(
      {latitude: lat1, longitude: long1},
      {latitude: lat2, longitude: long2},
    );
    return (dis) //KM
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      }
    },
    onHover: (event, elements) => {
      if (elements.length) {
        onChange(elements[0].index * 4)

      } else {
        onChange(null)
      }
    }
  }

  const plugins =  [{
    id: 'customEventListner',
    afterEvent: (chart, evt, opts) => {
      if(!evt.inChartArea) {
        onChange(null)
      }
    }
  }]

  const coordinates = gpx.tracks[0].points

  let coordinateDistances = coordinates.map((item, i) => (
     [i ? calculateDistance(item.lat,item.lon, coordinates[i - 1].lat, coordinates[i - 1].lon) : calculateDistance(item.lat,item.lon, item.lat,item.lon)]
   ))

  const labels = []
  let index = 0
  var sum = 0;
  coordinateDistances.forEach(x => {
    sum += Number(x)
    if (index % 4 === 0) {
      labels.push((sum /1000).toFixed(3))
    }
    index++
  })

  let dataPoints = geoJSON.features[0].geometry.coordinates.map((elem, i) => (i % 4 === 0) ? elem[2]: null)
  dataPoints = dataPoints.filter(n => n)

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Altitude per trackpoint',
        data: dataPoints,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
  )

  return (
    <Line
      className={styles.chart}

      options={{
      ...options,
      interaction: {
        mode: 'index',
        intersect: false,
      }}}
      data={data}
      plugins={plugins}
    />
  )
} 

export default ElevationChart
