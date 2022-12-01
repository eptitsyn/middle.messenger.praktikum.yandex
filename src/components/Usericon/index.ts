import { Block } from "../../utils/Block";
import template from "./usericon.hbs";

interface UsericonProps {
    src?: string;
}

export class Usericon extends Block {
    constructor(props: UsericonProps) {
        if (!props.src) {
            props.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCABkAGQDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAQII/8QAMRAAAQMDAQUIAQMFAAAAAAAAAQACAwQFESEGEjFBURZhcYGRk6HhIhNSsRQjMsHw/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAIB/8QAFhEBAQEAAAAAAAAAAAAAAAAAAAER/9oADAMBAAIRAxEAPwD9RoiKkiIiAiIgIiICIiAiIgIiICIiAiIgE4BJIAGpJ5KGr9pLfTPMcZfUOB1/TA3QfE8fLKidrbu+Wd1vp3kRRnEpB/zPMZ6D5Pgq6tkZatse1tOXYkopWt6teCfTRTNuuNHcGE0socQPyYRhzfEHl3jRc5X3BNLTzNmhe6ORpy1wOoP/AHJbjNdORaFiuLblQCbAbK07srRwDscR3Eaj05LfUqEREBERAREQFhrpv6einqOccbnjyBI+cLMtW8RmW1VcbdS6FwA6nGf9IOcElxLnEkk6k888SiZ0+UVoEREE9sRO6O6vgz+MsRyO9uoPplXNUfY2MuvjHDOGRvJ8xgfJV4U1UERFjRERAREQE46aEdDzREHPb/b3W64PiDT+k4l0R5FpPDxHD06rQXSLjRU9wpzBUM3gdWkaOaeoPIqpXHZqtp3Ewvjnj5ZcGu8wTj0KqVNiERb8dmuMjt0U4B6ukaB65U/ZtmWQvbUVzmyuactjbqwd5PPw4eKaYy7HW91LSOq5Wlsk4/EEYIaNR6nXwwp5EUqEREBERARF8yyMijdJI4NYwFznE6ADiSg9e5rGF73BrWjJJOMDqSeCrtz2ohicY6GMTu/e7Ib5DifgKGv94muUpYwllK0/izgXd7up6Dl4qKWyMtb9XebnVEiSrka39rDuj419StBxc85cS4nmSSflEVJeADkAPJZoKmppyDDUSxkfteR8ZwsSIJyg2nr4SBUblSznvDdd6jj5hWe1XWjuLf7EhbJj8onaOHeOo7wueL2N745GyRuc17TlrmnBB6grMbrqCKF2avIuEZgnwKqMakDAe3qB1HMeamlKhERAVc24rDHTRUbHEGUl78c2g6DzP8KxqOudmo7hO2aoMu8G7o3X4GASeGO9IVz9Fdey9r61Pu/Sdl7X1qfd+lWpyqUiuvZe19an3fpOy9r61Pu/SaZVKRXXsva+tT7v0nZe19an3fpNMqlIrr2XtfWp936Tsva+tT7v0mmVT6KpkpKqOpjOHRuDh3jmPAjI810qJ7ZYmSs1a9ocD4jI/lQvZe19an3fpTFLCynpo6eMuLI27rd45OBwyeay3WyYyIiLGiIiAiIgIiICIiAiIgIiICIiD//Z";
        }
        super(props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
