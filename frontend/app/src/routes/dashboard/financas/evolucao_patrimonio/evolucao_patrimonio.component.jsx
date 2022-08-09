import { Paper } from "@mui/material"
import EvolucaoPatrimonioBarChart from "../../../../components/evolucao-patrimonio-bar-chart/evolucao-patrimonio-bar-chart.component"
import EvolucaoReceitasGastosBarChart from "../../../../components/evolucao-receitas-gastos-bar-chart/evolucao-receitas-gastos-bar-chart.component"
import './evolucao-patrimonio.scss'

const EvolucaoPatrimonio = () => {
    return (
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
    )
}

export default EvolucaoPatrimonio