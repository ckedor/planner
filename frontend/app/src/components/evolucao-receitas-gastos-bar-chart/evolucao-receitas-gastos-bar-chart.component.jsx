import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import APIService from "../../http"
import { dateToString, numberToLocaleCurrencyString } from "../../utils/utils"
import './evolucao-receitas-gastos-bar-chart.scss'

const EvolucaoReceitasGastosBarChart = () => {

    const apiService = new APIService()
    const [gastosData, setGastosData] = useState({})
    const [receitasData, setReceitasData] = useState({})
    

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([{
                name: 'Receitas',
                type: 'column',
                data: [7300, 7300, 7300, 7300, 7300, 7300, 7300, 7300, 7300]
            }, {
                name: 'Gastos',
                type: 'column',
                data: [6000, 6000, 6000, 5000, 6666, 7777, 4700, 6000, 6000]
            }, {
                name: 'Lucro',
                type: 'line',
                data: [1300, 1300, 1300, 2300, 600, -200, 2000, 1300, 1300]
            }
        ])

    useEffect( () =>{
        mountChart();
    }, []); //eslint-disable-line

    const getGastos = () => {
        apiService.get("financas/gastos/por_mes", { month: dateToString(new Date(), "MM/YYYY") })
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                alert("Erro ao pegar gastos")
            })
            .then(returnData => {
                console.log(returnData)
            }
        )
    }

    const getReceitasData = () => {
        apiService.get("financas/receitas/por_mes", { month: dateToString(new Date(), "MM/YYYY") })
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                alert("Erro ao pegar receitas")
            })
            .then(returnData => {
                console.log(returnData)
            }
        )
    }

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
            title: {
                text: 'Evolução Receitas/Gastos',
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
                    fontSize: '12px',
                    colors: ["#304758"]
                },
                offsetY: -5, 
                enabledOnSeries: [2]
            },
            colors: ['#A6DA7E', '#DA7E7E', '#000000'],
            xaxis: {
                categories: categories,
            },
            stroke: {
                show: true,
                width: [0, 0, 2],
                colors: ['transparent', 'transparent', '#454545']
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
            },

        })
    }

    return (
        <div className="evolucao-receitas-chart-container">
            <ReactApexChart options={options} series={series} type="line" height={350} />
        </div>
    )
}

export default EvolucaoReceitasGastosBarChart