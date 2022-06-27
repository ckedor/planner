import { useEffect, useState } from "react";
import APIService from "../../../../http";
import { dateToString } from "../../../../utils/utils";
import GastosPieChart from "../../../../components/gastos-pie-chart/gastos-pie-chart";

const Gastos = () => {

    const apiService = new APIService()
    const [gastosPorCategoria, setGastosPorCategoria] = useState(null)
    const [selectedMonth, setSelectedMonth ] = useState(dateToString(new Date(), "MM/YYYY"))

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
            })
    }

    useEffect(() => {
        getGastosPorCategoriaMonth()
    }, []) // eslint-disable-line

    return (
        <div>
            <GastosPieChart chartData={gastosPorCategoria}></GastosPieChart>
        </div>
    );
};

export default Gastos