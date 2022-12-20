import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Fragment } from "react";
import { Badge } from "primereact/badge";

const DataTableComponent = ({ ...props }) => {
  const statusBodyTemplate = (rowData) => {
    return (
      <Badge
        value={rowData.estatus === 0 ? "Inactivo" : "Activo"}
        className="mr-2"
        severity={rowData.estatus === 0 ? "danger" : "success"}
      />
    );
  };

  return (
    <DataTable
      value={props.nodes}
      header={props.header}
      onRowEditComplete={props.onRowEditComplete}
      editMode="row"
    >
      {props.columnas !== undefined ? (
        props.columnas.map((element) => {
          if (element.tipo !== undefined) {
            return (
              <Column
                field={element.campo}
                header={element.encabezado}
                body={statusBodyTemplate}
              />
            );
          }
          return <Column field={element.campo} header={element.encabezado} />;
        })
      ) : (
        <Fragment />
      )}
      <Column
        body={props.actionTemplate}
        style={{ textAlign: "center", width: "9rem" }}
      />
    </DataTable>
  );
};

export default DataTableComponent;
