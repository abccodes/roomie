import React, { ChangeEvent, useState } from "react";
import "./App.css";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { RequestBody, ResponseBody } from "common";

function App() {
  const responseBody: ResponseBody = { message: "No response yet" };
  const [yourName, setYourName] = useState("Your name");
  const [response, setResponse] = useState<ResponseBody>(responseBody);

  async function handleJsonFromApi(json: any) {
    let body = plainToClass(ResponseBody, json as Object);
    let validationErrors = await validate(body);
    if (validationErrors.length > 0) {
      setResponse({
        message: `The server retrieved an object with ${validationErrors.length} validation errors.`,
      });
    } else {
      setResponse(body);
    }
  }

  async function fetchApi() {
    const requestBody: RequestBody = new RequestBody(yourName);

    const validationErrors = await validate(requestBody);
    if (validationErrors.length > 0) {
      setResponse({
        message: `The name contains ${validationErrors.length} validation errors.`,
      });
    } else {
      try {
        const response = await fetch("http://localhost:8080/api/", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(requestBody),
        });

        if (response.status === 200) {
          response.json().then(handleJsonFromApi);
        } else {
          setResponse({ message: "The server denied our request." });
        }
      } catch (e) {
        setResponse({ message: "Failed fetching from the API" });
      }
    }
  }

  return (
    <div className="App">
      <label>Name</label>
      <br />
      <input
        id="name"
        type="text"
        value={yourName}
        onChange={(changeEvent: ChangeEvent<HTMLInputElement>) => {
          setYourName(changeEvent.target.value);
        }}
      />
      <br />
      <br />
      <button onClick={() => fetchApi()}>Call API</button>
      <br />
      <br />
      <textarea
        readOnly={true}
        style={{ height: "200px" }}
        value={response.message}
      ></textarea>
    </div>
  );
}

export default App;
