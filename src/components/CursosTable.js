import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import Moment from 'moment';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

const columns = [
  {
    field: 'id', headerName: 'ID', width: 70, headerAlign: 'center',
    align: 'center',
  },
  { field: 'nombreCurso', headerName: 'Nombre', width: 300 },
  {
    field: 'clases',
    headerName: 'Clases',
    width: 70,
    valueGetter: getCantidadClases,
    headerAlign: 'center',
    align: 'center',
  },
  {
    field: 'fullName',
    headerName: 'Profesor',
    width: 150,
    valueGetter: getFullName,
  },
  {
    field: 'fechaComienzo',
    headerName: 'Fecha Comienzo',
    width: 150,
    valueGetter: getFechaComienzo,
    headerAlign: 'right',
    align: 'right',
  },
  {
    field: 'fechaFin',
    headerName: 'Fecha Fin',
    width: 150,
    valueGetter: getFechaFin,
    headerAlign: 'right',
    align: 'right',
  },
  {
    field: "editButton",
    headerName: '',
    width: 70,
    align: 'right',
    sortable: false,
    renderCell: (params) => {

      return (
        <IconButton>
          <EditIcon color='primary' />
        </IconButton>
      )

    },
    disableClickEventBubbling: true,
  },
  {
    field: "viewButton",
    headerName: '',
    width: 70,
    align: 'right',
    sortable: false,
    renderCell: (params) => {

      return (
        <IconButton>
          <VisibilityIcon color='primary' />
        </IconButton>
      )

    },
    disableClickEventBubbling: true,
  }
]

function getFullName(params) {
  return `${params.row.profesor.nombre || ''} ${params.row.profesor.apellido || ''}`;
}

function getCantidadClases(params) {

  var i = 2;
  params.row.cursoClases.map((item) => i++);

  return i;

}

function getFechaComienzo(params) {

  var i = null;
  params.row.cursoClases.map((item) => {
    if (i == null) {
      i = item.fechaHora;
    } else {
      if (i < item.fechaHora)
        i = item.fechaHora
    }

  }
  );

  Moment.locale('es');
  return Moment(i).format('d/MM/YY HH:mm');
}

function getFechaFin(params) {

  var i = null;
  params.row.cursoClases.map((item) => {
    if (i == null) {
      i = item.fechaHora;
    } else {
      if (i > item.fechaHora)
        i = item.fechaHora
    }

  }
  );

  Moment.locale('es');
  return Moment(i).format('d/MM/YY HH:mm');
}

const renderEditButton = (params) => { 

  return (
    <IconButton>
      <EditIcon />
    </IconButton>
  )
}

const CursosTable = () => {

  const [tableData, setTableData] = useState([])
  const [deletedRows, setDeletedRows] = useState([]);

  useEffect(() => {
    fetch("https://primeros-auxilios-368316.uc.r.appspot.com/curso")
      .then((data) => data.json())
      .then((data) => setTableData(data))

  }, [])

  console.log(tableData);

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        onSelectionModelChange={({ selectionModel }) => {
          const rowIds = selectionModel.map(rowId => parseInt(String(rowId), 10));
          const rowsToDelete = tableData.filter(row => rowIds.includes(row.id));
          setDeletedRows(rowsToDelete);
          console.log(deletedRows);
        }}
      />
    </div>
  )
}

export default CursosTable
