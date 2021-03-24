import React, {useState} from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import LoadingButton from "../../Commons/LoadingButton";
import { API_CLIENTS } from "../../../firebase/api"

const inputs = [
  { id: "name", label: "Nombre y Apellidos", type: "text"},
  { id: "id", label: "Documento de identidad", type: "text"},
  { id: "address", label: "Dirección", type: "text"},
  { id: "phone", label: "Teléfono", type: "tel"},
]

const AddClient = (props) => {

  const [data, setData] = useState({});

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setData((prevState => ({ ...prevState, [name]: value })))
  }

  const addClient = () => {
    if(!data.name || !data.id || !data.address || !data.phone) {
      console.log('Invalid client data')
      return
    };

    const clientRef = API_CLIENTS.addClient(data);
    props.setClientRef(clientRef);
    props.setIsOpen(false);
  }

  return (
    <Dialog open={props.isOpen} fullScreen>
      <form autoComplete="off">
        <DialogTitle>Añadir nuevo cliente</DialogTitle>
        <DialogContent>
          {inputs.map((input, index) => (
            <TextField
              variant="outlined"
              size="small"
              margin="normal"
              fullWidth
              required
              type={input.type}
              id={input.id}
              key={input.id}
              label={input.label}
              name={input.id}
              autoFocus={index === 0}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChange}
              autoComplete="off"
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={addClient}
          >
            Crear
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="primary"
            onClick={() => props.setIsOpen(false)}
          >
            Cancelar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddClient;