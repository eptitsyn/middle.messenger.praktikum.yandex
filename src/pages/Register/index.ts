import  Block  from '../../utils/Block';
import template from './register.hbs';
import { Button, Input } from "../../components";
import { reloadPage } from "../../index";

interface RegisterPageProps {
    title: string;
}

export class RegisterPage extends Block<RegisterPageProps> {
    constructor(props: RegisterPageProps) {
        super(props);
    }

    init() {
        this.children.firstname = new Input({
            label: "Firstname",
            name: "first_name",
            pattern: "^([A-ZА-ЯЁ])+[A-zА-яЁё\\-]*$"
        });
        this.children.lastname = new Input({
            label: "Lastname",
            name: "second_name",
            pattern: "^([A-ZА-ЯЁ])+[A-zА-яЁё\\-]*$"
        });
        this.children.login = new Input({label: "Login", name: "login", pattern: "^(?=.*[A-z])([\\w-]){3,20}$"});
        this.children.email = new Input({label: "Email", name: "email", pattern: "^[A-z0-9._+-]+@[A-z0-9.-]+\\.[a-z]*$"});
        this.children.password = new Input({
            label: "Password",
            name: "password",
            type: "password",
            pattern: "^(?=.*[A-Z])(?=.*[0-9])([\\w-]){8,40}$"
        });
        this.children.repeat = new Input({label: "Repeat password", name: "password_repeat", type: "password"});
        this.children.phone = new Input({label: "Phone", name: "phone", type: "tel", pattern:"^\\+?[0-9]{10,15}$"});
        this.children.register = new Button({
            label: "Register", events: {
                click: () => {
                    reloadPage("/chat");
                }
            }
        });
        this.children.cancel = new Button({
            label: "Cancel", events: {
                click: () => {
                    reloadPage("/login");
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
