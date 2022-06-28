import { useEffect, useState } from "react";
import APIService from "../../../../http";
import { dateToString } from "../../../../utils/utils";
import GastosPieChart from "../../../../components/gastos-pie-chart/gastos-pie-chart";
import GastosBarChart from "../../../../components/gastos-bar-chart/gastos-bar-chart";

const Gastos = () => {

    const apiService = new APIService()
    const [gastosPorCategoria, setGastosPorCategoria] = useState(null)
    const [gastosPorSubCategoria, setGastosPorSubCategoria] = useState(null)
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
            })
    }


    return (
        <div>
            <GastosPieChart chartData={gastosPorCategoria}></GastosPieChart>
            <GastosBarChart chartData={gastosPorSubCategoria}></GastosBarChart>
        </div>
    );
};

export default Gastos