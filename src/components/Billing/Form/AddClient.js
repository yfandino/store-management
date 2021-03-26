import React, {useState} from "react";
import { Dialog, DialogContent, DialogTitle, DialogActions, TextField, Button } from '@material-ui/core';
import Snackbar from '../../Commons/Snackbar';
import { API_CLIENTS } from "../../../firebase/api"

const inputs = [
  { id: "name", label: "Nombre y Apellidos", type: "text"},
  { id: "id", label: "Documento de identidad", type: "text"},
  { id: "address", label: "Dirección", type: "text"},
  { id: "phone", label: "Teléfono", type: "tel"},
  { id: "email", label: "Email", type: "text"}
]

const AddClient = (props) => {

  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const onChange = (e) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setData((prevState => ({ ...prevState, [name]: value })))
  }

  const addClient = () => {
    if(!data.name || !data.id || !data.address || !(data.phone || data.email)) {
      console.log('Invalid client data')
      return
    }

    data.id = data.id.toUpperCase();

    API_CLIENTS.addClient(data)
      .then(clientRef => {
        props.setClientRef(clientRef);
        props.setIsOpen(false);
      })
      .catch(err => setError(err));
  }

  return (
    <Dialog open={props.isOpen} fullScreen>
      {error && (<Snackbar open={!!error} message={error} type="error" />)}
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