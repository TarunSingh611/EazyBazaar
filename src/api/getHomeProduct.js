function load(loaded) {
  const url = "https://localhost:3000/loadMore";

  return new Promise((resolve, reject) => {
    let res = { loaded: loaded };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(res),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Load request failed");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export default load;
