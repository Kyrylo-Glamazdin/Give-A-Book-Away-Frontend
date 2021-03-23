import React, { useState } from 'react'
import { Button, Card, Col, Form,Row} from 'react-bootstrap'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "../../Styles/SignIn.css";

export default function SignIn() {

    const history = useHistory();

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        setValidated(true);
        var sendData = {
            username, 
            password
        }
        axios.post("http://localhost:3500/api/auth/signin", sendData)
        .then(response => {
            let data = response.data;
            if(data.status) {
                history.push("/home");
            } else {
                alert(data.message);
            }
        })
        .catch(err => {
            alert("Server connection error.")
        })
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    return (
        <Card border="primary mx-auto" style={{ width: '400px', padding: '40px 20px', marginTop: 'calc(50vh - 250px)' }}>
            <h1>Sign In</h1>
            <Row className = "p-2">
                <Col>
                    <p className = "float-left">New User ?</p>
                    <p className="red-color float-left ml-3">Create a Account.</p>
                </Col>
            </Row>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={onChangeUsername}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please input an username.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={onChangePassword}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a password.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Row>
                    <Col>
                        <input className ="float-left" type="checkbox" />
                        <h6 className ="float-left ml-1">Keep me signin.</h6>
                    </Col>
                </Row>
                <Button style={{width: '100%'}} type='submit' variant="danger" className='rounded-pill'>Sign In</Button>
            </Form>
        </Card>
    );
}