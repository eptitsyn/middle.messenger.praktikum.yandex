import MainHandlebars from "handlebars";
// @ts-ignore
import * as RuntimeHandlebars from "handlebars/dist/handlebars.runtime";
const Handlebars = Object.assign(MainHandlebars, RuntimeHandlebars);

export function registerHelper(){

    Handlebars.registerHelper("message", function(context, options) {
        // debugger;
        console.log("msg cont>",(context));
        console.log("msg op>",(options));
        return `<div data-id="${context.id}"></div>`;
    })

}
