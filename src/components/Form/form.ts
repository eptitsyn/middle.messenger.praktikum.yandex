import Block from "../../utils/Block";
import template from "./form.hbs";

interface FormProps {
    label: string;
    class?: string | null;
    type?: string | null;
    events?: {
        click: () => void;
    };
}
export class Form extends Block<FormProps> {
    constructor(props:FormProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
