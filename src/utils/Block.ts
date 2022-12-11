import { EventBus } from "./EventBus";
import { nanoid } from 'nanoid';

// Нельзя создавать экземпляр данного класса
class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    } as const;

  // Unique identifier for the block
    public id = nanoid(8);

  // Properties passed to the block
    protected props: P;

  // Child blocks
    public children: Record<string, Block>;

  // Event bus to manage events
    private eventBus: () => EventBus;

  // The DOM element associated with the block
    private _element: HTMLElement | null = null;

  // Meta data about the block
    private _meta: { tagName: string; props: P; };

  /**
   * Constructor for the Block class
   *
   * @param propsWithChildren - The properties and children for the block
   * @param tagName - The HTML tag name for the block
     */
  constructor(propsWithChildren: P, tagName: string = "div") {
    // Create a new event bus
        const eventBus = new EventBus();

    // Get the properties and children from the props
        const {props, children} = this._getChildrenAndProps(propsWithChildren);

    // Store the meta data for the block
        this._meta = {
            tagName,
            props: props as P
        };

    // Set the children and props for the block
        this.children = children;
        this.props = this._makePropsProxy(props);

    // Store a reference to the event bus
        this.eventBus = () => eventBus;

    // Register the block's event handlers
        this._registerEvents(eventBus);

    // Emit the INIT event to initialize the block
        eventBus.emit(Block.EVENTS.INIT);
    }

  // Helper method to get the properties and children from the props object
    _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block> } {
    // Object to hold the properties and children
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

    // Iterate over the keys and values in the props object
        Object.entries(childrenAndProps).forEach(([key, value]) => {
      // Check if the value is a Block instance
            if (value instanceof Block) {
        // If it is, add it to the children object
                children[key as string] = value;
            } else {
        // Otherwise, add it to the props object
                props[key] = value;
            }
        });

    // Return the props and children objects
        return {props: props as P, children};
    }

    // Helper method to add event
    _addEvents() {
  // Get the "events" property from the props
        const {events = {}} = this.props as P & { events: Record<string, () => void> };

  // Iterate over the keys in the events object
        Object.keys(events).forEach(eventName => {
    // Add an event listener for each event
            this._element?.addEventListener(eventName, events[eventName])
        });
    }

// Helper method to remove event listeners from the block's element
    _removeEvents(){
  // Get the "events" property from the props
        const {events = {}} = this.props as P & { events: Record<string, () => void> };

  // Iterate over the keys in the events object
        Object.keys(events).forEach(eventName => {
    // Remove the event listener for each event
            this._element?.removeEventListener(eventName, events[eventName])
        });
    }

// Helper method to register the block's event handlers
    _registerEvents(eventBus: EventBus) {
  // Register the INIT event handler
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));

  // Register the FLOW_CDM event handler
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));

  // Register the FLOW_CDU event handler
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));

  // Register the FLOW_RENDER event handler
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    _createResources() {
  // Get the tag name from the block's meta data
        const {tagName} = this._meta;

  // Create the DOM element using the tag name
        this._element = this._createDocumentElement(tagName);
    }

    private _init() {
        this._createResources();
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

// Method to initialize the block
    protected init() {
    }

// Event handler for the FLOW_CDM event
    _componentDidMount() {
  // Call the componentDidMount() method
        this.componentDidMount();
    }

// Method to be called when the block is mounted to the DOM
    componentDidMount() {
    }

// Method to dispatch the FLOW_CDM event to the block and its children
    public dispatchComponentDidMount() {
  // Emit the FLOW_CDM event
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

  // Dispatch the event to the block's children
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    // @ts-ignore
    protected componentDidUpdate(oldProps: P, newProps: P) {
        return true;
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }

    private _render() {
        const fragment = this.render();
        this._removeEvents();

        const newElement = fragment.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        // this._element?.append(fragment);
        this._addEvents();
    }

    protected compile(template: (context: any) => string, context: any) {
        // debugger;
        const contextAndStubs = {...context};

        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(contextAndStubs);

        const temp = document.createElement('template');

        temp.innerHTML = html;

        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
            if (!stub) {
                return;
            }
            component.getContent()?.append(...Array.from(stub.childNodes));
            // console.log(component.getContent())
            stub.replaceWith(component.getContent()!);
        });
        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    getContent() {
        return this.element;
    }

    _makePropsProxy(props: P) {
        // Ещё один способ передачи this, но он больше не применяется с приходом ES6+
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = {...target}

                target[prop as keyof P] = value;

                // Запускаем обновление компоненты
                // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    _createDocumentElement(tagName: string) {
        // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
        return document.createElement(tagName);
    }

    show() {
        this.getContent()!.style.display = "block";
    }

    hide() {
        this.getContent()!.style.display = "none";
    }
}

export default Block;
