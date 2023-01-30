import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Morador } from '../../../types/financas';
import APIService from '../../../services/api';
import { dateToString } from '../../../util/utils';

const ContaExtraDialogForm = (props:any) => {
    
    const [open, setOpen] = useState(props.open)
    const [moradoresOptions, setMoradoresOptions] = useState(props.moradoresOptions)
    const [id, setID] = useState(props.contaExtra?.id)
    const [data, setData] = useState(props.contaExtra?.data)
    const [dono, setDono] = useState(props.contaExtra?.dono)
    const [valor, setValor] = useState(props.contaExtra?.valor)
    const [descricao, setDescricao] = useState(props.contaExtra?.descricao)

    useEffect( () => {
        setMoradoresOptions(props.moradoresOptions)
    },[props.moradoresOptions])

    useEffect(() => {
        setOpen(props.open)
        
        if (props.contaExtra){
            setID(props.contaExtra.id)
            setData(props.contaExtra.data)
            setDono(props.contaExtra.dono)
            setValor(props.contaExtra.valor)
            setDescricao(props.contaExtra.descricao)
        }
        if (props.create){
            setID(-1)
            setData(dateToString(new Date(), "YYYY-MM-DD"))
            setDono(null)
            setValor('')
            setDescricao('')
        }
    },[props.open, props.contaExtra])

    const handleClose = () => {
        setOpen(false)
        props.handleClose()
    }

    async function handleSubmit(event:any) {
        const apiService = new APIService()
        const formValues:any = {
            data:data,
            dono: dono.id,
            valor: valor,
            descricao: descricao,
        }
        
        if (props.create){
            const response = await apiService.post(`contas_casa/conta_extra/`, formValues)
        } else {
            const response = await apiService.put(`contas_casa/conta_extra/${id}/`, formValues)
        }

        await handleClose()
        props.updateData()
    }

    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{style: {overflowY: 'visible', minWidth:'400px'}}}>
            <DialogTitle>Conta Extra</DialogTitle>
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
            <Grid container spacing={3} pr={3} pl={3} pb={2}>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        value={descricao}
                        onChange={(event) => {
                            setDescricao(event.target.value)
                        }}
                        margin="dense"
                        id="descricao"
                        label="Descrição"
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        autoFocus
                        value={valor}
                        onChange={(event) => {
                            setValor(event.target.value)
                        }}
                        margin="dense"
                        label="Valor"
                        variant="outlined"
                        type="number"
                    />
                </Grid>
                <Grid item xs={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Data"
                            inputFormat="MM/dd/yyyy"
                            value={data}
                            onChange={(event) => {
                                setData(event)}
                            }
                            renderInput={(params) => <TextField {...params} />}
                            />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel>Morador</InputLabel>
                        <Select
                            size='small'
                            value={dono?.id}
                            label="Morador"
                            onChange={(event)=>{
                                const morador = moradoresOptions.filter((obj:any)=>{
                                  return obj.id == event.target.value 
                                })[0]
                                setDono(morador)
                            }}
                        >
                            {moradoresOptions.map((morador:Morador)=>{
                                return <MenuItem value={morador.id}>{morador.nome}</MenuItem>
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSubmit}>Criar/Editar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ContaExtraDialogForm;