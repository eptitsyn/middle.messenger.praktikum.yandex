import { Block } from '../../utils/Block';
import template from './chat.hbs';
import { Button, Input } from "../../components";

interface ChatPageProps {
    title: string;
}

export class ChatPage extends Block {
    constructor(props: ChatPageProps) {
        super(props);
    }

    init() {
        this.children.profile = new Button({
            label: 'Profile',
            events: {
                click: () => console.log('clicked'),
            }
        });
        this.children.input = new Input({placeholder:"Search"});
    }

    render() {
        return this.compile(template, this.props);
    }
}
