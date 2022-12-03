import Block from '../../utils/Block';
import template from './login.hbs';
import { Button, Input } from "../../components";
import { reloadPage } from '../..';

interface LoginPageProps {
    title: string;
    onSubmit?: string;
}

export class LoginPage extends Block<LoginPageProps> {
    constructor(props: LoginPageProps) {
        super({
            ...props, events: {
                submit: (e) => {
                    e.preventDefault();
                    const values = Object
                        .values(this.children)
                        .filter(child => child instanceof Input)
                        .map((child) => {
                            return {[(child as Input).getName()]: (child as Input).getValue()}
                        })
                        .reduce(function (result, current) {
                            return Object.assign(result, current);
                        }, {})
                    console.log(values)
                }
            }
        });
    }


    init() {
        this.children.login = new Input({
            label: "Login", name: "login", message: "Your login",
            events: {
                focus: (e) => {
                    alert("focus")
                    console.log("focus", e)
                },
                blur: (e) => {
                    console.log("blur", e)
                }
            }
        });
        this.children.password = new Input({label: "Password", name: "password", message: "Your password"});
        this.children.signin = new Button({
            label: "Sign In",
            class: "space-top signin-button",
            type: "submit"
        });
        this.children.register = new Button({
            label: "Register", events: {
                click: () => {
                    reloadPage("/register");
                }
            }
        });
    }

    render() {
        return this.compile(template, this.props);
    }
}
