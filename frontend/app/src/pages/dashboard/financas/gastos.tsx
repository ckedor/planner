import React, { useEffect, useState } from 'react';
import DashboardFinancasLayout from '../../../layouts/dashboard_layout';
import APIService from '../../../services/api';
import { dateToString } from '../../../util/utils';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Button, Paper, Skeleton, TextField } from "@mui/material";
import styles from './gastos.module.scss'

import dynamic from 'next/dynamic'

const GastosPieChart = dynamic(
  () => import('../../../components/financas/gastos/gastos-pie-chart/gastos-pie-chart.component'),
  { ssr: false }
)
const GastosBarChart = dynamic(
  () => import('../../../components/financas/gastos/gastos-bar-chart/gastos-bar-chart'),
  { ssr: false }
)

import GastosList from '../../../components/financas/gastos/gastos-list/gastos-list';
import CreateReceitaDialog from '../../../components/financas/gastos/create-receita-dialog/create-receita-dialog.component';
import MonthInput from '../../../components/common/month-input/month-input';

const Gastos = () => {

    const [gastosData, setGastosData] = useState<any>(null)
    const [selectedMonth, setSelectedMonth ] = useState(new Date())
    const [openCreateReceitaDialog, setOpenCreateReceitaDialog] = useState(false)
    const [receitasData, setReceitasData] = useState<any>(null)
    const [gastosIsLoading, setGastosIsLoading] = useState(true)

    useEffect(() => {
        setGastosIsLoading(true)
        getGastosPorCategoriaMonth()
        getReceitasData()
    }, [selectedMonth]) // eslint-disable-line

    async function getGastosPorCategoriaMonth() {
        const apiService = new APIService()
        const {data, message, status} = await apiService.get("financas/gastos/por_categoria", { month: dateToString(selectedMonth, "MM/YYYY") })
        if (status === 401){
            alert("Usuário não autorizado a acessar a API")
        } 
        setGastosData(data)
        setGastosIsLoading(false)
    }

    async function getReceitasData () {
        const apiService = new APIService()
        const {data, message, status} = await apiService.get("financas/receitas/", { month: dateToString(selectedMonth, "MM/YYYY") })
        setReceitasData(data)
    }

    async function createReceita(receita:any) {
        const apiService = new APIService()
        const {data, message, status} = await apiService.post("financas/receitas/", receita)
        getReceitasData()
    }

    function changeDate(event:any){
        setSelectedMonth(event)
    }

    return (
        <DashboardFinancasLayout> 
            <div className="container-xl">
                <div className={"row " + styles.gastos_month_select}>
                    <div className="col-2">
                        <MonthInput value={selectedMonth} onChange={(event:any) => setSelectedMonth(event)}/>
                    </div>
                    <div className="col-8"></div>
                    <div className={"col-2 " + styles.adicionar_receita_button}>
                        <Button
                            variant="contained"
                            sx={{ color: '#0075BD', backgroundColor: 'white', paddingTop: '10px', boxShadow: 1, "&:hover": {backgroundColor:'white', fontWeight: 'bold'}}}
                            onClick={event => setOpenCreateReceitaDialog(true)}>
                                Adicionar Receita
                        </Button>
                    </div>
                </div>
                <div className={"row " + styles.gastos_container}>
                    <div className="col-lg-6 col-md-6 col-sm-12 gastos_charts_wrapper">
                        <div className="row">
                            <div className="col-12">
                                {gastosIsLoading ? (
                                    <Skeleton variant="rectangular" height={330}></Skeleton>
                                ): (
                                    <Paper>
                                        <GastosPieChart 
                                            chartData={ gastosData?.gastos_por_categoria } 
                                            receitas={ receitasData } />
                                    </Paper>
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className={styles.gastos_barchart_wrapper + ' col-12'}>
                                {gastosIsLoading ? (
                                    <Skeleton variant="rectangular" height={400}></Skeleton>
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
                            <Skeleton variant="rectangular" height={760}></Skeleton>
                        ): (
                            <Paper className={styles.gastos_list_wrapper}>
                                <GastosList gastosData={gastosData?.gastos} 
                                            handleGastosAPIUpdate={getGastosPorCategoriaMonth} />
                            </Paper>
                        )}
                    
                    </div>
                </div>
                <CreateReceitaDialog
                    open={openCreateReceitaDialog} 
                    handleClose={()=>{
                        setOpenCreateReceitaDialog(false)}
                    }
                    handleCreateReceita={ (receita:any) => {
                        getGastosPorCategoriaMonth()
                        createReceita(receita)
                        }
                    } 
                />
            </div>  
        </DashboardFinancasLayout>  
    );
};

export default Gastos;