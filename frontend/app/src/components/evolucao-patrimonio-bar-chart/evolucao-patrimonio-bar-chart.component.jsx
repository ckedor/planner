import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { numberToLocaleCurrencyString, numberToLocaleString } from "../../utils/utils"
import './evolucao-patrimonio-bar-chart.scss'

const EvolucaoPatrimonioBarChart = ({ chartData }) => {

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([{
                name: 'Patrimônio Anterior',
                data: [20000, 22000, 23800, 25800, 28100, 30400, 32700, 35000, 37300]
            }, {
                name: 'Investimentos',
                data: [2000, 1800, 2500, 2300, 2300, 2300, 2300, 2300, 2300]
            }, {
                name: 'Rendimentos',
                data: [200, 300, 300, 313, 400, 420, 450, 500, 800]
            },
            {
                name: 'Resgates',
                data: [0, 0, 0, 0, 0, 0, 0, -2000, 0]
            }
        ])
        
    useEffect( () =>{
        mountChart();
    }, [chartData]); //eslint-disable-line
    
    const mountChart = () => {
        // if (!chartData){
            //     return
            // }
            const categories = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set']
            
            setOptions({
                chart: {
                    type: 'bar',
                    height: 350,
                    stacked: true,
                },
                title: {
                    text: 'Evolução Patrimônio',
                    style: {
                        fontSize:  '20px',
                        fontWeight:  'bold',
                        color:  '#263238'
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded',
                    },
                },
                dataLabels: {
                    enabled: true,
                    formatter: (val) => {
                        return numberToLocaleString(val);
                    },
                    enabledOnSeries: [0]
                },
                colors: ['#6883C6', '#CCCCFF', '#69C666', '#DA7E7E'],
                xaxis: {
                    categories: categories,
                },
                stroke: {
                    show: true,
                    width: [0, 0, 1, 0],
                    colors: ['transparent', 'transparent', '#08FF00']
                },
                yaxis: {
                    title: {
                        text: 'R$'
                    }
                },
                fill: {
                    opacity: 1,
                },
                tooltip: {
                    y: {
                        formatter: (val) => {
                            return numberToLocaleCurrencyString(val)
                        }
                    }
                },
                legend: {
                    position: 'right',
                    offsetY: 40
                },}
            )
    }

    return (
        <div className="evolucao-patrimonio-chart-container">
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    )
}

export default EvolucaoPatrimonioBarChart