export class MessageManager {
  static activeRequestHandler: Map<string, AbortController> = new Map();

  static enqueueRequestHandler(
    key: string,
    handler: (signal: AbortSignal) => Promise<void>
  ) {
    const abortController = new AbortController();
    handler(abortController.signal);
    this.activeRequestHandler.set(key, abortController);
  }

  static dequeueRequestHandler(key: string) {
    const abortSignal = this.activeRequestHandler.get(key);
    if (abortSignal) {
      abortSignal.abort();
    }
    this.activeRequestHandler.delete(key);
  }

  static clearAll() {
    for (const [key] of this.activeRequestHandler) {
      this.dequeueRequestHandler(key);
    }
  }
}
