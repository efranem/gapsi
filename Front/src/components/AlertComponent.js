import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { ConfirmDialog } from "primereact/confirmdialog";
import { APIfetchApi } from "./../API/APIfetch";

const AlertComponent = ({ ...props }) => {
  const toast = useRef(null);
  const fetchApi = new APIfetchApi();

  const accept = async () => {
    const resultado = await fetchApi.fetchApi(
      props.headers,
      "DELETE",
      undefined,
      props.urlDelete
    );
    const response = await resultado.json();
    const status = await resultado.status;
    if (status === 404) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: response.detailFail[0].descripcion,
        life: 3000
      });
    }
    if (status === 200) {
      toast.current.show({
        severity: "info",
        summary: "Confirmado",
        detail: "Ha confirmado la eliminación",
        life: 3000
      });
      props.updateIndexTable();
    }
  };
  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rechazado",
      detail: "Ha rechazado la elminación",
      life: 3000
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog
        visible={props.visible}
        onHide={() => props.setVisible(false)}
        message={props.mensaje}
        header={props.encabezado}
        icon={props.icono}
        acceptClassName={props.acceptClassName}
        accept={accept}
        reject={reject}
      />
    </>
  );
};

export default AlertComponent;
