const { fork } = require("node:child_process");
const { resolve } = require("node:path");
const { randomUUID } = require("node:crypto");
const { faker } = require("@faker-js/faker");

const FORKS_TO_CREATE = 5;

Array.from({ length: FORKS_TO_CREATE }).forEach(() => {
  const data = {
    name: faker.person.fullName(),
    id: randomUUID(),
  };

  const abortController = new AbortController();

  const { signal } = abortController;

  /** Usado quando há tarefas demoradas e que podem ser executadas em paralelo, evitando bloqueio da thread
   * do Nodejs. Cada fork é um novo processo, logo possui seu próprio espaço de memória.
   * A ordem de execução é determinada pelo SO e é não determinística
   */
  const child = fork(resolve(__dirname, "cp.js"), { signal });

  child.send(data);

  child.on("message", (msg) => {
    console.log(`dados recebidosss, pid: ${child.pid}`);
    console.log(msg);
    // setTimeout(() => {
    //   child.kill();
    // }, 5000);
  });
});
