import {Response, Request} from "express";

class PostsController {
    constructor() {
        console.log('Created instance of PostController')
    }

    getPost(req: Request, res: Response) {
        console.log(req.operation_id)
        res.json({message:'Post route get request'})
    }

    createPost(req: Request, res: Response) {
        res.json({message:'Post route post request', body: req.body})
    }

    deletePost(req: Request, res: Response) {
        res.json({message:'Post route delete request'})
    }
}

export default new PostsController()