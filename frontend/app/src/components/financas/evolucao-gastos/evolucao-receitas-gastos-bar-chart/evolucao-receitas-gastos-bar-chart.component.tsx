import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import APIService from "../../../../services/api"
import { dateToString, numberToLocaleCurrencyString, stringToDate } from "../../../../util/utils"
import styles from './evolucao-receitas-gastos-bar-chart.module.scss'

const EvolucaoReceitasGastosBarChart = () => {

    const RANGE_MONTHS = 12
    const [chartData, setChartData] = useState<any>(null)

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState<any[]>([])

    useEffect(() =>{
        getChartData()
    }, []); //eslint-disable-line

    useEffect(() =>{
        mountChart()
    }, [chartData]); //eslint-disable-line
    
    const getChartData = async () => {
        const apiService = new APIService()
        let { data, message, status} = await apiService.get("financas/gastos_receitas/", 
                { current_month: dateToString(new Date(), "MM/YYYY"), 
                  range: RANGE_MONTHS })
        setChartData(data)
    }
    
    const getMonthsFromAPIData = (data:any) =>{
        let months = data.months.map((dateStr:any) => {
            let date = stringToDate(dateStr, "YYYY-MM-DD")
            if (date)
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
                formatter: (val:any) => {
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
                min: -6500,
                max: 19000,
                title: {
                  text: 'R$'
                }
            },
            fill: {
                opacity: 1,
            },
            tooltip: {
                y: {
                    formatter: (val:any) => {
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
        <div className={styles.evolucao_receitas_chart_container}>
            <ReactApexChart options={options} series={series} type="line" height={350} />
        </div>
    )
}

export default EvolucaoReceitasGastosBarChart