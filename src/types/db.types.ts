export interface IUserDb {
    email : string,
    first_name : string,
    last_name : string,
    password : string,
    created_at : string,
    is_deleted : number,
}

export interface IPostDb {
    post_id : string
    title : string,
    created_at : Date,
};