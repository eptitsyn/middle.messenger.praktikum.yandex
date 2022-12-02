import  Block  from '../../utils/Block';
import template from './profile.hbs';
import { Button, Input } from "../../components";
import { reloadPage } from "../../index";
import { Usericon } from "../../components/Usericon";

interface ProfilePageProps {
    title: string;
}

export class ProfilePage extends Block<ProfilePageProps> {
    constructor(props: ProfilePageProps) {
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
        this.children.email = new Input({
            label: "Email",
            name: "email",
            pattern: "^[A-z0-9._+-]+@[A-z0-9.-]+\\.[a-z]*$"
        });
        this.children.password = new Input({
            label: "Password",
            name: "password",
            type: "password",
            pattern: "^(?=.*[A-Z])(?=.*[0-9])([\\w-]){8,40}$"
        });
        this.children.repeat = new Input({label: "Repeat password", name: "password_repeat", type: "password"});
        this.children.phone = new Input({label: "Phone", name: "phone", type: "tel", pattern: "^\\+?[0-9]{10,15}$"});
        this.children.save = new Button({
            label: "Save", events: {
                click: () => {
                    reloadPage("/chat");
                }
            }
        });
        this.children.logout = new Button({
            label: "Logout", events: {
                click: () => {
                    reloadPage("/");
                }
            }
        });
        this.children.usericon = new Usericon({src:""})
    }

    render() {
        return this.compile(template, this.props);
    }
}
