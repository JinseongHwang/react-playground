import React, {useState} from 'react';
import './App.css';
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";

type TableRow = {
  "name": string,
  "age": number,
}

type CellEditProps = {
  "rowId": string,
  "colName": string,
  "value": string,
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

  const parseCellEditProps = (e: any): CellEditProps | null => {
    const editingRowId = Object.keys(e.editRows)[0]
    if (editingRowId === undefined) return null;
    const editingColName = Object.keys(e.editRows[editingRowId])[0]
    const editingValue = e.editRows[editingRowId][editingColName].value
    return {
      "rowId": editingRowId,
      "colName": editingColName,
      "value": editingValue,
    }
  }

  const handleEditEvent = (e: any) => {
    const editProps = parseCellEditProps(e);
    if (editProps === null) return;

    setData(prevState => {
      return prevState.map((row, idx) => {
        if (idx.toString() === editProps.rowId) {
          return {...row, [editProps.colName]: editProps.value};
        }
        return row;
      });
    });
  };

  return (
    <div className="App">
      <DataGrid
        sx={{"width": "500px", "margin": "auto"}}
        columns={columns}
        rows={rows}
        onStateChange={handleEditEvent}
      />
    </div>
  );
}

export default App;
