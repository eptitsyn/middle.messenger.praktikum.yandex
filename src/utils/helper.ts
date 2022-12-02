import Handlebars from "handlebars";


export function registerHelper(){

    Handlebars.registerHelper("message", function(context, options) {
        // debugger;
        console.log("msg cont>",(context));
        console.log("msg op>",(options));
        return `<div data-id="${context.id}"></div>`;
    })

}
