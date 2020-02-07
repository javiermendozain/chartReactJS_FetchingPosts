import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Layout from '../../global/components/layout/Layout/Layout';


const Home = () => {
  return (
    <Layout>
      Chart React and Fetch post
      <br/>
      <Link  to="/linegraph" >
          Go to Line Graph
        </Link>
      <br/>
      <Link  to="/post" >
          Go to Post
        </Link>
    </Layout>
  );
};

export default Home;
