import PublicIndex from './routes/index.svelte'
import Tube from './routes/tube.svelte'
import NationalRail from './routes/nationalRail.svelte'

const routes = {
    '/': PublicIndex,

    '/tube': Tube,

    '/NationalRail': NationalRail,

    // Catch-all
    // This is optional, but if present it must be the last
}

export {routes}