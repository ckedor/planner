
import { Button } from 'bootstrap';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { RadialChart } from 'react-vis';
import { sort, sortMultiple } from '../../utils/utils';
import './gastos-pie-chart.scss'

const GastosPieChart = ({chartData}) => {
    
    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])

    useEffect( () =>{
        mountChart();
    }, [chartData]);

    const mountChart = () => {
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



    // const CATEGORIA_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    // const SUB_CATEGORIA_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // const mountChartOptions = (labels) =>{
    //     const opt = {
    //         chart: {
    //         width: 380,
    //         type: 'pie',
    //         },
    //         labels: labels,
    //           responsive: [{
    //             breakpoint: 480,
    //             options: {
    //               chart: {
    //                 width: 200
    //               },
    //               legend: {
    //                 position: 'bottom'
    //               }
    //             }
    //           }]
    //     }
    // }

    // useEffect( () => {
    //     mountCategoryChartData(gastos)
    // }, [gastos]);

    // const mountCategoryChartData = (apiData) => {
    //     let categoryData = apiData?.map( (obj) =>{
    //         return { name:obj.categoria, value: obj.total }
    //     })

    //     let aux = [] 
    //     categoryData?.reduce(function(res, val) {
    //         if (!res[val['name']]) {
    //             res[val['name']] = { name: val['name'], value: 0 };
    //             aux.push(res[val['name']])
    //         }
    //         res[val.name]['value'] += val['value'];
    //         return res;
    //     }, {});
    //     categoryData = aux?.sort(sort('name'))

    //     const series = []
    //     const labels = []
    //     categoryData?.forEach((obj) => {
    //         series.push(obj.value)
    //         labels.push(obj.name)
    //     })

    //     setSeriesArray(series)
    //     setLabelsArray(labels)
    //     mountChartOptions(labels)
    // }

    // const mountSubCategoryChartData = (apiData) => {
    //     let categoryData = apiData?.sort(sortMultiple('categoria', 'subcategoria'))
    //     categoryData = apiData?.map( (obj) =>{
    //         return { name:obj.subcategoria, value: obj.total }
    //     })

    //     console.log("mountSubCategoryChartData", categoryData)
    //     setGastoPorSubCategoriaChartData(categoryData)
    // }
    
    return (
        <div>
            <ReactApexChart options={options} series={series} type="pie" width={500}/>
        </div>
    )
}

export default GastosPieChart