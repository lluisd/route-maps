import Map from '../Map'
import StatisticsCounter from '../StatisticsCounter'
import ElevationChart from '../ElevationChart'
import { useState } from 'react'
import { Grid, Typography } from '@mui/material'
import gpxParser from 'gpxparser'

const trackCard = ({trackData}) => {
  const [pointHover, setPointHover] = useState(null)

  const gpx = new gpxParser()
  gpx.parse(trackData)


  const handleChange = (index) => {
    setPointHover(index)
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}  style={{ flexWrap: 'nowrap' }}>
        <Typography variant="h4" sx={{fontWeight: 'bold'}}>
          {gpx.tracks[0].name}
        </Typography>
        <Grid item>
          <Map track={trackData} activePoint={pointHover} />
        </Grid>
        <Grid item>
          <StatisticsCounter track={trackData}  />
        </Grid>
        <Grid item>
          <ElevationChart track={trackData} onChange={handleChange}/>
        </Grid>
      </Grid>
    </>
  )
}

export default trackCard
