export const subscribers: Record<string, ((data: unknown) => void)[]> = {};

export function subscribe(
  event: string,
  callback: (data: unknown) => void
): void {
  const store: (() => void)[] = [];
  if (!subscribers[event]) {
    subscribers[event] = store;
  }
  subscribers[event].push(callback);
}

export function publish(event: string, data: unknown): void {
  if (!subscribers[event]) return;
  subscribers[event].map((subscriberCallback: (arg: unknown) => void) => {
    return subscriberCallback(data);
  });
}
