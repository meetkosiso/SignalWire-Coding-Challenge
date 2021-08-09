import axios from "axios";

const webHookSite = "https://webhook.site/1b5a66d3-f3a8-461c-a2aa-2c9a4dfb71b9";

interface IResponse {
  message: string;
  isError: boolean;
}

export async function sendWebHook(tag: string): Promise<IResponse> {
  const response = await axios
    .get(`${webHookSite}?tag=${tag}`)
    .catch((err) => err);

  if (response instanceof Error) {
    return { message: "An error occurred", isError: true };
  }

  return { message: "Request was sent successfully", isError: false };
}
