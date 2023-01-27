import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const MonthInput = ({value, onChange}:{value:Date, onChange:any}) => {
    return (  
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                views={['year', 'month']}
                label="Mês Selecionado"
                minDate={new Date('2012-03-01')}
                inputFormat="MM/yyyy"
                value={value}
                onChange={(event) => {onChange(event)}}
                renderInput={(params) => 
                    <TextField {...params} helperText={null} />
                }
            />
        </LocalizationProvider>
    );
}
 
export default MonthInput;