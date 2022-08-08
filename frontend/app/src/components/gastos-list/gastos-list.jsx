import { Button, IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { Fragment, useEffect, useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './gastos-list.scss'
import APIService from '../../http';
import CreateGastoDialog from './create-gasto-dialog/create-gasto-dialog.component'
import UpdateGastoDialog from './update-gasto-dialog/update-gasto-dialog.component'
import { dateToString, stringToDate } from '../../utils/utils';


const GastosList = ({gastosData, handleGastosAPIUpdate}) => {

  const apiService = new APIService()
  const [gastos, setGastos] = useState(gastosData)
  const [categorias, setCategorias] = useState(null)
  const [openCreateGastoDialog, setOpenCreateGastoDialog] = useState(false)
  const [openUpdateGastoDialog, setOpenUpdateGastoDialog] = useState(false)
  const [selectedGasto, setSelectedGasto] = useState({valor:0, descricao:"", data: new Date(), sub_categoria: {id:-1, label:""},  categoria: {id:-1, label:""}})
  const [loading, setLoading] = useState(true)

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
    setLoading(true)
    getCategorias()
  }, [])  // eslint-disable-line react-hooks/exhaustive-deps

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
          setLoading(false)
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
          handleGastosAPIUpdate()
      })
  }

  const updateGasto = (gasto) => {
    let gastoJSON = {descricao: gasto.descricao, data: gasto.data.toISOString().split('T')[0], valor: gasto.valor, sub_categoria:gasto.sub_categoria.id}

    apiService.put("financas/gastos/" + gasto.id + "/", gastoJSON)
      .then(response => {
        if (response.status === 200){
          return response.data
        }
        alert("Erro ao editar gasto")
      })
      .then(returnData => {
        handleGastosAPIUpdate()
      })
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
          handleGastosAPIUpdate()
      })
  }

  const columns = [
    { field: 'descricao', headerName: 'Descrição', width: 100 },
    { field: 'data',
      headerName: 'Data',
      width: 96,
      valueGetter: (params) =>{
        const date = stringToDate(params.value, "YYYY-MM-DD")
        return dateToString(date, "DD/MM/YYYY")
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
        return (<IconButton onClick={() => {
                    const row = {}
                    Object.assign(row, params.row)
                    setOpenUpdateGastoDialog(true);
                    setSelectedGasto(row); }}> 
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
      <Fragment>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flexGrow: 1 }}>
            <DataGrid
              rows={gastos}
              columns={columns}
              pageSize={11}
              rowsPerPageOptions={[11]}
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
            <Button 
              variant="contained"
              elevation={2}
              sx={{ color: '#0075BD', backgroundColor: 'white', paddingTop: '10px', boxShadow: 0, "&:hover": {backgroundColor:'white',  boxShadow: 0, color: '#005990', fontWeight: 'bold'}}}
              style={{ position: 'relative', left: '10px', top: '-43px' }} 
              onClick={event => setOpenCreateGastoDialog(true)}>
                Adicionar Gasto
            </Button>
          </div>
        </div>
        <div>
          { loading ? (
            <div></div>
          ) : (
            <div>
              <CreateGastoDialog 
                open={openCreateGastoDialog} 
                handleClose={()=>{
                  setOpenCreateGastoDialog(false)}
                }
                handleCreateGasto={createGasto} 
                categorias={categorias}
              />
              <UpdateGastoDialog
                open={openUpdateGastoDialog}
                handleClose={()=>{
                  setOpenUpdateGastoDialog(false)
                }}
                handleUpdateGasto={updateGasto}
                categorias={categorias}
                selectedGasto={selectedGasto}
              />
            </div>
          )}
        </div>
        
      </Fragment>
    )
  }
  
  return <div></div>

}

export default GastosList
