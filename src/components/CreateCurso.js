import '../App.css'
import ResponsiveAppBar from './ResponsiveAppBar.js'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, IconButton, TextField, InputAdornment, Stack, Button, Grid, MenuItem, Select } from '@mui/material';
import { useNavigate } from "react-router-dom";
import theme from '../theme';
import { borderRadius, Box } from '@mui/system';
import { useEffect, useState } from 'react';
import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Wrapper, Status } from "@googlemaps/react-wrapper";


const CreateCurso = () => {

    const [profesorDataList, setProfesorDataList] = useState([])
    const [selectedProfesor, setSelectedProfesor] = useState("");
    const [plantillaDataList, setPlantillaDataList] = useState([])
    const [selectedPlantilla, setSelectedPlantilla] = useState("");
    const [selectedPlantillaCantidadClases, setSelectedPlantillaCantidadClases] = useState(4);
    const [today, setToday] = React.useState(dayjs());

    useEffect(() => {
        fetch("https://primeros-auxilios-368316.uc.r.appspot.com/profesor")
            .then((data) => data.json())
            .then((data) => setProfesorDataList(data))

        fetch("https://primeros-auxilios-368316.uc.r.appspot.com/plantillas")
            .then((data) => data.json())
            .then((data) => setPlantillaDataList(data))
    }, [])



    return (
        <Stack spacing={2} padding={2}>

            <Typography inline variant="h4" component="h4" fontWeight="bold" color="#e42f24" align="left"> Crear Curso </Typography>
            <Box sx={{ border: 1, borderRadius: 1, padding: 3, borderColor: 'grey.500' }}>
                <Grid container >
                    <Grid md={5}>
                        <Stack>
                            <Typography inline variant="body1" component="body" align="left">Nombre </Typography>
                            <TextField id="textFieldNombreCurso" label="" variant="outlined" size="small" />
                        </Stack>
                    </Grid>
                    <Grid md={2}></Grid>
                    <Grid md={5}>
                        <Stack>
                            <Typography inline variant="body1" component="body" align="left">Plantilla </Typography>
                            <Select
                                labelId="selectPlantilla"
                                id="selectPlantilla"
                                label="Plantilla"
                                size="small"
                                align="left"
                                value={selectedPlantilla}
                                onChange={
                                    (ev) => {
                                        setSelectedPlantilla(ev.target.value)

                                    }

                                }
                            >
                                {plantillaDataList.map((plantilla) => (
                                    <MenuItem key={plantilla.id} value={plantilla.id}>{plantilla.nombre}</MenuItem>
                                ))}

                            </Select>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container paddingTop={3}>
                    <Grid md={5}>
                        <Stack>
                            <Typography inline variant="body1" component="body" align="left">Profesor </Typography>
                            <Select
                                labelId="selectProfesor"
                                id="selectProfesor"
                                label="Profesor"
                                size="small"
                                align="left"
                                value={selectedProfesor}
                                onChange={(ev) => setSelectedProfesor(ev.target.value)}
                            >
                                {profesorDataList.map((profesor) => (
                                    <MenuItem key={profesor.id} value={profesor.id}>{profesor.nombre} {profesor.apellido}</MenuItem>
                                ))}
                            </Select>
                        </Stack>
                    </Grid>
                    <Grid md={2}></Grid>
                    <Grid md={5}>
                        <Stack>
                            <Typography inline variant="body2" component="body2" align="left"> {selectedPlantillaCantidadClases} clases </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
            <Typography inline variant="h5" component="h5" fontWeight="bold" color="#e42f24" align="left"> Clases </Typography>
            <Box sx={{ border: 1, borderRadius: 1, padding: 3, borderColor: 'grey.500' }}>
                <Stack>
                    <Typography inline variant="h6" component="h6" fontWeight="bold" align="left"> Clase 1</Typography>
                    <Grid container paddingTop={3} >
                        <Grid md={5}>
                            <Stack>
                                <Typography inline variant="body1" component="body" align="left">Dirección </Typography>
                                <TextField id="textFieldDireccion" label="" variant="outlined" size="small" />
                                <Typography inline variant="body1" component="body" align="left" marginTop={3}>Fecha y Hora </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField size="small" {...props} />}
                                        size="small"
                                        value={today}
                                        onChange={(newValue) => {
                                            setToday(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </Stack>

                        </Grid>
                        <Grid md={2}></Grid>
                        <Grid md={5}>
                        </Grid>
                    </Grid>
                </Stack>
            </Box>
        </Stack>

    );
}

export default CreateCurso;
