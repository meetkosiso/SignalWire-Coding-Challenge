import {
  createTag,
  createTicket,
  validation,
  IField,
  ITicket,
  ticketStore,
  tagStore,
  mostOccurrentTag,
} from "./model";

interface IResponse {
  error?: string;
  success: boolean;
}

export function create(body: IField): IResponse {
  const ticket = validation(body);

  if (ticket.isError === true) {
    return { success: false, error: ticket.error };
  }

  createTicket(ticket);
  createTag(ticket.tags);

  return { success: true };
}

export function fetchTickets(): ITicket[] {
  const store = ticketStore;

  return store;
}

export function fetchTags(): Record<string, number> {
  const store = tagStore;

  return store;
}

export function fetchMostOccurrentTag(): string {
  const tags = fetchTags();

  const tag = mostOccurrentTag(tags);

  return tag;
}
