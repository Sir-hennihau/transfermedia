import autobahn from "autobahn";
import React, { useEffect, useState } from "react";

export const App = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const [subscriptionResponse, setSubscriptionResponse] = useState<string[]>(
    []
  );

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

  return (
    <div className="App">
      <h1>Film Data Box Journal</h1>
      {logs?.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
};
