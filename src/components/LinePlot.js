import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import dry1 from '../images/dry1.jpg';
import doge from '../images/doge.jpg';
import rain1 from '../images/rain1.jpg';
export default class LinePlot extends Component {
  constructor(props) {
    super(props);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

    this.state = {
      width: 0,
      height: 0,
    };
  }

  componentDidMount() {
    //   console.log(this.props.avg);
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    let image;
    if (this.props.y[this.props.y.length - 1] > 3500) {
      image = [
        {
          source: dry1,
          xref: 'paper',
          yref: 'paper',
          x: 1,
          y: 'Yes',
          sizex: 0.2,
          sizey: 0.2,
          xanchor: 'right',
          yanchor: 'bottom',
        },
      ];
    } else {
      image = [
        {
          source: rain1,
          xref: 'paper',
          yref: 'paper',
          x: 1,
          y: 'Yes',
          sizex: 0.5,
          sizey: 0.5,
          xanchor: 'right',
          yanchor: 'bottom',
        },
        {
          source: doge,
          xref: 'paper',
          yref: 'paper',
          x: 0.1,
          y: 0.8,

          sizex: 0.2,
          sizey: 0.2,
          xanchor: 'right',
          yanchor: 'bottom',
        },
      ];
    }

    return (
      <div>
        <Plot
          data={[
            {
              x: this.props.x,
              y: this.props.y,
              type: 'scatter',
              mode: 'lines+markers',
              marker: { color: 'red' },
            },
          ]}
          layout={{
            width: (this.state.width * 18) / 20,
            height: (this.state.height * 18) / 20,

            xaxis: {
              title: {
                text: 'Last 60 Seconds',
                font: { size: 30, color: '#7173FB' },
              },
              tickfont: {
                color: '#cf0',
              },
            },
            yaxis: {
              title: {
                text: 'Rainometer!!!',
                font: { size: 30, color: '#39ff14' },
              },
              tickfont: {
                color: '#cf0',
              },
              autorange: 'reversed',
              range: [0, 4095],
            },
            paper_bgcolor: 'black',
            plot_bgcolor: 'grey',
            images: image,
          }}
        />
      </div>
    );
  }
}
