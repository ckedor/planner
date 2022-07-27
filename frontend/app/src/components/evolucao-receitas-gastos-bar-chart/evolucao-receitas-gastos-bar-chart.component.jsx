import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { numberToLocaleCurrencyString } from "../../utils/utils"

const EvolucaoReceitasGastosBarChart = ({ chartData }) => {

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([{
              name: 'Receitas',
              data: [7300, 7300, 7300, 7300, 7300, 7300, 7300, 7300, 7300]
            }, {
              name: 'Gastos',
              data: [6000, 6000, 6000, 5000, 6666, 7777, 4700, 6000, 6000]
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
                type: 'line',
                height: 350
            },
            plotOptions: {
                bar: {
                  horizontal: false,
                  columnWidth: '55%',
                  endingShape: 'rounded',
                  dataLabels: {
                    position: 'top',
                  },
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (val) => {
                  return numberToLocaleCurrencyString(val);
                },
                style: {
                  fontSize: '10px',
                  colors: ["#304758"]
                },
                offsetY: -20, 
            },
            colors: ['#26C621', '#DE1E1E'],
            xaxis: {
                categories: categories,
            },
            stroke: {
                show: true,
                width: 2,
                colors: ['transparent']
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

        })
    }

    return (
        <div>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    )
}

export default EvolucaoReceitasGastosBarChart