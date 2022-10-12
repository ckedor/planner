import { MenuItem, Select } from "@mui/material"
import { useEffect, useState } from "react"
import ReactApexChart from "react-apexcharts"
import { dateToString, stringToDate } from "../../../../util/utils"
import './evolucao-gastos-categoria-bar-chart.module.scss'

type GastoPorSubcategoriaMes = {
    subcategoria: string,
    categoria: string,
    month: string,
    gastoTotal: number,
}

type Categoria = {
    id: number,
    nome: string,
    sub_categorias: SubCategoria[]
}

type SubCategoria = {
    id: number,
    nome: string
}

const EvolucaoGastosCategoriaBarChart = ({gastos_por_subcategoria, categorias}:{gastos_por_subcategoria:GastoPorSubcategoriaMes[], categorias:Categoria[]}) => {

    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(categorias[0].nome)

    useEffect(()=>{
        mountChart()
    },[selectedCategory])

    function mountChart(){
        
        let dates:string[] = []
        let series:any = []

        const subcategorias = categorias.filter((obj)=>{
            return obj.nome === selectedCategory
        })[0].sub_categorias

        gastos_por_subcategoria.map((obj:GastoPorSubcategoriaMes) => {
            if (!dates.includes(obj.month)){
                dates.push(obj.month)
            }
        })

        subcategorias.map((obj:SubCategoria) => {
            series.push({name: obj.nome, data: []})
        })

        series.map((obj:any)=>{
            
            const name = obj.name
            dates.map((monthStr:string ) => {
                const gastosArr = gastos_por_subcategoria.filter((gastoPorSubcategoriaMes:GastoPorSubcategoriaMes) => {
                    return gastoPorSubcategoriaMes.month === monthStr && gastoPorSubcategoriaMes.subcategoria === name
                })
                if (gastosArr.length > 0){
                    obj.data.push(gastosArr[0].gastoTotal)
                } else {
                    obj.data.push(0)
                }
            })
        })

        console.log(series)
        dates = dates.map((monthStr:string ) => {
            const date = stringToDate(monthStr, "YYYY-MM-DD")
            return dateToString(date as Date, "monthShortName")
        })


        setOptions({
            chart: {
                type: 'bar',
                height: 350,
                stacked: true,
                toolbar:{
                    show: true
                },
                zoom: {
                    enabled: true,
                }
            },
            plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 10
                },
            },
            xaxis: {
                categories: dates,
            },
            legend: {
                position: 'right',
                offsetY: 40
            },
            fill: {
                opacity: 1
            },
            colors:['#7EADDA', '#6EA4D7', '#5590C8', '#3876B1', '#23619C', '#16538C', '#0A4073', '#04335F', '#012546'],
        })
        setSeries(series)
    }

    function changeCategory(category:string) {
        setSelectedCategory(category)
    }

    return (
        <div style={{padding:"10px"}}>
            <Select
                value={selectedCategory}
                label="Categoria"
                onChange={(event) => changeCategory(event.target.value)}
            >
                {categorias.map((obj)=>{
                    return <MenuItem key={obj.id} value={obj.nome}>{obj.nome}</MenuItem>
                })}
            </Select>
            <ReactApexChart options={options} series={series} type="bar" height={350} />
        </div>
    )
}

export default EvolucaoGastosCategoriaBarChart