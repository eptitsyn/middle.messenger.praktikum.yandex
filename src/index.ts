import { ChatPage, ErrorPage, HomePage, LoginPage, ProfilePage, RegisterPage } from './pages';
import {registerHelper} from "./utils/helper";

registerHelper();

const root = document.querySelector('#app')!;
const pages: Record<string, any> = {
    "/": new HomePage({
        title: "Home",
        links: ["404", "500", "login", "register", "chat", "profile"]
    }),
    "/login": new LoginPage({title: "Login"}),
    "/register": new RegisterPage({title: "Register"}),
    "/chat": new ChatPage({title:"Chat"}),
    "/profile": new ProfilePage({title:"Profile"}),
    "/404": new ErrorPage({title: "404"}),
    "/500": new ErrorPage({title: "500"}),
}
export function reloadPage(path:string){
    window.history.pushState("", "", path);
    let page = pages[path];
    root.innerHTML = "";
    root.replaceWith(page.getContent()!);
    page.dispatchComponentDidMount();
}

window.addEventListener('DOMContentLoaded', () => reloadPage(window.location.pathname));

