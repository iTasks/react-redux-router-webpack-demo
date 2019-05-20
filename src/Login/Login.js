
import React, {
    Component
} from 'react';
import {
    bindActionCreators
} from "redux";
import {
    Button,
    ControlLabel,
    Form,
    Col,
    Row,
    FormControl,
    HelpBlock,
    Checkbox,
    Radio,
    FormGroup
} from 'react-bootstrap';


import * as rootActions from "../Root/Root.Actions";

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
        };
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangePswd = this.onChangePswd.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.onSuccessLogin = this.onSuccessLogin.bind(this);
    }


    handleLogin() {
        if (!this.state.username || !this.state.password) {
            return;
        }
        const opt = {
            'name': this.state.username,
            'password': this.state.password,
        };
        this.props.loginActions.logIn(opt, this.onSuccessLogin);
    }

    onSuccessLogin() {
        this.props.rootActions.goToRouter("/home");
    }


    handleRegister() {
    // this.props.loginActions.skipLogin();
    // this.props.rootActions.goToRouter("home");
    }

    onChangeName(text) {
        this.setState({
            'username': text
        });
    }

    onChangePswd(text) {
        this.setState({
            'password': text
        });
    }


    render() {
        return (

            <Form>
                <FieldGroup
                    id="formControlsEmail"
                    type="email"
                    label="Email address"
                    placeholder="Enter email"
                    onChange={this.onChangeName}
                />
                <FieldGroup 
                    id="formControlsPassword"
                    label="Password" 
                    type="password" 
                    onChange={this.onChangePswd} 
                    placeholder="Password"
                />
                <FieldGroup
                    id="formControlsFile"
                    type="file"
                    label="File"
                    help="help text here."
                />

                <Checkbox checked readOnly>
          Checkbox
                </Checkbox>
                <Radio checked readOnly>
          Radio
                </Radio>
                <FormGroup>
                    <Col smOffset={5} sm={6}>
                        <Button bsStyle="primary" onClick={(event) => this.handleLogin(event)}>Login</Button>
                    </Col>
                </FormGroup>
            </Form>

        );
    }
}