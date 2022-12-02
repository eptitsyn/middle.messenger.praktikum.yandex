import Block from "../../utils/Block";
import template from "./input.hbs";
import { reloadPage } from "../../index";

interface InputProps {
    label?: string;
    name?:string;
    type?:string;
    pattern?:string;
    placeholder?:string;
}
export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    protected init() {
    }

    public getValue() {

        return (this._element?.querySelector('input') as HTMLInputElement).value;
    }

    public getName() : string {
        return <string>this.props.name;
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
