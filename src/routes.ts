import PublicIndex from './routes/index.svelte'

// National Rail
import NationalRail from './routes/nationalRail.svelte'

// Tube
import TubeDepartures from './routes/tube/departures.svelte'
import TubeStatus from './routes/tube/status.svelte'

const routes = {
    '/': PublicIndex,


    '/NationalRail': NationalRail,

    '/tube/departures': TubeDepartures,
    '/tube/status': TubeStatus,

    // Catch-all
    // This is optional, but if present it must be the last
}

export {routes}