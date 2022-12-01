import { Block } from '../../utils/Block';
import template from './chat.hbs';
import { Button, Input } from "../../components";

interface HomePageProps {
    title: string;
}

export class ChatPage extends Block {
    constructor(props: HomePageProps) {
        super(props);
    }

    init() {
        this.children.button = new Button({
            label: 'Click me',
            events: {
                click: () => console.log('clicked'),
            }
        });
        this.children.input = new Input({label: "input label"});
    }

    render() {
        return this.compile(template, this.props);
    }
}
