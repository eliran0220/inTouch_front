export interface IUserDto {
    email : string,
    first_name : string,
    last_name : string,
    password : string,
    created_at : string
}

export interface IPostDto {
    post_id : string
    title : string,
    created_at : Date,
};