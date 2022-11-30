import { Block } from "../../utils/Block";
import template from "./home.hbs"
import {Button} from "../../components/button/Button";

interface HomePageProps {
  title:string;
  button : Button;
}

export class HomePage extends Block {
  constructor(props : HomePageProps) {
    super('div', props);
  }

  init(){
    this.children.button = new Button({
      label : "click!",
      events : {
        click:()=> console.log('clicked')
      }
    });
  }

  render(){
    console.log(this.children);

    return this.complete(template, {});
  }
}

