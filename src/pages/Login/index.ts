import { Block } from '../../utils/Block';
import template from './login.hbs';
import { Button, Input } from "../../components";
import { reloadPage } from '../..';
import styles from "./login.css";

interface LoginPageProps {
    title: string;
}

export class LoginPage extends Block {
    constructor(props: LoginPageProps) {
        console.log("style:",styles)
        super(props);
    }

    init() {
        this.children.login = new Input({label: "Login"});
        this.children.password = new Input({label: "Password"});
        this.children.signin = new Button({label:"Sign In", class:"space-top signin-button", type:"submit", events: {click: () => console.log('clicked')}});
        this.children.register = new Button({label:"Register", events: {click: () => {reloadPage("/register");}}});
    }

    render() {
        return this.compile(template, this.props);
    }
}
