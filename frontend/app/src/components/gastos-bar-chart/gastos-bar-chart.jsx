
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './gastos-bar-chart.scss'

const GastosBarChart = ({ chartData }) => {

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])

    useEffect( () =>{
        mountChart();
    }, [chartData]); //eslint-disable-line

    const colors = [
        ['#DA7E7E', '#DA6767', '#DA4B4B', '#D93535', '#D91F1F', '#D90C0C', '#B90505', '#870404', '#5A0202'],
        ['#DAB37E', '#D9AC70', '#D09C57', '#C78C3D', '#C18028', '#B47014', '#A36108', '#8C5102', '#6A3D01'],
        ['#DADA7E', '#D5D56B', '#DADA7E', '#CCCC4F', '#C8C836', '#BBBB1E', '#AEAE0C', '#9C9C03', '#787801'],
        ['#A6DA7E', '#98D866', '#88D14E', '#78C938', '#6FC62A', '#65BF1E', '#5BB910', '#50AD06', '#449A00'],
        ['#7EDA9B', '#69D38A', '#56CD7B', '#3AC565', '#31A856', '#269749', '#1B813B', '#10702E', '#095722'],
        ['#7EDAC2', '#6DD5BA', '#58D1B1', '#44CEAA', '#37CEA7', '#29CAA1', '#1AC599', '#0EB98D', '#07A97F'],
        ['#7EADDA', '#6EA4D7', '#5590C8', '#3876B1', '#23619C', '#16538C', '#0A4073', '#04335F', '#012546'],
        ['#AD7EDA', '#9A64CF', '#8E52CA', '#8040C1', '#7633BB', '#671FB1', '#5B15A4', '#510A9B', '#47048C'],
        ['#DA7EC9', '#D468C0', '#CC4BB4', '#BD2CA2', '#A01586', '#880970', '#73025D', '#49033C', '#22001C'],
    ]

    const mountChart = () => {
        if (!chartData){
            return
        }

        const categories = [...new Set(chartData.map(obj => obj.categoria))]
        const chartColors = mountSeriesFromChartData(categories)
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
            colors: chartColors,
            stroke: {
                width: 1, 
                colors: ['#fff']
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
        const chartColors = []
        
        categories.forEach( (item, index) => {
            let itensCategoria = chartData.filter((obj) =>{
                return obj.categoria === item
            })
            for (let i=0; i<itensCategoria.length; i++){
                let dataArray = new Array(categories.length).fill(0)
                dataArray[index] = itensCategoria[i].gastoTotal
                series.push({
                    name: itensCategoria[i].subcategoria,
                    data: dataArray
                })
                chartColors.push(colors[index][i])
            }
        })
        setSeries(series)
        return chartColors
    }
    
    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" width={'100%'}/>
        </div>
    )
}

export default GastosBarChart