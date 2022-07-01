
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './gastos-bar-chart.scss'

const GastosBarChart = ({ chartData }) => {

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])

    useEffect( () =>{
        mountChart();
    }, [chartData]);

    const mountChart = () => {
        if (!chartData){
            return
        }

        const categories = [...new Set(chartData.map(obj => obj.categoria))]
        setSeries(mountSeriesFromChartData(categories))
        setOptions({
            chart: {
                type: 'bar', 
                height: 350,
                stacked: true,
            }, 
            plotOptions: {
                bar: {
                    horizontal: true, 
                    dataLabels: {
                        position: 'center',
                    }
                },
            },
            stroke: {
                width: 1, 
                colors: ['#fff']
            },
            title: {
                text: 'Gastos por Subcategoria'
            }, 
            dataLabels: {
                enabled: true,
                style:{
                    colors: ["#fff"]
                },
                formatter: function (val, opt) {
                    let maxValue = Math.max.apply(null, opt.w.globals.stackedSeriesTotals)
                    if (val < 0.07 * maxValue)
                        return ""
                    return opt.w.globals.initialSeries[opt.seriesIndex].name
                },
                dropShadow: {
                    enabled: false,
                }
            },
            xaxis: {
                categories: categories,
            },
            yaxis: {
                show: true,
            },
            tooltip: {
                y: {
                    formatter: function (val, opts) {
                        return 'R$' + val
                    }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                show: false, 
            },
            grid: {
                show: true,
                position: 'back',
                xaxis: {
                    lines: {
                        show:true,
                    }
                },
                yaxis: {
                    lines: {
                        show:false,
                    }
                }
            }
        })
    }

    const mountSeriesFromChartData = (categories) =>{
        let series = []
        
        categories.forEach( (item, index) => {
            let itensCategoria = chartData.filter((obj) =>{
                return obj.categoria == item
            })
            for (let i=0; i<itensCategoria.length; i++){

                let dataArray = new Array(categories.length).fill(0)
                dataArray[index] = itensCategoria[i].gastoTotal
                series.push({
                    name: itensCategoria[i].subcategoria,
                    data: dataArray
                })
            }
        })
        return series
    }
    

    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" width={'100%'}/>
        </div>
    )
}

export default GastosBarChart