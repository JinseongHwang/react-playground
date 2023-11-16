import React from 'react';
import './App.css';
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";

const initialData = [
  {"name": "jinseong", "age": 20},
  {"name": "gildong", "age": 30},
  {"name": "cheolsu", "age": 40},
]

const App = () => {
  const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'age', headerName: 'Age', editable: true},
  ];

  const rows: GridRowsProp = initialData.map((data, idx) => ({
    id: idx, ...data
  }));

  return (
    <div className="App">
      <DataGrid
        sx={{"width": "500px", "margin": "auto"}}
        columns={columns}
        rows={rows}
      />
    </div>
  );
}

export default App;
