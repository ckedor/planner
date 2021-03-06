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
import './create-gasto-dialog.scss'
import { LocalizationProvider } from "@mui/x-date-pickers";
import CloseIcon from '@mui/icons-material/Close';

const CreateGastoDialog = (props) => {

    const [open, setOpen] = useState(props.open);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [selectedSubCategoria, setSelectedSubCategoria] = useState(null);
    const [descricaoInput, setDescricaoInput] = useState("")
    const [valorInput, setValorInput] = useState(0)
    const [dateInput, setDateInput] = useState(new Date())
    const [categoriasOptions, setCategoriasOptions] = useState([]);
    const [subCategoriasOptions, setSubCategoriasOptions] = useState([])

    useEffect( () => {
        setCategoriasOptions(props.categorias.map((obj) => {
            return {id:obj.id, label:obj.nome}
        }))
    },[])

    useEffect(() => {
        setOpen(props.open)
    },[props.open])

    const changeCategoria = (newValue) => {
        if (!newValue){
            setSelectedCategoria(null);
            setSelectedSubCategoria(null)
            return
        }
        let categoria = props.categorias.filter((obj) => {
            return obj.id === newValue.id
        })
        let subCategorias = categoria[0].sub_categorias
        setSubCategoriasOptions(subCategorias.map((obj)=>{
            return {id: obj.id, label: obj.nome}
        }))
        setSelectedCategoria(newValue);
        setSelectedSubCategoria(null)
    }

    const handleCreateGasto = () => {
        setOpen(false);
        const gasto = {
            descricao:descricaoInput, 
            valor:valorInput, 
            sub_categoria:selectedSubCategoria.id,
            data:dateInput.toISOString().split('T')[0]}
        props.handleCreateGasto(gasto)
        handleClose()
    };

    const handleClose = () => {
        setSelectedCategoria(null)
        setSelectedSubCategoria(null)
        setDescricaoInput("")
        setDateInput(new Date())
        setValorInput(0)
        setOpen(false)
        props.handleClose()
    }

    const validateForm = () => {
        return (valorInput > 0) && (descricaoInput != "") && selectedSubCategoria
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
                    <DialogContentText> Selecione as informa????es do gasto </DialogContentText>
                    <div className="create-gasto-dialog-form">
                        <div className="row">
                            <div className="col-4">
                                <TextField
                                    autoFocus
                                    value={descricaoInput}
                                    onChange={(event) => {
                                        setDescricaoInput(event.target.value)
                                    }}
                                    margin="dense"
                                    id="descricao"
                                    label="Descri????o"
                                    variant="standard"
                                    />
                            </div>
                            <div className="col-4">
                                <TextField
                                    autoFocus
                                    value={valorInput}
                                    onChange={(event) => {
                                        setValorInput(event.target.value)
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
                                    value={dateInput}
                                    onChange={(event) => {
                                        setDateInput(event)}
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
                                    value={selectedCategoria}
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
                                    value={selectedSubCategoria}
                                    onChange={(event, newValue) => {
                                        setSelectedSubCategoria(newValue);
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
                    <Button onClick={handleCreateGasto} disabled={!validateForm()}>Adicionar</Button>
                </DialogActions>
            </Dialog>
        )
    }

}

export default CreateGastoDialog