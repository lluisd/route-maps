import fsPromises  from 'fs/promises'
import path from 'path'

const gpsFiles = {
  'biking': 'Bicicleta_por_la_ma_ana.gpx',
  'walking': 'catllar-prades.gpx',
  'inline': 'ruta_patins.gpx'
}

export async function getTracksData() {
  let tracks = {}

  for (const [key, value] of Object.entries(gpsFiles)) {
    const tracksFile = path.join(process.cwd(), 'public/gpx', value)
    const rawdata  = await fsPromises.readFile(tracksFile, 'utf8')
    tracks[key] = rawdata
  }

  return {
    ...tracks
  }
}
