import autobahn from "autobahn";
import React from "react";
import { Media as MediaType } from "../Utils/types";
import { MediaInformation } from "./Components/mediaInformation";
import { MediaTitle } from "./Components/mediaTitle";
import { MediaContainer } from "./Components/mediaWrapper";

interface MediaProps {
  media: MediaType;
}

export const Media = ({
  media: { description, isAttached, label, name },
}: MediaProps) => {
  const onClick = () => {
    const connection = new autobahn.Connection({
      url: "ws://testassignment.filmdatabox.com:8250/ws",
      realm: "democontrol",
    });

    connection.onopen = (session, details) => {
      session.call("com.filmdatabox.democontrol.change_medium", [
        name,
        !isAttached,
      ]);
    };

    connection.open();
  };
  return (
    <MediaContainer>
      <MediaTitle>{name}</MediaTitle>

      <MediaInformation>{label}</MediaInformation>

      <MediaInformation>
        {isAttached ? "attached" : "unplugged"}
      </MediaInformation>

      <MediaInformation>{description}</MediaInformation>

      <button onClick={onClick}>{isAttached ? "Unplug" : "Attach"}</button>
    </MediaContainer>
  );
};
