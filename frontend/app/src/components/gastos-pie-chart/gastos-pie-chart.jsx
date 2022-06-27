
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './gastos-pie-chart.scss'

const GastosPieChart = ({chartData}) => {
    
    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])

    useEffect( () =>{
        mountChart();
    }, [chartData]);

    const mountChart = () => {
        if (!chartData){
            return
        }

        setSeries(chartData.map(obj => obj.gastoTotal))
        const labels = chartData.map(obj => obj.categoria)
        setOptions( {
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: labels,
            dataLabels:{
                enabled: true,
                style:{
                    colors: ['#2C2C2C'],
                },
                dropShadow: {
                    enabled: false,
                },
                formatter: function (val, opts) {
                    return [opts.w.config.labels[opts.seriesIndex], parseInt(val) + "%"]
                }
            },
            colors: ['#DA7E7E', '#DAB37E', '#DADA7E', '#A6DA7E', '#7EDA9B', '#7EDAC2', '#7EADDA', '#AD7EDA', '#DA7EC9'],
            legend: {
                show: false,
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width:400
                    },
                }
            }]
        })
    }

    return (
        <div>
            <ReactApexChart options={options} series={series} type="pie" width={500}/>
        </div>
    )
}

export default GastosPieChart