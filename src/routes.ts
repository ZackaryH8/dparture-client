import PublicIndex from './routes/index.svelte'

// National Rail
import NRDepartures from './routes/nr/departures.svelte'

// Tube
import TubeDepartures from './routes/tube/departures.svelte'
import TubeStatus from './routes/tube/status.svelte'

const routes = {
    '/': PublicIndex,

    '/nr/departures': NRDepartures,

    '/tube/departures': TubeDepartures,
    '/tube/status': TubeStatus,

    // Catch-all
    // This is optional, but if present it must be the last
}

export {routes}