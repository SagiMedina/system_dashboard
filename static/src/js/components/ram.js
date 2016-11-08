import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Chart from 'chart.js';

const RAMDOUGHUNTOPTIONS = { animation: { animateScale: true }, animationSteps: 15 };


@inject(['SystemDataStore'])
@observer
class RamDoughnut extends Component {

    constructor(props) {
        super(props);
        this.ramData = {
            labels: ['Used', 'Free'], datasets: [{ backgroundColor: ['#FFF9C4', '#F57F17'], data: [50, 50] }],
        };
        this.reset = this.reset.bind(this);
        this.resetFlag = false;
    }

    componentDidMount() {
        this.ramChartElement = document.getElementById('ramDoughnut').getContext('2d');
        this.ramChart = new Chart(this.ramChartElement, { type: 'doughnut', data: this.ramData, options: RAMDOUGHUNTOPTIONS });
    }

    componentDidUpdate() {
        if (this.resetFlag) {
            this.resetFlag = false;
            return false;
        }
        this.ramData.datasets[0].data = [this.props.SystemDataStore.ram.used, this.props.SystemDataStore.ram.total-this.props.SystemDataStore.ram.used];
        this.ramChart.update();
    }

    reset() {
        this.resetFlag = true;
        this.ramData.datasets[0].data = [0, 100];
        this.ramChart.update();
        this.props.SystemDataStore.ram.percent = 0;
    }

    render() {
        return (
            <div className="col-md-5">
                <div className="card">
                    <div className="card-header card-chart" data-background-color="orange">
                        <canvas className="ct-chart" id="ramDoughnut" style={{ paddingBottom: '10px' }} />
                    </div>
                    <div className="card-content">
                        <h4 className="title">RAM</h4>
                        <p className="category">Usage: <span className="text-warning" style={{ fontSize: 'xx-large' }}> {this.props.SystemDataStore.ram.percent} </span> Percent</p>
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

RamDoughnut.propTypes = {
    SystemDataStore: React.PropTypes.object.isRequired,
};

export default RamDoughnut;
