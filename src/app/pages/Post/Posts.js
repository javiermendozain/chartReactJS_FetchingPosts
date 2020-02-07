import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, } from 'reactstrap';

// Components
import Layout from '../../global/components/layout/Layout/Layout';

// Common functions
import { isFirstRender } from '../../../shared/utils/data';

class Posts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      post: {},
      comments: [],
      postsByUser: [],
      url: 'https://jsonplaceholder.typicode.com'
    };
    this.getFirstPost = this.getFirstPost.bind(this);
    this.getCommentsByPost = this.getCommentsByPost.bind(this);
    this.getPostByUser = this.getPostByUser.bind(this);

  }

  componentDidMount() {
    const { post } = this.state;
    if (isFirstRender(post)) {
      this.getFirstPost();
    }

  }

  getFirstPost() {
    const { url } = this.state;
    Axios.get(`${url}/posts/1`)
      .then(res => {
        this.setState({ post: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getCommentsByPost(id) {
    const { url } = this.state;
    Axios.get(`${url}/comments?postId=${id}`)
      .then(res => {
        this.setState({ comments: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getPostByUser(id) {
    const { url } = this.state;
    Axios.get(`${url}/posts?userId=${id}`)
      .then(res => {
        this.setState({ postsByUser: res.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { post = {}, comments = [], postsByUser = [] } = this.state;
    return (
      <Layout>
        <Row>
          <Col>
            <h3>First Post</h3>

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th scope="col"> User Id </th>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Body</th>
                </tr>
              </thead>
              <tbody>
                {
                  (!isFirstRender(post)) &&
                  <tr>
                    <th onClick={()=>this.getPostByUser(post.userId)} > <strong>{post.userId}</strong> </th>
                    <td onClick={()=>this.getCommentsByPost(post.id)} > <strong>{post.id}</strong></td>
                    <td>{post.title}</td>
                    <td>{post.body}</td>
                  </tr>
                }
              </tbody>
            </table>
          </Col>
          {(comments.length > 0) &&
            <Col>
              <h3>Comments by post</h3>

              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Post Id</th>
                    <th scope="col">Name</th>
                    <th scope="col">Emial</th>
                    <th scope="col">Comment</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    comments.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th>{item.postId}</th>
                          <td>{item.name}</td>
                          <td>{item.email}</td>
                          <td>{item.body}</td>

                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </Col>
          }
          {
            (postsByUser.length > 0) &&
            <Col>
              <h3>Post by user</h3>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col"> User Id</th>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                    <th scope="col">Body</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    postsByUser.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th>{item.userId}</th>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.body}</td>

                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </Col>
          }

        </Row>



      </Layout>
    );
  }

}

export default Posts;
