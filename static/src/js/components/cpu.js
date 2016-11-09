import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Chart from 'chart.js';

const CPUGRAPHOPTIONS = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
            },
        }],
    },
    legend: {
        display: false,
    },
    tooltips: {
        callbacks: {
            label: tooltipItem => tooltipItem.yLabel,
        },
    },
    animationSteps: 15,
};

@inject(['SystemDataStore'])
@observer
class CPUGraph extends Component {

    constructor(props) {
        super(props);
        this.cpuData = {
            labels: ['00:00', '00:00', '00:00', '00:00', '00:00', '00:00', '00:00'],
            datasets: [{
                label: 'cpu',
                backgroundColor: '#C8E6C9',
                borderColor: '#1B5E20',
                pointRadius: 0,
                data: [0, 0, 0, 0, 0, 0, 0],
            }],
        };
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this.cpuChartElement = document.getElementById('cpuChart').getContext('2d');
        this.cpuChart = new Chart(this.cpuChartElement, { type: 'line', data: this.cpuData, options: CPUGRAPHOPTIONS });
    }

    componentDidUpdate() {
        if (this.resetFlag) {
            this.resetFlag = false;
            return false;
        }
        let timeNow = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: false });
        this.cpuData.labels.shift();
        this.cpuData.labels.push(timeNow);
        this.cpuData.datasets[0].data.shift();
        this.cpuData.datasets[0].data.push(this.props.SystemDataStore.cpu.percent);
        this.cpuChart.update();
    }

    reset() {
        this.resetFlag = true;
        this.cpuData.labels = ['00:00', '00:00', '00:00', '00:00', '00:00', '00:00', '00:00'];
        this.cpuData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0];
        this.cpuChart.update();
        this.props.SystemDataStore.cpu.percent = 0;
    }


    render() {
        return (
            <div className="col-md-5 col-md-offset-1">
                <div className="card">
                    <div className="card-header card-chart" data-background-color="green">
                        <canvas className="ct-chart" id="cpuChart" style={{ paddingTop: '10px', paddingRight: '10px' }} />
                    </div>
                    <div className="card-content">
                        <h4 className="title">CPU</h4>
                        <p className="category">is running at <span className="text-success" style={{ fontSize: 'xx-large' }}> { this.props.SystemDataStore.cpu.percent } </span> Percent</p>
                    </div>
                    <div className="card-footer">
                        <div className="stats">
                            <i className="material-icons text-danger">refresh</i> <a onClick={this.reset}>Reset</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

CPUGraph.wrappedComponent.propTypes = {
    SystemDataStore: React.PropTypes.object.isRequired,
};

export default CPUGraph;
