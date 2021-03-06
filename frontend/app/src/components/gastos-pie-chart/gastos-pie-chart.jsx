
import { Card, CardContent, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { numberToLocaleCurrencyString, sumObjectArrayProperty } from '../../utils/utils';
import './gastos-pie-chart.scss'

const GastosPieChart = ({chartData}) => {
    
    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])
    const [somaGastos, setSomaGastos] = useState(0)
    const [somaReceitas, setSomaReceitas] = useState(0)

    useEffect( () =>{
        mountChart();
        setSomaGastos(sumObjectArrayProperty(chartData, "gastoTotal"))
    }, [chartData]); // eslint-disable-line

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
            <div className="gastos-pie-chart">
                <div className="row">
                    <div className="col-4">
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Ganhos
                                </Typography>
                                <Typography component="div">
                                    <b>{numberToLocaleCurrencyString(somaReceitas)}</b>
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Gastos
                                </Typography>
                                <Typography component="div" >
                                    <b>{numberToLocaleCurrencyString(somaGastos)}</b>
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    Lucro
                                </Typography>
                                <Typography component="div">
                                    <b>{numberToLocaleCurrencyString(somaReceitas - somaGastos)}</b>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="col-8">
                        <ReactApexChart options={options} series={series} type="donut"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GastosPieChart