import { Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MonthInput from "../../../components/common/month-input/month-input";
import useForm from "../../../hooks/use-form/use-form.hook";
import DashboardFinancasLayout from "../../../layouts/dashboard_layout";
import APIService from "../../../services/api";
import { ContaExtra, ContasCasa, Morador } from "../../../types/financas";
import { dateToString, numberToLocaleCurrencyString, sumObjectArrayProperty } from "../../../util/utils";
import EditIcon from '@mui/icons-material/Edit';
import ContaExtraDialogForm from "../../../components/financas/contas-casa/conta-extra-dialog-form";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';

const initialFormValues:ContasCasa = {
    id: 0,
    mes: '',
    piscina: 0,
    faxineira: 0,
    internet: 0,
    guarda: 0,
    luz: 0,
    agua: 0,
    extra_iptu: 0,
    caixinha: 0,
    pago: false,
}

const ContasCasa = () => {

    const [selectedMonth, setSelectedMonth ] = useState(new Date())
    const [editContaExtraDialog, setEditContaExtraDialog] = useState(false)
    const [createContaExtraDialog, setCreateContaExtraDialog] = useState(false)
    const [contasCasa, setContasCasa] = useState<ContasCasa>(initialFormValues)
    const [contasExtra, setContasExtra] = useState<ContaExtra[]>([])
    const [moradores, setMoradores] = useState<Morador[]>([])
    const [selectedContaExtra, setSelectedContaExtra] = useState<any>(null)

    useEffect(() => {
        getContasCasa()
    }, [selectedMonth]); // eslint-disable-line

    const {handleInputChange, formValues} = useForm(contasCasa)
    
    async function getContasCasa(){
        const apiService = new APIService()
        let {data, status} = await apiService.get('/contas_casa/contas_casa', {month:dateToString(selectedMonth, 'MM/YYYY')})
        if (status !== 200){
            alert("erro")
        } else {
            if (data.length > 0)
                setContasCasa(data[0])
        }

        let response = await apiService.get('/contas_casa/conta_extra', {month:dateToString(selectedMonth, 'MM/YYYY')})
        if (response.status !== 200){
            alert("erro")
        } else {
            setContasExtra(response.data)
        }

        response = await apiService.get('/contas_casa/moradores')
        if (response.status !== 200){
            alert("erro")
        } else {
            setMoradores(response.data)
        }
    }

    function calculateTotal(){
        return (
            formValues.piscina +
            formValues.faxineira +
            formValues.internet +
            formValues.guarda +
            formValues.luz +
            formValues.agua +
            formValues.extra_iptu +
            formValues.caixinha
        )
    }

    function calculateExtras(){
        return (
            sumObjectArrayProperty(contasExtra, 'valor')
        )
    }
    
    async function saveContas(){
        const formData = formValues

        const apiService = new APIService()

        const response = apiService.put(`contas_casa/contas_casa/${contasCasa.id}/`, formData)

    }

    return (
        <DashboardFinancasLayout>
            <Grid container spacing={2} m={2}>
                <Grid item xs={12}>
                    <MonthInput value={selectedMonth} onChange={(event:any) => setSelectedMonth(event)}/>
                </Grid>
                <Grid item container xs={4} mt={3}>
                    <Paper elevation={5}>
                        <Grid container spacing={2} pt={2} pb={4}>
                            <Grid item xs={12} sx={{position:'relative'}}>
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        right: 8,
                                        top: 8,
                                        color: (theme) => theme.palette.grey[500],
                                    }}
                                    onClick={saveContas}>
                                        <DoneIcon></DoneIcon>
                                </IconButton>
                                <Typography variant="h5" sx={{textAlign:'center'}} mb={1}>
                                    Contas
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Água'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.agua}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'agua'}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Luz'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.luz}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'luz'}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Internet'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.internet}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'internet'}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Faxineira'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.faxineira}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'faxineira'}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Piscina'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.piscina}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'piscina'}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Guarda'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.guarda}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'guarda'}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Iptu Extra'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.extra_iptu}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'extra_iptu'}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Caixinha'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <TextField 
                                    InputProps={{startAdornment: <InputAdornment position='start'>R$</InputAdornment>}}
                                    value={formValues.caixinha}
                                    variant='outlined'
                                    size='small'
                                    onChange={handleInputChange}
                                    name={'extra_iptu'}
                                    type="caixinha"
                                />
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right'}}>
                                    {'Extras'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h6" pr={2}>
                                    R$ {calculateExtras()}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <Divider sx={{borderColor:'black'}}></Divider>
                            </Grid>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right', fontWeight:'bold'}}>
                                    {'Total'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h6" pr={2} sx={{fontWeight:'bold'}}>
                                    {numberToLocaleCurrencyString(calculateTotal())}
                                </Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="h6" pr={2} sx={{textAlign:'right', fontWeight:'bold'}}>
                                    {'Total / Morador'}
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="h6" pr={2} sx={{fontWeight:'bold'}}>
                                    {numberToLocaleCurrencyString(calculateTotal()/4)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item container xs={5} mt={3}>
                    <Paper elevation={5} sx={{width:'100%'}}>
                        <Grid container spacing={2} pr={3} pl={3}>
                            <Grid item xs={12} mt={2}>
                                <Typography variant="h5" sx={{textAlign:'center'}} mb={1}>
                                    Extras
                                </Typography>
                            </Grid>
                            {contasExtra.map((contaExtra:ContaExtra)=>{
                                return (
                                <>
                                <Grid container item spacing={2} key={contaExtra.id}>
                                    <Grid item xs={4}>
                                        {contaExtra.descricao}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {numberToLocaleCurrencyString(contaExtra.valor)}
                                    </Grid>
                                    <Grid item xs={3}>
                                        {contaExtra.dono.nome}
                                    </Grid>
                                    <Grid item xs={2}>
                                        <IconButton sx={{postion:'relative', top:'-6px'}}onClick={() => {
                                            setEditContaExtraDialog(true);
                                            setSelectedContaExtra(contaExtra)
                                            }}> 
                                            <EditIcon />
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Divider sx={{borderColor:'black'}}></Divider>
                                    </Grid>
                                </Grid>
                                </>
                                )
                            })}
                            <Grid item xs={2}>
                                <IconButton sx={{postion:'relative', top:'-6px'}}onClick={() => {
                                    setCreateContaExtraDialog(true);
                                    }}> 
                                    <AddIcon />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
            <ContaExtraDialogForm 
                moradoresOptions={moradores}
                open={editContaExtraDialog || createContaExtraDialog}
                create={createContaExtraDialog}
                handleClose={()=>{
                    setEditContaExtraDialog(false)
                    setCreateContaExtraDialog(false)
                }}
                contaExtra={selectedContaExtra}
                updateData={getContasCasa}
            />
        </DashboardFinancasLayout>
      );
}
 
export default ContasCasa;