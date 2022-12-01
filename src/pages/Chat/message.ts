import { Block } from '../../utils/Block';
import template from './chat.hbs';

interface MessageProps {
    text: string;
    own?:boolean;
}

export class Message extends Block {
    constructor(props: MessageProps) {
        super(props);
    }

    init() {
    }

    render() {
        return this.compile(template, this.props);
    }
}
