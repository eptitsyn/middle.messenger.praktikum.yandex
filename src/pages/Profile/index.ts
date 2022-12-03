import Block from '../../utils/Block';
import template from './profile.hbs';
import { Button, Input } from "../../components";
import { reloadPage } from "../../index";
import { Usericon } from "../../components/Usericon";

interface ProfilePageProps {
    title: string;
}

export class ProfilePage extends Block<ProfilePageProps> {
    constructor(props: ProfilePageProps) {
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
        this.children.firstname = new Input({
            label: "Firstname",
            name: "first_name",
            pattern: "^([A-ZА-ЯЁ])+[A-zА-яЁё\\-]*$",
            message: "Первая буква должна быть заглавной",
            required: true
        });
        this.children.lastname = new Input({
            label: "Lastname",
            name: "second_name",
            pattern: "^([A-ZА-ЯЁ])+[A-zА-яЁё\\-]*$",
            message: "Первая буква должна быть заглавной",
            required: true
        });
        this.children.login = new Input({
            label: "Login",
            name: "login",
            pattern: "^(?=.*[A-z])([\\w-]){3,20}$",
            message: "от 3 до 20 символов, может содержать цифры",
            required: true
        });
        this.children.email = new Input({
            label: "Email",
            name: "email",
            pattern: "^[A-z0-9._+-]+@[A-z0-9.-]+\\.[a-z]*$",
            message: "обязательно должна быть «собака» (@)",
            required: true
        });
        this.children.password = new Input({
            label: "Password",
            name: "password",
            type: "password",
            pattern: "^(?=.*[A-Z])(?=.*[0-9])([\\w-]){8,40}$",
            message: "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра.",
            required: true
        });
        this.children.repeat = new Input({
            label: "Repeat password",
            name: "password_repeat",
            type: "password",
            message: "Пароли должны совпадать",
            required: true
        });
        this.children.phone = new Input({
            label: "Phone",
            name: "phone",
            type: "tel",
            pattern: "^\\+?[0-9]{10,15}$",
            message: "от 10 до 15 символов, может начинается с плюса.",
            required: true
        });
        this.children.save = new Button({
            label: "Register",
            type: "submit"
        });
        this.children.logout = new Button({
            label: "Cancel", events: {
                click: () => {
                    reloadPage("/");
                }
            }
        });
        this.children.usericon = new Usericon({src: ""})
    }

    render() {
        return this.compile(template, this.props);
    }
}
