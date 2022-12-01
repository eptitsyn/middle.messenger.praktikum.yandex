import { Block } from '../../utils/Block';
import template from './register.hbs';
import { Button, Input } from "../../components";
import { reloadPage } from "../../index";

interface RegisterPageProps {
    title: string;
}

export class RegisterPage extends Block {
    constructor(props: RegisterPageProps) {
        super(props);
    }

    init() {
        this.children.firstname = new Input({label: "Firstname", name:"first_name"});
        this.children.lastname = new Input({label: "Lastname", name:"first_name"});
        this.children.login = new Input({label: "Login", name:"login"});
        this.children.email = new Input({label: "Email", name:"email"});
        this.children.password = new Input({label: "Password", name:"password"});
        this.children.repeat = new Input({label: "Repeat password", name:"password_repeat"});
        this.children.phone = new Input({label: "Phone", name:"phone"});
        this.children.register = new Button({label:"Register", events: {click: () => {reloadPage("/chat");}}});
        this.children.cancel = new Button({label:"Cancel", events: {click: () => {reloadPage("/login");}}});
    }

    render() {
        return this.compile(template, this.props);
    }
}
