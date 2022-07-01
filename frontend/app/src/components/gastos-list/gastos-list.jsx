import { IconButton } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect } from 'react';
import { useState } from 'react';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import './gastos-list.scss'

const GastosList = ({gastosData}) => {

  const [gastos, setGastos] = useState(gastosData)

  useEffect(() => {
    setGastos(gastosData?.map((obj) => {
      return {'id': obj.id, 'descricao': obj.descricao, 'data':obj.data, 'valor':obj.valor, 'sub_categoria':obj.sub_categoria.nome, 'categoria':obj.sub_categoria.categoria.nome}
    }))
  }, [gastosData])

  const editGasto = (id) =>{
    console.log(id)
  }

  const deleteGasto = (id) =>{
    console.log("delete gasto")
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
      </div>
    )
  }
  
  return <div></div>

}

export default GastosList
