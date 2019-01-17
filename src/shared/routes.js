import Home from './Home'
import Grids from './Grids'
import { fetchPopularRepos } from './api'


const routes =  [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/popular/:id',
    component: Grids,
    fetchInitialData: (path = '') =>
      fetchPopularRepos(path.split('/').pop())
  }
]

export default routes
