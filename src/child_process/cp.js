process.on("message", (data) => {
  console.log(
    `data a ser processada pelo processo (${process.pid}): ${JSON.stringify(
      data
    )}`
  );
});
process.send({ pid: process.pid, data: { ok: true } });
