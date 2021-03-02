import autobahn from "autobahn";
import React, { useEffect, useState } from "react";

export const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const [subscriptionResponse, setSubscriptionResponse] = useState<string[]>(
    []
  );

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

  return (
    <div className="App">
      <h1>Film Data Box Journal</h1>
      {logs?.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};
