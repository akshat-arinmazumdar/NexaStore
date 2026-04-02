fetch("http://localhost:3000/api/auth/session", { method: "GET" })
  .then(async (r) => {
    const t = await r.text();
    console.log("status", r.status);
    console.log("content-type", r.headers.get("content-type"));
    console.log("len", t.length);
    console.log("body", t.slice(0, 300));
  })
  .catch((e) => {
    console.error("fetch_error", e);
    process.exit(1);
  });

