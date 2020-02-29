import React, { Component } from 'react';
import LinePlot from '../components/LinePlot';
import axios from 'axios';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.makePlot = this.makePlot.bind(this);
    this.state = {
      y: [],
    };
  }
  componentDidMount() {
    setInterval(() => {
      axios.get(`http://192.168.4.1/`).then(res => {
        if (this.state.y.length < 60) {
          this.setState({ y: [...this.state.y, res.data.rain_value] });
        } else {
          this.setState({
            y: [...this.state.y.slice(1, 60), res.data.rain_value],
          });
        }
        console.log(res.data.rain_value);
      });
    }, 1000);
  }

  makePlot() {
    // let y = [];
    let x = [...Array(61).keys()];
    x = x.splice(1, 61);
    // console.log(this.state.y);
    return <LinePlot x={x} y={this.state.y} />;
    // return <LinePlot x={1,2,3,4,5,6,7,8,9,10} y={this.stats} />;
  }
  render() {
    return <div>{this.makePlot()}</div>;
  }
}
