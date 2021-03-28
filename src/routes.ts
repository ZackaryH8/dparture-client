import PublicIndex from './routes/index.svelte'

// National Rail
import NRIndex from './routes/nr/index.svelte'
import NRDepartures from './routes/nr/departures.svelte'

// Tube
import TubeIndex from './routes/tube/index.svelte'
import TubeDepartures from './routes/tube/departures.svelte'
import TubeStatus from './routes/tube/status.svelte'

const routes = {
    '/': PublicIndex,

    '/nr': NRIndex,
    '/nr/departures': NRDepartures,

    '/tube': TubeIndex,
    '/tube/departures': TubeDepartures,
    '/tube/status': TubeStatus,

    // Catch-all
    // This is optional, but if present it must be the last
}

export {routes}