import React, { useState, Fragment } from "react";
import MqttClient from "mqtt";

var options = {
  //   protocol: "ws",
  username: "admin",
  password: "localuser",
  keepalive: 20,
  // clientId uniquely identifies client
  // choose any string you wish
  clientId: "mqttjs_" + Math.random().toString(16).substr(2, 8),
};
var client = MqttClient.connect("mqtt://localhost:1883", options);

client.subscribe("publishtopic");
console.log("Client subscribed ");

function Connection() {
  var note;
  client.on("message", function (topic, message) {
    note = message.toString();
    // Updates React state with message
    setMsg(note);
    console.log(note);
    client.end();
  });

  // Sets default React state
  const [msg, setMsg] = useState(
    <Fragment>
      <em>...</em>
    </Fragment>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello MQTT in React</h1>
        <p>The message payload is: {msg}</p>
      </header>
    </div>
  );
}
export default Connection;
