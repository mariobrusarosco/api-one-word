export interface ISocketUser {
  userID: string;
  username: string;
  email: string;
}

export interface ISocketRoom {
  name: string;
  users: ISocketUser[];
} 