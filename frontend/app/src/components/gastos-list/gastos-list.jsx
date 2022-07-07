import { Button, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './gastos-list.scss'
import APIService from '../../http';
import CreateGastoDialog from './create-gasto-dialog/create-gasto-dialog.component'

const GastosList = ({gastosData}) => {

  const apiService = new APIService()
  const [gastos, setGastos] = useState(gastosData)
  const [categorias, setCategorias] = useState(null)
  const [openCreateGastoDialog, setOpenCreateGastoDialog] = useState(false)

  useEffect(() => {
    setGastos(gastosData?.map((obj) => {
      return {
        'id': obj.id, 
        'descricao': obj.descricao,
        'data':obj.data, 
        'valor':obj.valor, 
        'sub_categoria':obj.sub_categoria.nome, 
        'categoria':obj.sub_categoria.categoria.nome}
    }))
  }, [gastosData])

  useEffect(() => {
    getCategorias()
  }, [])

  const getCategorias = () => {
    apiService.get("financas/categorias_gasto/")
      .then(response => {
          if (response.status === 200) {
              return response.data
          }
          alert("Erro ao pegar gastos")
      })
      .then(returnData => {
          setCategorias(returnData.results)
          console.log(returnData.results)
      })
  }

  const createGasto = (gasto) =>{
    apiService.post("financas/gastos/", gasto)
      .then(response => {
          if (response.status === 201) {
            return response.data
          }
          alert("Erro ao criar gasto")
      })
      .then(returnData => {
        // Implementar Atualização de toda a página
      })
  }

  const editGasto = (id) =>{
    
  }

  const deleteGasto = (id) =>{
    apiService.delete("financas/gastos/" + id)
      .then(response => {
          if (response.status === 204) {
            return response.data
          }
          alert("Erro ao deletar gastos")
      })
      .then(returnData => {
          // Implementar Atualização de toda a página
      })
  }

  const columns = [
    { field: 'descricao', headerName: 'Descrição', width: 100 },
    { field: 'data',
      headerName: 'Data',
      width: 96,
      valueGetter: (params) =>{
        const date = new Date(params.value)
        return date.toLocaleString().slice(0, 10)
      }
    },
    { field: 'valor',
      headerName: 'Valor (R$)',
      type: 'number', 
      width: 85, 
      valueGetter: (params) =>{
        return parseFloat(params.value).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }},
    { field: 'categoria', headerName: 'Categoria', width: 120 },
    { field: 'sub_categoria', headerName: 'Sub-Categoria', width: 110, headerClassName: 'hideLastcolumnSeparator'},
    { field: 'edit',
      headerName: '',
      headerClassName: 'hideLastcolumnSeparator',
      width: 20, 
      renderCell: (params) =>{
        return (<IconButton onClick={event => editGasto(params.row.id)}> 
                  <EditIcon />
                </IconButton>)
      },  
    },
    { 
      field: 'delete',
      headerName: '',
      headerClassName: 'hideLastcolumnSeparator', 
      width: 20, 
      renderCell: (params) =>{
        return (<IconButton onClick={event => deleteGasto(params.row.id)}> 
                  <DeleteForeverIcon />
                </IconButton>)
      },  
    }
  ];

  if (gastos) {

    return (
      <div style={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={gastos}
          columns={columns}
          pageSize={20}
          components={
            { Toolbar: GridToolbar }
          }
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          disableDensitySelector
          disableColumnFilter
          disableColumnSelector
        />
        <Button onClick={event => setOpenCreateGastoDialog(true)}>Adicionar Gasto</Button>
        <CreateGastoDialog 
          open={openCreateGastoDialog} 
          handleClose={()=>{
            setOpenCreateGastoDialog(false)}
          }
          handleCreateGasto={createGasto} 
          categorias={categorias}
        />
      </div>
    )
  }
  
  return <div></div>

}

export default GastosList
