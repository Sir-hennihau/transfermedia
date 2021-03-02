import autobahn from "autobahn";
import { Media, WebsocketStateResponse } from "./types";

/**
 * Converts websocket response to a frontend-friendly format.
 */
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

/**
 * Helper function that returns default websocket connection.
 */
export const createConnection = () =>
  new autobahn.Connection({
    url: "ws://testassignment.filmdatabox.com:8250/ws",
    realm: "democontrol",
  });
