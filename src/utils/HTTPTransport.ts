export enum METHODS {
    GET,
    POST ,
    PUT ,
    PATCH ,
    DELETE
}

type Options = {
    method: Method;
    data?: any;
};

// создаем тип метода
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
    }

    get: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.GET}, options.timeout)
    )
    // используем тип и удаляем дублирование в аргументах
    put: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.PUT}, options.timeout)
    )
    // используем тип и удаляем дублирование в аргументах
    post: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.POST}, options.timeout)
    )
    // используем тип и удаляем дублирование в аргументах
    delete: HTTPMethod = (url, options = {}) => (
        this.request(url, {...options, method: METHODS.DELETE}, options.timeout)
    )

    private request<Response>(url: string, options: Options = {method: Method.Get}): Promise<Response> {
        const {method, data} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);

            xhr.onreadystatechange = (e) => {

                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status < 400) {
                        resolve(xhr.response);
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            xhr.onabort = () => reject({reason: 'abort'});
            xhr.onerror = () => reject({reason: 'network error'});
            xhr.ontimeout = () => reject({reason: 'timeout'});

            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.withCredentials = true;
            xhr.responseType = 'json';

            if (method === Method.Get || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
