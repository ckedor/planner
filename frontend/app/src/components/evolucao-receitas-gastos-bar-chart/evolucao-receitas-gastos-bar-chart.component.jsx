import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import APIService from "../../http"
import { dateToString, numberToLocaleCurrencyString, sortArrayOfDates, stringToDate } from "../../utils/utils"
import './evolucao-receitas-gastos-bar-chart.scss'

const EvolucaoReceitasGastosBarChart = () => {

    const RANGE_MONTHS = 12

    const apiService = new APIService()
    const [chartData, setChartData] = useState(null)
    const [loading, setLoading] = useState(false)

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])

    useEffect(() =>{
        setLoading(true)
        getChartData()
    }, []); //eslint-disable-line

    useEffect(() =>{
        mountChart()
    }, [chartData]); //eslint-disable-line
    
    const getChartData = async () => {
        try {
            let gastosResponse = await apiService.get("financas/gastos_receitas/", { current_month: dateToString(new Date(), "MM/YYYY"), range: RANGE_MONTHS })
            setChartData(gastosResponse.data)
        } catch (err) {
            alert("Erro ao buscar dados na API")
        }
        setLoading(false)
    }
    
    const getMonthsFromAPIData = (data) =>{
        let months = data.months.map((dateStr) => {
            let date = stringToDate(dateStr, "YYYY-MM-DD")
            return dateToString(date, "monthShortName")
        })
        return months
    }

    const mountChart = () => {
        if (!chartData){
            return
        }
        const categories = getMonthsFromAPIData(chartData)
        setSeries([{
                name: 'Receitas',
                type: 'column',
                data: chartData.receitas
            }, {
                name: 'Gastos',
                type: 'column',
                data: chartData.gastos
            }, {
                name: 'Lucro',
                type: 'line',
                data: chartData.lucros
            }
        ])

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