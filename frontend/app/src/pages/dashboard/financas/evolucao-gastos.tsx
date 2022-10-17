import { Paper } from '@mui/material';
import React from 'react';
import DashboardFinancasLayout from '../../../layouts/dashboard_layout';
import dynamic from 'next/dynamic'
import styles from './evolucao-gastos.module.scss'
import APIService from '../../../services/api';
import { dateToString } from '../../../util/utils';

const EvolucaoReceitasGastosBarChart = dynamic(
  () => import('../../../components/financas/evolucao-gastos/evolucao-receitas-gastos-bar-chart/evolucao-receitas-gastos-bar-chart.component'),
  { ssr: false }
)
const EvolucaoGastosCategoriaBarChart = dynamic(
  () => import('../../../components/financas/evolucao-gastos/evolucao-gastos-categoria-bar-chart/evolucao-gastos-categoria-bar-chart.component'),
  { ssr: false }
)

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

const EvolucaoGastos = ({gastos_por_subcategoria, categorias}:{gastos_por_subcategoria:GastoPorSubcategoriaMes[], categorias:Categoria[]}) => {

    return (
        <>
        <DashboardFinancasLayout>
            <div className="container-xl">
                <div className={"row " + styles.evolucao_receitas_gastos}>
                    <div className="col-12">
                        <Paper>
                            <EvolucaoReceitasGastosBarChart />
                        </Paper>
                    </div>
                </div>
                <div className={"row " + styles.evolucao_receitas_gastos}>
                    <div className="col-12">
                        <Paper>
                            <EvolucaoGastosCategoriaBarChart 
                                gastos_por_subcategoria={gastos_por_subcategoria}
                                categorias={categorias}/>
                        </Paper>
                    </div>
                </div>
            </div>
        </DashboardFinancasLayout>
        </>
    );
};

export default EvolucaoGastos

export async function getServerSideProps(context:any) {
    
    const RANGE_MONTHS = 12
    const apiService = new APIService(context.req)

    const { data, message, status} = await apiService.get("financas/gastos/por_categoria_month_range",
                                                            {current_month: dateToString(new Date(), "MM/YYYY"), 
                                                                range: RANGE_MONTHS })
    const categorias = await apiService.get("financas/categorias_gasto/")
    console.log(data)
    return {
        props: {
            gastos_por_subcategoria: data.gastos_por_subcategoria,
            categorias: categorias.data.results
        }, 
    }
}