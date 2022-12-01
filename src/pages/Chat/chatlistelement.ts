import { Block } from '../../utils/Block';
import template from './chat.hbs';
import { Button, Input, Usericon } from "../../components";

interface ChatlistelementProps {
    name: string;
}

export class Chatlistelement extends Block {
    constructor(props: ChatlistelementProps) {
        super(props);
    }

    init() {
        this.children.usericon = new Usericon({});
        this.children.profile = new Button({
            label: 'Profile',
            events: {
                click: () => console.log('clicked'),
            }
        });
        this.children.search = new Input({placeholder:"Search"});

    }

    render() {
        return this.compile(template, this.props);
    }
}
