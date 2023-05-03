//interface for todo elements
export interface todoEl{
    id: number;
    content: string;
    status: status
}
//status for element
export enum status{
    DONE = "DONE",
    UNDONE = "UNDONE"
}