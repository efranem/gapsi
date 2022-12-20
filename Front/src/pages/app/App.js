import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import DataTableComponent from "../../components/DataTableComponent";
import DialogComponent from "../../components/DialogComponent";
import AlertComponent from "../../components/AlertComponent";
import { APIfetchApi } from "./../../API/APIfetch";
import { Toast } from "primereact/toast";

const App = () => {
  const ENDPOINT = process.env.REACT_APP_URL_BASE;
  const toast = useRef(null);

  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasicAgregar, setDisplayBasicAgregar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [idElementDelete, setIdElementDelete] = useState(null);
  const [urlDelete, setUrlDelete] = useState(null);
  const [nodes, setNodes] = useState([]);
  const [columnas] = useState([
    { campo: "nombre", encabezado: "Nombre" },
    { campo: "razonSocial", encabezado: "RazonSocial" },
    { campo: "direccion", encabezado: "Direccion" }
  ]);
  const fieldsInit = [
    {
      nombre: "Nombre",
      tipo: "text",
      nombreValue: "",
      minWidth: "20%"
    },
    {
      nombre: "RazonSocial",
      tipo: "text",
      razonSocialValue: "",
      minWidth: "20%"
    },
    {
      nombre: "Direccion",
      tipo: "text",
      direccionValue: "",
      minWidth: "20%"
    }
  ];
  const [fields, setFields] = useState(fieldsInit);
  let hed = new Headers();
  hed.append("messageUUID", "12");
  hed.append("requestDate", "19-07-2022");
  hed.append("sendBy", "2");
  hed.append("version", "1");
  hed.append("ipClient", "12");
  hed.append("ipServer", "122");
  hed.append("user", "yo");
  hed.append("Access-Control-Allow-Origin", "*");
  hed.append("Access-Control-Allow-Headers", "*");
  hed.append("Content-Type", "application/json");
  const fetchApi = new APIfetchApi();
  const getInit = async () => {
    const resultado = await fetchApi.fetchApi(
      hed,
      "GET",
      undefined,
      ENDPOINT + "/proveedores"
    );
    const result = await resultado.json();
    setNodes(result);
    console.log(result);
  };
  useEffect(() => {
    getInit();
  }, []);

  const actionTemplate = (node, column) => {
    return (
      <>
        <Button
          type="button"
          icon="pi pi-trash"
          className="p-button-danger"
          style={{ marginRight: ".5em" }}
          onClick={() => handlerElementDelete(node)}
        />
      </>
    );
  };

  const rightContents = (
    <Button
      label="Nuevo"
      icon="pi pi-plus"
      onClick={() => {
        setFields(
          fields.map((element) => {
            element[element.nombre + "Value"] = "";
            return element;
          })
        );
        setDisplayBasicAgregar(true);
      }}
      className="mr-2"
    />
  );

  const leftContents = <h2>Catalogo Demo</h2>;

  const header = <Toolbar left={leftContents} right={rightContents} />;

  const handlerAgregar = async (data, method) => {
    const body = {
      nombre: data.filter((element) => element.nombre === "Nombre")[0]
        .NombreValue,
      razonSocial: data.filter((element) => element.nombre === "RazonSocial")[0]
        .RazonSocialValue,
      direccion: data.filter((element) => element.nombre === "Direccion")[0]
        .DireccionValue
    };
    console.log(body);
    console.log(data);

    const consultStatus = await fetchApi.fetchApi(
      hed,
      "POST",
      body,
      ENDPOINT + "/proveedores"
    );
    if (consultStatus.status === 201) {
      toast.current.show({
        severity: "success",
        summary: "Confirmado",
        detail: "Exito",
        life: 3000
      });
      setDisplayBasicAgregar(false);
      setDisplayBasic(false);
      getInit();
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Error",
        detail: "Hubo un error al invocar servicio",
        life: 3000
      });
    }
  };

  const handlerElementDelete = (node) => {
    setIdElementDelete(node.id);
    setVisible(true);
    setUrlDelete(ENDPOINT + "/proveedores/" + node.nombre);
  };

  const handlerCloseDialog = () => {
    console.log("CERRAR...............");
    setFields(fieldsInit);
    console.log(fields);
  };

  return (
    <>
      <Toast ref={toast} />

      <AlertComponent
        visible={visible}
        encabezado="Confirmacion"
        mensaje="¿Seguro quieres eliminar el registro?"
        icono="pi pi-info-circle"
        setVisible={setVisible}
        acceptClassName="p-button-danger"
        idElementDelete={idElementDelete}
        urlDelete={urlDelete}
        headers={hed}
        updateIndexTable={getInit}
      />
      <DialogComponent
        displayBasic={displayBasicAgregar}
        setDisplayBasic={setDisplayBasicAgregar}
        header="Agregar Configuracion"
        fields={fields}
        colorButton="green"
        labelButton="Agregar"
        width="50vw"
        sendRow={handlerAgregar}
        handlerClose={handlerCloseDialog}
        fieldsInit={fieldsInit}
      />
      <DataTableComponent
        nodes={nodes}
        header={header}
        actionTemplate={actionTemplate}
        fields={fields}
        columnas={columnas}
      />
    </>
  );
};

export default App;
