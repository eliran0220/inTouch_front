interface Route {
    method : string,
    url : string,
    action : string,
    controller: string,
    middlewares? : Function[]
}