import { Block } from "./Block";
import { HelperOptions } from "handlebars";
import MainHandlebars from "handlebars";
// @ts-ignore
import * as RuntimeHandlebars from "handlebars/dist/handlebars.runtime";
const Handlebars = Object.assign(MainHandlebars, RuntimeHandlebars);

export function registerComponent(name: string, Component: typeof Block) {
    Handlebars.registerHelper(name, function ({data, fn, hash}: HelperOptions) {
        if (!data.root.children) {
            data.root.children = {};
        }

        if (!data.root.refs) {
            data.root.refs = {};
        }

        const {children} = data.root;

         const component = new Component(hash);

        if (hash.ref) {
            data.root.refs[hash.ref] = component;
        }

        children[component.id] = component;

        const contents = fn ? fn(this) : '';

            return `<div data-id="${component.id}">${contents}</div>`;
    })
}
