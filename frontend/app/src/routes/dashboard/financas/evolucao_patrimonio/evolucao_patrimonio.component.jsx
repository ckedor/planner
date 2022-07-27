import { Paper } from "@mui/material"
import EvolucaoReceitasGastosBarChart from "../../../../components/evolucao-receitas-gastos-bar-chart/evolucao-receitas-gastos-bar-chart.component"

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
        </div>
    )
}

export default EvolucaoPatrimonio