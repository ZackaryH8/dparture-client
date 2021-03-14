import PublicIndex from './views/public/index.svelte'
import Tube from './views/public/tube.svelte'
import NationalRail from './views/public/nationalRail.svelte'
// import PublicLayout from './views/public/layout.svelte'
// import AdminLayout from './views/admin/layout.svelte'
// import AdminIndex from './views/admin/index.svelte'
// import EmployeesIndex from './views/admin/employees/index.svelte'

function userIsAdmin() {
  //check if user is admin and returns true or false
}

const routes = [
    {
        name: '/',
        component: PublicIndex,
      },
      {
        name: 'tube',
        component: Tube,
      },
      {
        name: 'nationalrail',
        component: NationalRail,
      },
]

export { routes }