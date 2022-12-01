import { Block } from "../../utils/Block";
import template from "./input.hbs";

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

    render() {
        return this.compile(template, this.props);
    }
}
