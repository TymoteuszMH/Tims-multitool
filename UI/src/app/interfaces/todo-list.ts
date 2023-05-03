import { todoEl } from "./todo-element";

//interface for todo list
export interface todoLi{
    id: number;
    title: string;
    date: Date;
    todoElement: todoEl[];
    createdAt: Date;
    updatedAt: Date;
}