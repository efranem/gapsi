import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { ToggleButton } from "primereact/togglebutton";

const DialogComponent = ({ ...props }) => {
  const [varInfo, setVarInfo] = useState(props.fields);
  const [botonBloqueado, setBotonBloqueado] = useState(false);

  const onValChange = (event) => {
    const { name, value } = event.target;
    const fieldArray = varInfo;
    setVarInfo(
      fieldArray.map((element) => {
        if (element.hasOwnProperty(name)) {
          element[name] = value;
          element.key = value;
        }
        return element;
      })
    );
  };

  const handlerClick = () => {
    props.sendRow(varInfo);
  };

  const footer = () => {
    return (
      <Button
        style={{ backgroundColor: props.colorButton }}
        label={props.labelButton}
        onClick={handlerClick}
        disabled={botonBloqueado}
      />
    );
  };

  return (
    <Dialog
      header={props.header}
      visible={props.displayBasic}
      modal
      style={{ width: props.width }}
      footer={footer}
      onHide={() => {
        props.setDisplayBasic(false);
      }}
    >
      {varInfo !== undefined &&
        varInfo.map((element) => {
          return (
            <div className="p-inputgroup">
              <span
                className="p-inputgroup-addon"
                style={{
                  minWidth: element.minWidth
                }}
              >
                {element.nombre}
              </span>
              {element.tipo === "text" && (
                <InputText
                  name={element.nombre + "Value"}
                  value={element[element.nombre + "Value"]}
                  onChange={onValChange}
                  disabled={
                    element.disabled !== undefined && element.disabled
                      ? true
                      : false
                  }
                  className={
                    new RegExp(element.regex).test(
                      element[element.nombre + "Value"]
                    ) === true
                      ? ""
                      : "p-invalid block"
                  }
                />
              )}
              {element.tipo === "boolean" && (
                <ToggleButton
                  name={element.nombre + "Value"}
                  checked={element[element.nombre + "Value"]}
                  onChange={onValChange}
                  onIcon="pi pi-check"
                  offIcon="pi pi-times"
                  aria-label="Confirmation"
                  style={{ width: "30%" }}
                />
              )}
            </div>
          );
        })}
    </Dialog>
  );
};

export default DialogComponent;
