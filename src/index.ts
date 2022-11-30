import { Button } from "./components/button/Button";
import {HomePage} from "./markup/pages/home";


window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector("#app")!;

    const homePage = new HomePage({ button });

    root.append(homePage.getContent());
})
