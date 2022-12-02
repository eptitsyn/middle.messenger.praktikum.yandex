import  Block  from '../../utils/Block';
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
        props.messages = [new Message({text:"Lorem Ipsum"}),]
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
        this.children.message1 = new Message({text:"Lorem Ipsum"});
        this.children.message2 = new Message({text:"Lorem Ipsum", own:true})
        this.children.element1 = new Chatlistelement({name:"John Doe"})
        this.children.element2 = new Chatlistelement({name:"Jane Smith"})

        this.children.messageinput = new Input({placeholder:"message", name:"message"});
        this.children.sendbutton = new Button({label:"Send"})

    }

    render() {
        return this.compile(template, this.props);
    }
}
