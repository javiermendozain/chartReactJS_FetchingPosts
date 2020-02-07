// Components
import Home from '../app/pages/Home/Home';
import NotFound from '../app/pages/NotFount/NotFound';
import Posts from '../app/pages/Post/Posts';
import LineGraph from '../app/pages/Linegraph/LineGraph';



// Containers


const routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/linegraph',
    component: LineGraph
  },
  {
    path:'/post',
    component: Posts,
    exact: true
  },
  {
    path: null,
    component: NotFound
  }
];

export default routes;
