export const log = (request: Request) => {
  const logMsg = [];

  const agent = request.headers.get("user-agent");
  if (agent) logMsg.push(agent);

  const referrer = request.headers.get("referer");
  if (referrer) logMsg.push(referrer);

  console.log(
    logMsg.join(" :: ") +
      " " +
      request.method +
      " " +
      new URL(request.url).pathname
  );
};
