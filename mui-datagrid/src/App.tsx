import React, {useState} from 'react';
import './App.css';
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";

type TableRow = {
  "name": string,
  "age": number,
}

const initialData: TableRow[] = [
  {"name": "jinseong", "age": 20},
  {"name": "gildong", "age": 30},
  {"name": "cheolsu", "age": 40},
]

const App = () => {
  const [data, setData] = useState<TableRow[]>(initialData)

  const columns: GridColDef[] = [
    {field: 'name', headerName: 'Name', width: 150},
    {field: 'age', headerName: 'Age', editable: true},
  ];

  const rows: GridRowsProp = data.map((row, idx) => ({
    id: idx, ...row
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
