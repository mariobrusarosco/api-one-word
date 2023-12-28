export class Namespace {
  id: string
  name: string
  rooms: any[]

  constructor(id: string, name: string) {
    this.id = id
    this.name = name
    this.rooms = []
  }

  addRoom(room: any) {
    this.rooms.push(room)
  }
}
