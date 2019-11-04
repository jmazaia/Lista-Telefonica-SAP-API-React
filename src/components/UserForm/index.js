import React from 'react';
import './style.css'
import {Form,Button} from 'react-bootstrap'
const UserForm = (props) =>
{
    return(
    <Form onSubmit = {props.loadUsers} id = "procurar">
    <Form.Group controlId="Search">
    <Form.Control name = "username" type="" placeholder="" />
    <Form.Text className="text-muted">
      Busque o usuário por chapa / nome de usuário / nome / sobrenome / site / área
    </Form.Text>
     </Form.Group>
     <Button  variant="primary" type="submit">
        Procurar
  </Button>
</Form>
    )
}
export default UserForm