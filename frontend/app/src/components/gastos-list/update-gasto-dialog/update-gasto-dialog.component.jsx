import { useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Autocomplete, IconButton, InputAdornment } from "@mui/material";
import { useEffect } from "react";
// import './update-gasto-dialog.scss'
import { LocalizationProvider } from "@mui/x-date-pickers";
import CloseIcon from '@mui/icons-material/Close';

const UpdateGastoDialog = (props) => {
    const [open, setOpen] = useState(props.open);
    const [selectedGasto, setSelectedGasto] = useState({valor:0, descricao:"", data: new Date(), sub_categoria: {id:-1, label:""},  categoria: {id:-1, label:""}})
    const [categoriasOptions, setCategoriasOptions] = useState([]);
    const [subCategoriasOptions, setSubCategoriasOptions] = useState([])

    useEffect( () => {
        setCategoriasOptions(props.categorias.map((obj) => {
            return {id:obj.id, label:obj.nome}
        }))
    },[])

    useEffect(() => {
        let selectedGasto = props.selectedGasto
        if (categoriasOptions.length > 0 && selectedGasto.descricao !== ""){
            selectedGasto.categoria = categoriasOptions.filter((obj) => {
                return obj.label === selectedGasto.categoria
            })[0]

            let categoria = props.categorias.filter((obj) => {
                return obj.id === selectedGasto.categoria.id
            })
            let subCategorias = categoria[0].sub_categorias
            
            let aux = subCategorias.map((obj)=>{
                return {id: obj.id, label: obj.nome}
            })
            setSubCategoriasOptions(aux)
            selectedGasto.sub_categoria = aux.filter((obj) => {
                return obj.label === selectedGasto.sub_categoria
            })[0]

            selectedGasto.data = new Date(selectedGasto.data)
            
        }
        setSelectedGasto(selectedGasto)

    },[props.selectedGasto])

    useEffect(() => {
        setOpen(props.open)
    }, [props.open])

    const changeCategoria = (newValue) => {
        if (!newValue){
            setSelectedGasto(prevState => ({
                    ...prevState,
                    categoria: null,
                    sub_categoria: null, 
                }));
            return
        }
        let categoria = props.categorias.filter((obj) => {
            return obj.id === newValue.id
        })[0]
        let subCategorias = categoria.sub_categorias
        setSubCategoriasOptions(subCategorias.map((obj)=>{
            return {id: obj.id, label: obj.nome}
        }))
        setSelectedGasto(prevState => ({
            ...prevState,
            categoria: {id: categoria.id, label: categoria.nome},
            sub_categoria: null,
        }));
    }

    const handleUpdateGasto = () => {
        setOpen(false);
        props.handleUpdateGasto(selectedGasto)
        handleClose()
    };

    const handleClose = () => {
        setOpen(false)
        props.handleClose()
    }

    const validateForm = () => {
        return (selectedGasto.valor > 0) && (selectedGasto.descricao != "") && selectedGasto.sub_categoria
    }

    if (categoriasOptions){
        return (
            <Dialog open={open} onClose={handleClose} PaperProps={{style: {overflowY: 'visible'}}}>
                <DialogTitle>Adicionar Gasto</DialogTitle>
                <DialogContent>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                        >
                        <CloseIcon />
                    </IconButton>
                    <DialogContentText> Selecione as informações do gasto </DialogContentText>
                    <div className="create-gasto-dialog-form">
                        <div className="row">
                            <div className="col-4">
                                <TextField
                                    autoFocus
                                    value={selectedGasto.descricao}
                                    onChange={(event) => {
                                        setSelectedGasto(prevState => ({
                                            ...prevState,
                                            descricao: event.target.value
                                        }));
                                    }}
                                    margin="dense"
                                    id="descricao"
                                    label="Descrição"
                                    variant="standard"
                                    />
                            </div>
                            <div className="col-4">
                                <TextField
                                    autoFocus
                                    value={selectedGasto.valor}
                                    onChange={(event) => {
                                        setSelectedGasto(prevState => ({
                                            ...prevState,
                                            valor: event.target.value
                                        }));
                                    }}
                                    margin="dense"
                                    id="valor"
                                    label="Valor"
                                    type="number"
                                    variant="standard"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                    }}
                                />
                            </div>
                            <div className="col-4">
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Data"
                                    inputFormat="MM/dd/yyyy"
                                    value={selectedGasto.data}
                                    onChange={(event) => {
                                        setSelectedGasto(prevState => ({
                                            ...prevState,
                                            data: event
                                        }));}
                                    }
                                    renderInput={(params) => <TextField {...params} />}
                                    />
                            </LocalizationProvider>
                            </div>
                        </div>
                        {/* Categoria */}
                        <div className="row">
                            <div className="col-6">
                                <Autocomplete
                                    value={selectedGasto.categoria}
                                    onChange={(event, newValue) => {
                                        changeCategoria(newValue)
                                    }}
                                    id="categoria"
                                    options={categoriasOptions}
                                    renderInput={(params) => {
                                        return (
                                            <TextField {...params} label="Categoria" variant="standard" />
                                        )
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <Autocomplete
                                    value={selectedGasto.sub_categoria}
                                    onChange={(event, newValue) => {
                                        setSelectedGasto(prevState => ({
                                            ...prevState,
                                            sub_categoria: newValue,
                                        }));
                                    }}
                                    id="subcategoria"
                                    options={subCategoriasOptions}
                                    disabled={subCategoriasOptions.length == 0}
                                    renderInput={(params) => {
                                        return (
                                            <TextField {...params} label="SubCategoria" variant="standard" />
                                        )
                                    }}
                                />
                            </div>
                            {/* SubCategoria */}
                        </div>
                    </div>
    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleUpdateGasto} disabled={!validateForm()}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default UpdateGastoDialog