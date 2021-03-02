import autobahn from "autobahn";
import React, { useEffect, useState } from "react";
import { Media } from "./Components/media";
import { getMediaFromWebsocketStateResponse } from "./Utils/api";

import { Media as MediaType, WebsocketStateResponse } from "./Utils/types";

export const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const [subscriptionResponse, setSubscriptionResponse] = useState<string[]>(
    []
  );

  const [media, setMedia] = useState<MediaType[]>();

  const MAX_LOGS_LENGTH = 50;

  useEffect(() => {
    const connection = new autobahn.Connection({
      url: "ws://testassignment.filmdatabox.com:8250/ws",
      realm: "democontrol",
    });

    connection.onopen = (session, details) => {
      session
        .call<string[]>("com.filmdatabox.democontrol.journal")
        .then((response) => {
          setLogs(response);
        })
        .catch((error) => console.log("error", error));

      session.subscribe("com.filmdatabox.democontrol.journal", (response) => {
        setSubscriptionResponse(response);
      });

      session
        .call<WebsocketStateResponse>("com.filmdatabox.democontrol.state")
        .then((response) => {
          const convertedMedia = getMediaFromWebsocketStateResponse(response);

          setMedia(convertedMedia);
        });

      session.subscribe(
        "com.filmdatabox.democontrol.state",
        (response: WebsocketStateResponse[]) => {
          console.log("response", response);

          const convertedMedia = getMediaFromWebsocketStateResponse(
            response[0]
          );
          setMedia(convertedMedia);
        }
      );
    };

    connection.open();
  }, []);

  useEffect(() => {
    setLogs([...logs, ...subscriptionResponse]);
  }, [subscriptionResponse]);

  useEffect(() => {
    if (logs.length <= MAX_LOGS_LENGTH) {
      return;
    }

    const newLogs = logs.slice(logs.length - MAX_LOGS_LENGTH, logs.length);

    setLogs(newLogs);
  });

  console.log("media", media);

  return (
    <div className="App">
      <h1>Film Data Box</h1>

      <h2>Connected Devices</h2>
      {media?.map((media, index) => (
        <Media key={index} media={media} />
      ))}

      <h2>Journal</h2>
      {logs?.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};
