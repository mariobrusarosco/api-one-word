export interface ISocketUser {
  userID: string;
  username: string;
}

export interface ISocketRoom {
  name: string;
  users: ISocketUser[];
} 