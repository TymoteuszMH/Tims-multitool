import { login } from "./login";
import { todoEl } from "./todo-element";

//interface for todo list
export interface todoLi{
    id: number;
    user: login;
    title: string;
    date: Date;
    elements: todoEl;
    createdAt: Date;
    updatedAt: Date;
}