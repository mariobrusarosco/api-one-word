export class Room {
  id: string
  title: string
  namespaceId: string
  isPrivate: boolean
  history: any[] = []

  constructor(id: string, title: string, namespaceId: string, isPrivate: boolean) {
    this.id = id
    this.title = title
    this.namespaceId = namespaceId
    this.isPrivate = isPrivate
  }

  addMessage(message: any) {
    this.history.push(message)
  }

  clearHistory() {
    this.history = []
  }
}
