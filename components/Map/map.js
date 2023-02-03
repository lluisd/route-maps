import { MapContainer, TileLayer, GeoJSON, Marker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Box } from '@mui/material'
import gpxParser from 'gpxparser'
import bbox from 'geojson-bbox'
import styles from './map.module.css'
import blue_marker from '../../public/icons/blue_marker.png'
import green_marker from '../../public/icons/green_marker.png'
import red_marker from '../../public/icons/red_marker.png'
import { useEffect, useRef } from 'react'

const Map = ({track, activePoint}) => {
  const gpx = new gpxParser()
  gpx.parse(track)
  const activeMarkerRef = useRef();

  useEffect(() => {
    if(activeMarkerRef.current && activePoint){
      activeMarkerRef.current.setLatLng([geoJSON.features[0].geometry.coordinates[activePoint][1],geoJSON.features[0].geometry.coordinates[activePoint][0]])
    }
  }, [activePoint])

  let geoJSON = gpx.toGeoJSON()

  const bounds = bbox(geoJSON)

  function  UpdateBounds () {
    const map = useMap()
    map.fitBounds([[bounds[1], bounds[0]],[bounds[3], bounds[2]]])
  }

  const lastIndex = geoJSON.features[0].geometry.coordinates.length - 1

  return (
    <Box  className={styles.map} >
      <MapContainer Zoom={false}
                    bounds={[[bounds[1], bounds[0]],[bounds[3], bounds[2]]]}
                    className={styles.mapContainer}
                    style={{height: "600px", width: "100wh"}} >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker key='start'
                icon={getIcon(green_marker)}
                position={[geoJSON.features[0].geometry.coordinates[0][1],geoJSON.features[0].geometry.coordinates[0][0]]}>

        </Marker>
        <Marker key='end'
                icon={getIcon(red_marker)}
                position={[geoJSON.features[0].geometry.coordinates[lastIndex][1],geoJSON.features[0].geometry.coordinates[lastIndex][0]]}>

        </Marker>
        {activePoint !== null ?
          <Marker ref={activeMarkerRef}
                  key='active'
                  position={[0,0]}
                  icon={getIcon(blue_marker)}></Marker> : ''
        }
        <GeoJSON key={gpx.tracks[0].name} data={geoJSON} style={{color: '#d45509', weight: 5, dashArray: '3', fillOpacity: 1, opacity: 1, fillColor: 'red'}} />
        <UpdateBounds></UpdateBounds>
      </MapContainer>
    </Box>
  )
}

function getIcon(iconFile) {

  return L.icon({
    iconUrl: iconFile.src,
    iconSize: [30, 30]
  })
}


export default Map
