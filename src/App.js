import './App.css';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Typography, IconButton, TextField, InputAdornment, Stack, Button, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CursosTable from './components/CursosTable';
import { Routes, Route, Outlet, Link } from "react-router-dom";
import * as React from "react";
import theme from './theme';
import CreateCurso from './components/CreateCurso';
import { useNavigate } from 'react-router-dom';

function App() {
  return (

    <div className="App">

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CursoList />} />
          <Route path="CreateCurso" element={<CreateCurso />} />
        </Route>

      </Routes>
    </div>
  );
}
export default App;

function Layout(){

return(

  <ThemeProvider theme={theme}>
  <ResponsiveAppBar></ResponsiveAppBar>
  <Outlet />
  </ThemeProvider>
);

}

function CursoList() {
  const navigate = useNavigate();

  return (
    
      <Stack spacing={2} padding={2}>

        <Typography inline variant="h4" component="h4" fontWeight="bold" color="#e42f24" align="left"> Cursos </Typography>

        <Grid container paddingTop={4} flexGrow={1}>
          <Grid md={2}>
            <TextField
              variant="outlined"
              label="Buscar Curso"
              size='small'
              inline
              align='left'
              InputProps={{

                endAdornment: (
                  <InputAdornment>
                    <IconButton>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Grid md={8.8}>
          </Grid>
          <Grid md={1.2}>
            <Button variant="contained" href="/CreateCurso">Crear Curso</Button>
          </Grid>
        </Grid>
        <CursosTable></CursosTable>
      </Stack>
   
  );
}

