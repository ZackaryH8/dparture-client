import PublicIndex from './routes/index.svelte'
import NationalRail from './routes/nationalRail.svelte'
import Tube from './routes/tube/tube.svelte'
import TubeStatus from './routes/tube/tubeStatus.svelte'

const routes = {
    '/': PublicIndex,


    '/NationalRail': NationalRail,

    '/tube/departures': Tube,
    '/tube/status': TubeStatus,

    // Catch-all
    // This is optional, but if present it must be the last
}

export {routes}