import { Grid, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MonthInput from "../../../components/common/month-input/month-input";
import useForm from "../../../hooks/use-form/use-form.hook";
import DashboardFinancasLayout from "../../../layouts/dashboard_layout";
import APIService from "../../../services/api";
import { ContasCasa } from "../../../types/financas";
import { dateToString } from "../../../util/utils";


const initialFormValues:ContasCasa = {
    mes: '',
    piscina: 0,
    faxineira: 0,
    internet: 0,
    guarda: 0,
    luz: 0,
    agua: 0,
    extra_iptu: 0,
    caixinha: 0,
}

const ContasCasa = () => {

    const [selectedMonth, setSelectedMonth ] = useState(new Date())
    const [contasCasa, setContasCasa] = useState<ContasCasa>(initialFormValues)

    useEffect(() => {
        getContasCasa()
    }, [selectedMonth]); // eslint-disable-line

    const {handleInputChange, formValues} = useForm(contasCasa)
    
    async function getContasCasa(){
        const apiService = new APIService()
        const {data, status} = await apiService.get('/contas_casa/contas_casa', {month:dateToString(selectedMonth, 'MM/YYYY')})
        if (status !== 200){
            alert("erro")
        } else {
            setContasCasa(data[0])
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



    return (
        <DashboardFinancasLayout>
            <Container>
                <Grid container>
                    <Grid item xs={12} mt={3}>
                        <MonthInput value={selectedMonth} onChange={(event:any) => setSelectedMonth(event)}/>
                    </Grid>
                    <Grid item container xs={4} mt={5}>
                        <Paper elevation={5}>
                            <Grid container spacing={2} pt={4} pb={4}>

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
                                    <Typography variant="h6" pr={2} sx={{textAlign:'right', fontWeight:'bold'}}>
                                        {'Total'}
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="h6" pr={2} sx={{fontWeight:'bold'}}>
                                        R$ {calculateTotal(formValues)}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </DashboardFinancasLayout>
      );
}
 
export default ContasCasa;