import  Block  from '../../utils/Block';
import template from './chatlistelement.hbs';
import { Usericon } from "../../components";

interface ChatlistelementProps {
    name: string;
}

export class Chatlistelement extends Block {
    constructor(props: ChatlistelementProps) {
        super(props);
    }

    init() {
        this.children.usericon = new Usericon({});
    }

    render() {
        return this.compile(template, {...this.props});
    }
}
