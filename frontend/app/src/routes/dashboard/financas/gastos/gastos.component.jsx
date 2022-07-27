import { useEffect, useState } from "react";
import APIService from "../../../../http";
import { dateToString } from "../../../../utils/utils";
import GastosPieChart from "../../../../components/gastos-pie-chart/gastos-pie-chart";
import GastosBarChart from "../../../../components/gastos-bar-chart/gastos-bar-chart";
import GastosList from "../../../../components/gastos-list/gastos-list";
import './gastos.scss'
import { DatePicker } from '@mui/x-date-pickers';
import { Paper, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


const Gastos = () => {

    const apiService = new APIService()
    const [gastosData, setGastosData] = useState(null)
    const [selectedMonth, setSelectedMonth ] = useState(new Date())
    const [receitasData, setReceitasData] = useState(null)

    useEffect(() => {
        getGastosPorCategoriaMonth()
        getReceitasData()
    }, [selectedMonth]) // eslint-disable-line

    const getGastosPorCategoriaMonth = () => {
        apiService.get("financas/gastos/por_categoria", { month: dateToString(selectedMonth, "MM/YYYY") })
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                alert("Erro ao pegar gastos")
            })
            .then(returnData => {
                setGastosData(returnData)
            }
        )
    }

    const getReceitasData = () => {
        apiService.get("financas/receitas", { month: dateToString(selectedMonth, "MM/YYYY") })
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                alert("Erro ao pegar receitas")
            })
            .then(returnData => {
                setReceitasData(returnData)
            }
        )
    }

    return (
        <div className="container-xl">
            <div className="row gastos-month-select">
                <div className="col-2">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            views={['year', 'month']}
                            label="Mês Selecionado"
                            minDate={new Date('2012-03-01')}
                            inputFormat="MM/yyyy"
                            value={selectedMonth}
                            onChange={(event) => {setSelectedMonth(event)}}
                            renderInput={(params) => <TextField {...params} helperText={null} />}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="row gastos-container">
                <div className="col-lg-6 col-md-6 col-sm-12 gastos-charts-wrapper">
                    <div className="row">
                        <div className="col-12">
                            <Paper>
                                <GastosPieChart chartData={gastosData?.gastos_por_categoria}></GastosPieChart>
                            </Paper>
                        </div>
                    </div>
                    <div className="row">
                        <div className="gastos-barchart-wrapper col-12">
                            <Paper>
                                <GastosBarChart chartData={gastosData?.gastos_por_subcategoria}></GastosBarChart>
                            </Paper>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <GastosList gastosData={gastosData?.gastos} handleGastosAPIUpdate={getGastosPorCategoriaMonth}></GastosList>
                </div>
            </div>
        </div>
    );
};

export default Gastos