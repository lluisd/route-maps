import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getTracksData } from '../lib/tracks'
import TrackCard from '../components/TrackCard'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Grid } from '@mui/material'

export default function Home({tracksData}) {
  const [trackData, setTrackData] = useState(tracksData['walking'])
  const router = useRouter()
  const slug = router.query.slug || []

  useEffect(() => {
    if (slug.length === 1) {
      const trackFromQuery = slug[0]
      setTrackData(tracksData[trackFromQuery])
    }
  }, [])

  const handleSelectedTrack = async (selectedTrack) => {
    router.push(`/${selectedTrack}`, `/${selectedTrack}`, { shallow: true })
    setTrackData(tracksData[selectedTrack])
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Routes and Tracks or Track and Routes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}  style={{ flexWrap: 'nowrap' }}>
          <Grid item>
            <ButtonGroup size="large" variant="text" aria-label="tracks">
              <Button onClick={() => handleSelectedTrack('walking')}>Walking</Button>
              <Button onClick={() => handleSelectedTrack('inline')}>Inline skating</Button>
              <Button onClick={() => handleSelectedTrack('biking')}>Biking</Button>
            </ButtonGroup>
          </Grid>
          <Grid item style={{marginTop: "30px"}}>
            <TrackCard trackData={trackData} />
          </Grid>
        </Grid>
      </main>
    </div>
  )
}

export async function getStaticProps({ params }) {
  //const isHomePage = !!!params.slug
  //if (isHomePage) {
    const tracksData = await getTracksData()
    return {
      props: {
        tracksData
      }
    }
 // }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: false }}
    ],
    fallback: 'blocking',
  }
}
