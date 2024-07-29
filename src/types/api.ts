export interface RequestType {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
}

export interface ResponseType<T> {
    data: T;
}
