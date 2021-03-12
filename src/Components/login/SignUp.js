import React, { useState } from 'react'
import { Button, Card, Col, Form} from 'react-bootstrap'

export default function SignUp() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);
        if(password !== confirmPassword) {
            alert('Confirm password again!');
        }
    };

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [zip, setZip] = useState('');

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const onChangeLastName = (e) => {
        setLastName(e.target.value)
    }
    const onChangeUserName = (e) => {
        setUserName(e.target.value)
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }
    const onChangeZip = (e) => {
        setZip(e.target.value)
    }

    return (
        <Card border="primary mx-auto" style={{ width: '400px', padding: '40px 20px', marginTop: 'calc(50vh - 250px)' }}>
            <h1>Sign Up</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom01">
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={onChangeFirstName}
                        />
                        <Form.Control.Feedback type="invalid">Please input your first name.</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom02">
                        <Form.Control
                            required
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={onChangeLastName}
                        />
                        <Form.Control.Feedback type="invalid">Please input your last name.</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            value={userName}
                            onChange={onChangeUserName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose a username.
              </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustomUsername">
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={onChangeEmail}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please choose an email.
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
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom03">
                        <Form.Control
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a confirm password.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12" controlId="validationCustom05">
                        <Form.Control
                            type="text"
                            placeholder="Zip"
                            value={zip}
                            onChange={onChangeZip}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid zip.
                    </Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Button style={{width: '100%'}} type='submit' variant="danger" className='rounded-pill'>Sign Up</Button>
            </Form>
        </Card>
    );
}