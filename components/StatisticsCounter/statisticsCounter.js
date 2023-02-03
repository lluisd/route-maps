import gpxParser from 'gpxparser'
import { Box, Grid, Typography } from '@mui/material'
import styles from './statistics.module.css'

const StatisticsCounter = ({track}) => {
  const gpx = new gpxParser()
  gpx.parse(track)
  


  const sum = gpx.tracks[0].distance.total
  const time = new Date(gpx.tracks[0].points[gpx.tracks[0].points.length - 1].time).getTime() - new Date(gpx.tracks[0].points[0].time).getTime()
  const elevation = gpx.tracks[0].elevation.max - gpx.tracks[0].elevation.min

  return (
    <Grid direction="row" container className={styles.statistics} justifyContent="space-around" spacing={2}  style={{ flexWrap: 'nowrap' }}>
      <Grid item xs={4} >
        <Grid direction="column" container  alignItems="center">
          <Grid item>
            <Typography variant="h5">
              Distance
            </Typography>
          </Grid>
          <Grid item xs={4} >
            <Typography variant="h4">
              {(sum/1000).toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={4} >
            <Typography variant="h6">km</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} >
        <Grid  direction="column" container  alignItems="center">
          <Grid item  xs={4}>
            <Typography variant="h5">
              Time
            </Typography>
          </Grid>
          <Grid  item xs={4} >
            <Typography variant="h4">{(time / 1000 / 60 / 60).toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={4} >
            <Typography variant="h6">hours</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={4} >
        <Grid  direction="column" container alignItems="center" justifyContent="center">
          <Grid item xs={4}>
            <Typography variant="h5">
              Elevation
            </Typography>
          </Grid>
          <Grid item xs={4} >
            <Typography variant="h4">{elevation.toFixed(2)}</Typography>
          </Grid>
          <Grid item xs={4} >
            <Typography variant="h6">meters</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
} 

export default StatisticsCounter
