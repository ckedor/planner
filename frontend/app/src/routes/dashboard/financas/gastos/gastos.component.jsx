import { useEffect, useState } from "react";
import APIService from "../../../../http";
import { dateToString } from "../../../../utils/utils";
import GastosPieChart from "../../../../components/gastos-pie-chart/gastos-pie-chart";
import GastosBarChart from "../../../../components/gastos-bar-chart/gastos-bar-chart";
import GastosList from "../../../../components/gastos-list/gastos-list";
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Paper, Skeleton, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import CreateReceitaDialog from "../../../../components/create-receita-dialog/create-receita-dialog.component";
import './gastos.scss'


const Gastos = () => {

    const apiService = new APIService()
    const [gastosData, setGastosData] = useState(null)
    const [selectedMonth, setSelectedMonth ] = useState(new Date())
    const [openCreateReceitaDialog, setOpenCreateReceitaDialog] = useState(false)
    const [receitasData, setReceitasData] = useState(null)
    const [gastosIsLoading, setGastosIsLoading] = useState(true)
    const [receitasIsLoading, setReceitasIsLoading] = useState(true)

    useEffect(() => {
        setReceitasIsLoading(true)
        setGastosIsLoading(true)
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
                setGastosIsLoading(false)
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
                setReceitasData(returnData.results)
                setReceitasIsLoading(false)
            }
        )
    }

    const createReceita = (receita) =>{
    apiService.post("financas/receitas/", receita)
        .then(response => {
            if (response.status === 201) {
                return response.data
            }
            alert("Erro ao criar receita")
        })
        .then(returnData => {
            getReceitasData()
        })
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
                <div className="col-8"></div>
                <div className="col-2 adicionar-receita-button">
                    <Button
                        variant="contained"
                        elevation={2}
                        sx={{ color: '#0075BD', backgroundColor: 'white', paddingTop: '10px', boxShadow: 1, "&:hover": {backgroundColor:'white', fontWeight: 'bold'}}}
                        onClick={event => setOpenCreateReceitaDialog(true)}>Adicionar Receita
                    </Button>
                </div>
            </div>
            <div className="row gastos-container">
                <div className="col-lg-6 col-md-6 col-sm-12 gastos-charts-wrapper">
                    <div className="row">
                        <div className="col-12">
                            {gastosIsLoading ? (
                                <Skeleton variant="rect" height={330}></Skeleton>
                            ): (
                                <Paper>
                                    <GastosPieChart 
                                        chartData={ gastosData?.gastos_por_categoria } 
                                        receitas={ receitasData }>
                                    </GastosPieChart>
                                </Paper>
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="gastos-barchart-wrapper col-12">
                            {gastosIsLoading ? (
                                <Skeleton variant="rect" height={400}></Skeleton>
                            ): (
                                <Paper>
                                    <GastosBarChart chartData={gastosData?.gastos_por_subcategoria}></GastosBarChart>
                                </Paper>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    {gastosIsLoading ? (
                        <Skeleton variant="rect" height={760}></Skeleton>
                    ): (
                        <Paper className="gastos-list-wrapper">
                            <GastosList gastosData={gastosData?.gastos} handleGastosAPIUpdate={getGastosPorCategoriaMonth}></GastosList>
                        </Paper>
                    )}
                   
                </div>
            </div>
            <CreateReceitaDialog
                open={openCreateReceitaDialog} 
                handleClose={()=>{
                    setOpenCreateReceitaDialog(false)}
                }
                handleCreateReceita={ (receita) => {
                    getGastosPorCategoriaMonth()
                    createReceita(receita)
                    }
                } 
            />
        </div>
    );
};

export default Gastos