import { Block } from "../../utils/Block";
import template from "./input.hbs";
import { Button } from "../Button";
import { reloadPage } from "../../index";

interface InputProps {
    label?: string;
    name?:string;
    type?:string;
    pattern?:string;
    placeholder?:string;
}
export class Input extends Block {
    constructor(props: InputProps) {
        super(props);
    }

    protected init() {
        this.children.register = new Button({label:"Register", events: {click: () => {reloadPage("/register");}}});
    }

    render() {
        return this.compile(template, this.props);
    }
}
