import React, { Component } from 'react';
import { Button, Row, Col, FormGroup, } from 'reactstrap';
import Select from 'react-select';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';


//Components
import Layout from '../../global/components/layout/Layout/Layout';

class LineGraph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      csvText: '',
      header: [],
      body: [],
      showData: [],
      xAxis: '',
      yAxis: ''
    };
    this.handleClickProcess = this.handleClickProcess.bind(this);
    this.handleUpdateCSV = this.handleUpdateCSV.bind(this);
    this.handleClickApply = this.handleClickApply.bind(this);

  }

  handleClickProcess() {
    const { csvText } = this.state;
    const csvdata = csvText.split(/\r\n|\n/);

    const getHeader = () => csvdata[0].split(',');

    const getBody = () => csvdata.map((item, index) => {
      if (index != 0) {
        const row = item.split(',');
        const elemt = {};
        row.map((col, i) => {
          elemt[getHeader()[i]] = col;
        });
        return elemt;
      }
      return null;
    });

    this.setState({ body: getBody(), header: getHeader() });
  }

  handleUpdateCSV(text) {
    this.setState({ csvText: text });
  }

  handleClickApply() {
    const { body = [], yAxis = '', xAxis = '' } = this.state;

    const showData = body
      .filter((item) => (item != null && yAxis.length > 0 && xAxis.length > 0))
      .map((item) => ({ x: item[xAxis], y: item[yAxis] }));

    this.setState({ showData });

  }

  handleChangeXAxis(xAxis) {
    this.setState({ xAxis });
  }

  handleChangeYAxis(yAxis) {
    this.setState({ yAxis });
  }

  render() {
    const { csvText = '', header = [], yAxis = '', xAxis = '', showData = [] } = this.state;

    const _optionsXAxis = () => {
      return header
        .filter((item) => item != yAxis)
        .map((item) => ({ label: item, value: item }));
    };

    const _optionsYAxis = () => {
      return header
        .filter((item) => item != xAxis)
        .map((item) => ({ label: item, value: item }));
    };

    return (
      <Layout>
        <FormGroup>
          <Row>
            <Col >
              <textarea onChange={(e) => this.handleUpdateCSV(e.target.value)} defaultValue={csvText} /><br />
              <Button onClick={() => this.handleClickProcess()} >Process</Button>
            </Col>
            <Col >
              <Select
                placeholder='Select x axis'
                options={_optionsXAxis()}
                onChange={(e) => this.handleChangeXAxis(e.value)}
                styles={{ control: () => ({ width: '1fr' }) }}
              />
              <Select
                placeholder='Select y axis'
                options={_optionsYAxis()}
                onChange={(e) => this.handleChangeYAxis(e.value)}
                styles={{ control: () => ({ width: '1fr' }) }}
              />
              <Button onClick={() => this.handleClickApply()} >Apply</Button>

            </Col>
          </Row>
          <Row>

            <LineChart width={600} height={300} data={showData}>
              <Line type="monotone" dataKey="y" stroke="#8884d8" />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="x" />
              <YAxis />
            </LineChart>

          </Row>
        </FormGroup>
      </Layout>
    );;
  }
}

export default LineGraph;
