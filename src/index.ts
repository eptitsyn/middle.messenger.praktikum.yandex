import { HomePage, LoginPage, ErrorPage, RegisterPage } from './pages';
import { registerComponent } from "./utils/registerComponent";
import { Button } from "./components";

// registerComponent("Button", Button as any);

const root = document.querySelector('#app')!;
const pages: Record<string, any> = {
    "/": new HomePage({
        title: "Home",
        links: ["404", "500", "login", "register", "chat", "chatselected", "profile"]
    }),
    "/login": new LoginPage({title: "Login"}),
    "/register": new RegisterPage({title: "Register"}),
    "/chat": {},
    "/chatselected": {},
    "/profile": {},
    "/404": new ErrorPage({title: "404"}),
    "/500": new ErrorPage({title: "500"}),
}


export function reloadPage(path:string){
    console.log(path);
    window.history.pushState("", "", path);
    let page = pages[path];
    console.log(page);
    root.innerHTML = "";
    root.replaceWith(page.getContent()!);
    page.dispatchComponentDidMount();
}

window.addEventListener('DOMContentLoaded', () => reloadPage(window.location.pathname));

