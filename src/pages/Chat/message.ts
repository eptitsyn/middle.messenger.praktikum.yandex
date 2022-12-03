import  Block  from '../../utils/Block';
import template from './message.hbs';

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
        // console.log(">>",this.compile(template, this.props))
        return this.compile(template, this.props);
    }
}
