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
import { IconButton, InputAdornment } from "@mui/material";
import { useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import CloseIcon from '@mui/icons-material/Close';

const CreateReceitaDialog = (props:any) => {

    const [open, setOpen] = useState(props.open);
    
    const [fonteInput, setFonteInput] = useState("")
    const [valorInput, setValorInput] = useState<any>(0)
    const [dateInput, setDateInput] = useState<any>(new Date())

    useEffect(() => {
        setOpen(props.open)
    },[props.open])

    const handleCreateReceita = () => {
        setOpen(false);
        const receita = {
            fonte:fonteInput, 
            valor:valorInput, 
            data:dateInput.toISOString().split('T')[0]}
        props.handleCreateReceita(receita)
        handleClose()
    };

    const handleClose = () => {
        props.handleClose()
        setFonteInput("")
        setDateInput(new Date())
        setValorInput(0)
        setOpen(false)
    }

    const validateForm = () => {
        return (valorInput > 0) && (fonteInput !== "") && dateInput
    }
    
    return (
        <Dialog open={open} onClose={handleClose} PaperProps={{style: {overflowY: 'visible'}}}>
            <DialogTitle>Adicionar Receita</DialogTitle>
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
                <DialogContentText> Selecione as informações da receita </DialogContentText>
                <div className="">
                    <div className="row">
                        <div className="col-4">
                            <TextField
                                autoFocus
                                value={fonteInput}
                                onChange={(event) => {
                                    setFonteInput(event.target.value)
                                }}
                                margin="dense"
                                id="fonte"
                                label="Fonte"
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
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCreateReceita} disabled={!validateForm()}>Adicionar</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CreateReceitaDialog