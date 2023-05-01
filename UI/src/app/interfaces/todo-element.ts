//interface for todo elements
export interface todoEl{
    id: number;
    content: string;
    status: status
}
//status for element
export enum status{
    DONE = "1",
    UNDONE = "0"
}