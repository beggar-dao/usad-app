class EventManager {
  private subscribers: { [event: string]: any[] } = {};
  subscribe(event: string, callback: (data: any) => void): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);
  }

  unsubscribe(event: string, callback: (data: any) => void): void {
    if (this.subscribers[event]) {
      this.subscribers[event] = this.subscribers[event].filter(
        (cb) => cb !== callback,
      );
    }
  }

  publish(event: string, data?: any): void {
    if (this.subscribers[event]) {
      this.subscribers[event].forEach((callback) => callback(data));
    }
  }
}

const eventManager = new EventManager();

console.log('eventManager', eventManager);

export default eventManager;
