import { Block } from '../../utils/Block';
import template from './button.hbs';

interface ButtonProps {
    label: string;
    class?: string | null;
    type?: string | null;
    events: {
        click: () => void;
    };
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
