import { Client } from "pg";
import { program } from "commander";

const client = new Client({
  user: "postgres",
  password: "thuan",
  host: "localhost",
  port: 5432,
  database: "todo",
});

interface Todo {
  id: number;
  content: string | null;
  state: string | null;
}

function getList(state: string): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    let SQL = `SELECT * FROM todo_item`;
    if (state != "all") {
      SQL += ` WHERE state='${state === "all" ? null : state}'`;
    }
    client.query(SQL, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(result.rows);
    });
  });
}

function addNew(content: string) {
  return new Promise((resolve, reject) => {
    client.query(
      `INSERT INTO todo_item (content, state) VALUES ('${content}', 'pending')`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      },
    );
  });
}

function deleteTodo(id: string) {
  return new Promise((resolve, reject) => {
    client.query(`DELETE from todo_item WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });
}

function done(id: string) {
  return new Promise((resolve, reject) => {
    client.query(
      `UPDATE todo_item SET state = 'done' WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      },
    );
  });
}

function start() {
  return client.connect();
}

start().then(async () => {
  new Promise((resolve, reject) => {
    try {
      program
        .option("-n, --new <todo>", "Add new todo")
        .action(async (options) => {
          resolve(await addNew(options.new));
        });

      program
        .option("-l, --list <state>", "List todo")
        .action(async (options) => {
          const list = await getList(options.list);
          console.log(list);
          resolve(list);
        });

      program.parse();
    } catch (err) {
      reject(err);
    }
  }).then(() => client.end());

  // const [, , action, ...args] = process.argv;
  //
  // switch (action) {
  //   case "--version": {
  //     console.log((await import("./package.json")).version);
  //     break;
  //   }
  //
  //   case "--delete": {
  //     const id = args[0];
  //     if (!id) {
  //       console.error("Id do not exists!");
  //       return;
  //     }
  //
  //     await deleteTodo(id);
  //     console.log("Performed successfully");
  //     break;
  //   }
  //   case "--done": {
  //     const id = args[0];
  //     if (!id) {
  //       console.error("Id do not exists!");
  //       return;
  //     }
  //     await done(id);
  //
  //     console.log("Performed successfully");
  //     break;
  //   }
  //   case "--new": {
  //     await addNew(args[0]);
  //
  //     console.log("Performed successfully");
  //     break;
  //   }
  //   case "--list": {
  //     const state = args[0] ?? "all";
  //
  //     console.log(
  //       (await getList(state)).map(
  //         ({ id, content, state }) => `${id}:${content}-${state}`,
  //       ),
  //     );
  //
  //     break;
  //   }
  //
  //   default:
  //     console.warn("Action does not exist");
  // }
});

