const p = Promise.reject(new Error("error and rejection"));
p.catch((error) => console.log("result:", error));
