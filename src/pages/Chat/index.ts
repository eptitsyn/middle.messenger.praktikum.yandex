import { Block } from '../../utils/Block';
import template from './chat.hbs';
import { Button, Input } from "../../components";
import { Chatlistelement } from "./chatlistelement";
import { Message } from "./message";

interface ChatPageProps {
    title: string;
    chats?: Chatlistelement[];
    messages? : Message[];
}

export class ChatPage extends Block {
    constructor(props: ChatPageProps) {
        props.chats = [new Chatlistelement({name:"John Doe"}), new Chatlistelement({name:"John Doe"})]
        props.messages = [new Message({text:"Lorem Ipsum"}),new Message({text:"Lorem Ipsum", own:true})]
        super(props);
    }

    init() {
        this.children.profile = new Button({
            label: 'Profile',
            events: {
                click: () => console.log('clicked'),
            }
        });
        this.children.search = new Input({placeholder: "Search"});

    }

    render() {
        return this.compile(template, this.props);
    }
}
