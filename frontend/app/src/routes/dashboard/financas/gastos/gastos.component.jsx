import { useEffect, useState } from "react";
import APIService from "../../../../http";

const Gastos = () => {

    const apiService = new APIService()
    const [gastos, setGastos] = useState(null)

    useEffect(() => {
        apiService.get("financas/gastos")
            .then(response => {
                if (response.status === 200) {
                    return response.data
                }
                alert("Erro ao pegar gastos")
            })
            .then(data => {
                setGastos(data.results)
            })
    }, []) // eslint-disable-line

    return (
        <div>
            {gastos?.map((gasto) =>{
                return <div key={gasto.id}>{gasto.descricao}</div> 
            })}
        </div>
    );
};

export default Gastos