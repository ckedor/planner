
import { useEffect, useState } from 'react';
import { HorizontalGridLines, LineSeries, VerticalGridLines, XAxis, XYPlot, YAxis } from 'react-vis';
import { sort, sortMultiple } from '../../utils/utils';
import './gastos-pie-chart.scss'

const GastosPieChart = ({gastos}) => {

    // const [seriesArray, setSeriesArray] = useState(null)
    // const [labelsArray, setLabelsArray] = useState(null)
    // const [options, setOptions ] = useState(null)



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

    const data = [
    {x: 0, y: 8},
    {x: 1, y: 5},
    {x: 2, y: 4},
    {x: 3, y: 9},
    {x: 4, y: 1},
    {x: 5, y: 7},
    {x: 6, y: 6},
    {x: 7, y: 3},
    {x: 8, y: 2},
    {x: 9, y: 0}
    ];
    return (
        <div>
            <XYPlot height={300} width= {300}>
                <VerticalGridLines />
                <HorizontalGridLines />
                <XAxis />
                <YAxis />
                <LineSeries data={data} />
            </XYPlot>
        </div>
    )
}

export default GastosPieChart