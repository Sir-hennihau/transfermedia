import { Media, WebsocketStateResponse } from "./types";

export const getMediaFromWebsocketStateResponse = (
  websocketStateResponse: WebsocketStateResponse
): Media[] =>
  websocketStateResponse.media.map(
    ({ description, is_attached, label, name }) => ({
      description,
      isAttached: is_attached,
      label,
      name,
    })
  );
