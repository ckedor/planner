import { useEffect, useState } from "react";
import APIService from "../../../../http";
import { dateToString } from "../../../../utils/utils";
import GastosPieChart from "../../../../components/gastos-pie-chart/gastos-pie-chart";
import GastosBarChart from "../../../../components/gastos-bar-chart/gastos-bar-chart";
import GastosList from "../../../../components/gastos-list/gastos-list";

const Gastos = () => {

    const apiService = new APIService()
    const [gastosPorCategoria, setGastosPorCategoria] = useState(null)
    const [gastosPorSubCategoria, setGastosPorSubCategoria] = useState(null)
    const [gastos, setGastos] = useState(null)
    const [selectedMonth, setSelectedMonth ] = useState(dateToString(new Date(), "MM/YYYY"))

    useEffect(() => {
        getGastosPorCategoriaMonth()
    }, []) // eslint-disable-line

    const getGastosPorCategoriaMonth = () => {
        apiService.get("financas/gastos/por_categoria", { month: selectedMonth })
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                alert("Erro ao pegar gastos")
            })
            .then(returnData => {
                setGastosPorCategoria(returnData.gastos_por_categoria)
                setGastosPorSubCategoria(returnData.gastos_por_subcategoria)
                setGastos(returnData.gastos)
            })
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <GastosList rows={gastos}></GastosList>
                </div>
                <div className="col-6">
                    <GastosPieChart chartData={gastosPorCategoria}></GastosPieChart>
                    <GastosBarChart chartData={gastosPorSubCategoria}></GastosBarChart>
                </div>
            </div>
        </div>
    );
};

export default Gastos