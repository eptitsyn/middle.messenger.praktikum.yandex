import Block from "../../utils/Block";
import template from "./input.hbs";
import { validate } from "../../utils/validation";


interface InputProps {
    label?: string;
    name?: string;
    type?: string;
    pattern?: string;
    required?:boolean;
    placeholder?: string;
    events?: any;
    message?: string;
}

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                focus: (e) => {
                    this.validate()
                },
                focusout: (e) => {
                    this.validate()
                }
            }
        });
    }

    protected init() {

    }

    public getValue() {
        return (this._element?.querySelector('input') as HTMLInputElement).value;
    }

    public getName(): string {
        return <string>this.props.name;
    }

    validate() {
        let input = this._element?.querySelector('input');
        let valid = input.validity.valid;
        let txtBlock = this._element?.querySelector('.input__errorinfo');
        txtBlock.style.display = !valid ? "block" : "none";
        txtBlock.innerHTML = this._meta.props.message;
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
