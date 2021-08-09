export interface ITicket {
  user_id: string;
  title: string;
  createdAt: string;
}

export interface IField {
  user_id: string;
  title: string;
  tags: string[];
}

interface IValidation extends IField {
  error?: string;
  isError: boolean;
  createdAt: string;
}

export const tagStore: Record<string, number> = {};
export const ticketStore: ITicket[] = [];

export function createTicket(ticket: ITicket): void {
  const { user_id, title, createdAt } = ticket;

  const ticketObject: ITicket = { user_id: "", title: "", createdAt: "" };

  if (ticket.user_id !== undefined) {
    ticketObject.user_id = user_id;
  }

  if (ticket.title !== undefined) {
    ticketObject.title = title;
  }

  if (ticket.createdAt !== undefined) {
    ticketObject.createdAt = createdAt;
  }

  ticketStore.push(ticketObject);
}

export function createTag(tags: string[]): void {
  for (let i = 0; i < tags.length; i += 1) {
    const tag = tags[i].toLowerCase();

    if (tagStore[tag] !== undefined) {
      tagStore[tag] += 1;
    } else {
      tagStore[tag] = 1;
    }
  }
}

export function validation(field: IField): IValidation {
  const { user_id, title, tags } = field;
  const invalidPayload = { user_id: "", title: "", createdAt: "", tags: [] };

  if (user_id === "" || user_id === undefined) {
    return {
      error: "user_id field is required",
      ...invalidPayload,
      isError: true,
    };
  }

  if (title === "" || title === undefined) {
    return {
      error: "title field is required",
      ...invalidPayload,
      isError: true,
    };
  }

  if (tags === undefined) {
    return {
      error: "tags field is required",
      ...invalidPayload,
      isError: true,
    };
  }

  if (tags !== undefined && tags.length >= 5) {
    return {
      error: "tags must be less than 5",
      ...invalidPayload,
      isError: true,
    };
  }

  return {
    user_id,
    title,
    tags,
    createdAt: new Date().toISOString(),
    isError: false,
  };
}

export function mostOccurrentTag(tagDB: Record<string, number>): string {
  let maxOccurrence = 0;
  let maxTag = "";

  const tags = Object.keys(tagDB);

  for (let i = 0; i < tags.length; i += 1) {
    const occurrence = tagDB[tags[i]];

    if (occurrence > maxOccurrence) {
      maxOccurrence = occurrence;
      maxTag = tags[i];
    }
  }

  return maxTag;
}
