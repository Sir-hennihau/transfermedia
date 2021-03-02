import autobahn from "autobahn";
import React, { useEffect, useState } from "react";

export const App = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [response, setResponse] = useState<string[]>([]);

  useEffect(() => {
    const connection = new autobahn.Connection({
      url: "ws://testassignment.filmdatabox.com:8250/ws",
      realm: "democontrol",
    });

    connection.onopen = (session, details) => {
      session.subscribe("com.filmdatabox.democontrol.journal", (response) => {
        setResponse(response);
      });
    };

    connection.open();
  }, []);

  useEffect(() => {
    setLogs([...logs, ...response]);
  }, [response]);

  return (
    <div className="App">
      <h1>Film Data Box Journal</h1>
      {logs?.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};
