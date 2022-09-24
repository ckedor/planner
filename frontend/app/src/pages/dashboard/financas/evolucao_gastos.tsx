import { Paper } from '@mui/material';
import React from 'react';
import DashboardFinancasLayout from '../../../layouts/dashboard_layout';
import dynamic from 'next/dynamic'

const EvolucaoReceitasGastosBarChart = dynamic(
  () => import('../../../components/financas/evolucao-gastos/evolucao-receitas-gastos-bar-chart/evolucao-receitas-gastos-bar-chart.component'),
  { ssr: false }
)

const EvolucaoGastos = () => {

    return (
        <>
        <DashboardFinancasLayout>
            <div className="container-xl">
                <div className="row evolucao-receitas-gastos">
                    <div className="col-12">
                        <Paper>
                            <EvolucaoReceitasGastosBarChart />
                        </Paper>
                    </div>
                </div>
                {/* <div className="row evolucao-patrimonio">
                    <div className="col-12">
                        <Paper>
                            <EvolucaoPatrimonioBarChart />
                        </Paper>
                    </div>
                </div> */}
            </div>
        </DashboardFinancasLayout>
        </>
    );
};

export default EvolucaoGastos