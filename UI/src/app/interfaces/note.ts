import { login } from "./login";

//interface for note
export interface note{
    id: number;
    user: login;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}