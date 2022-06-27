
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import './gastos-bar-chart.scss'

const GastosBarChart = () => {

    // const [options, setOptions] = useState({})
    // const [series, setSeries] = useState([])

    // useEffect( () =>{
    //     mountChart();
    // }, [chartData]);

    // const mountChart = () => {
    //     if (!chartData){
    //         return
    //     }

    //     setSeries(chartData.map(obj => obj.gastoTotal))
    //     const labels = chartData.map(obj => obj.categoria)
    //     setOptions( {
    //         chart: {
    //             width: 380,
    //             type: 'pie',
    //         },
    //         labels: labels,
    //         dataLabels:{
    //             enabled: true,
    //             style:{
    //                 colors: ['#2C2C2C'],
    //             },
    //             dropShadow: {
    //                 enabled: false,
    //             },
    //             formatter: function (val, opts) {
    //                 return [opts.w.config.labels[opts.seriesIndex], parseInt(val) + "%"]
    //             }
    //         },
    //         colors: ['#DA7E7E', '#DAB37E', '#DADA7E', '#A6DA7E', '#7EDA9B', '#7EDAC2', '#7EADDA', '#AD7EDA', '#DA7EC9'],
    //         legend: {
    //             show: false,
    //         },
    //         responsive: [{
    //             breakpoint: 480,
    //             options: {
    //                 chart: {
    //                     width:400
    //                 },
    //             }
    //         }]
    //     })
    // }

    const series = [
        {
            name: 'Delivery',
            data: [100, 0, 0, 0, 0]
        }, 
        {
            name: 'Mercado',
            data: [100, 0, 0, 0, 0]
        }, 
        {
            name: 'Aluguel',
            data: [0, 300, 0, 0, 0]
        }, 
        {
            name: 'Bar',
            data: [0, 0, 50, 0, 0]
        },
        {
            name: 'Balada',
            data: [0, 0, 90, 0, 0]
        },
        {
            name: 'Shows',
            data: [0, 0, 30, 0, 0]
        },
        {
            name: 'Maruba',
            data: [0, 0, 30, 30, 0]
        },
        {
            name: 'Marron5',
            data: [0, 0, 0, 0, 40.01]
        },
    ]

    const options = {
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
                return opt.w.globals.initialSeries[opt.seriesIndex].name
            },
            dropShadow: {
                enabled: false,
            }
        },
        xaxis: {
            categories: ["Alimentação", "Moradia", "Lazer", "BBarbatanas", "Sardinhas"],
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
            position: 'top',
            horizontalAlign: 'left',
            offsetX: 40
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

    }

    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" width={700}/>
        </div>
    )
}

export default GastosBarChart