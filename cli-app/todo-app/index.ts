import { Client } from "pg";
import { program } from "commander";
import ora from "ora";

program.version("0.0.1").description("To do app with PostgreSQL");

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
  const spinner = ora("Listing...");
  return new Promise((resolve, reject) => {
    let SQL = `SELECT * FROM todo_item`;
    if (state != "all") {
      SQL += ` WHERE state='${state === "all" ? null : state}'`;
    }
    spinner.start();
    client.query(SQL, (err, result) => {
      if (err) {
        reject(err);
        spinner.fail(err.message);
        return;
      }

      resolve(result.rows);
      spinner.succeed();
    });
  });
}

function addNew(content: string) {
  const spinner = ora("Adding...");
  return new Promise((resolve, reject) => {
    spinner.start();
    client.query(
      `INSERT INTO todo_item (content, state) VALUES ('${content}', 'pending')`,
      (err, result) => {
        if (err) {
          reject(err);
          spinner.fail(err.message);
        }
        resolve(result);
        spinner.succeed("Added!");
      },
    );
  });
}

function deleteTodo(id: string) {
  const spinner = ora("Deleting...");
  return new Promise((resolve, reject) => {
    spinner.start();
    client.query(`DELETE from todo_item WHERE id = ${id}`, (err, result) => {
      if (err) {
        reject(err);
        spinner.fail(err.message);
      }
      resolve(result);
      spinner.succeed("Deleted!");
    });
  });
}

function done(id: string) {
  const spinner = ora("Done...");
  return new Promise((resolve, reject) => {
    spinner.start();
    client.query(
      `UPDATE todo_item SET state = 'done' WHERE id = ${id}`,
      (err, result) => {
        if (err) {
          reject(err);
          spinner.fail(err.message);
        }
        resolve(result);
        spinner.succeed();
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
        .option("-l, --list <state>", "List todo")
        .option("-d, --delete <id>", "Delete todo")
        .option("--done <id>", "Done todo")
        .parse();

      const options = program.opts();

      if (options.new) {
        addNew(options.new).then(() => resolve("ok"));
      } else if (options.list) {
        getList(options.list).then((list) => {
          console.log(list);
          resolve("ok");
        });
      } else if (options.delete) {
        deleteTodo(options.delete).then(() => resolve("ok"));
      } else if (options.done) {
        done(options.done).then(() => resolve("ok"));
      }
    } catch (err) {
      reject(err);
    }
  }).then(() => client.end());
});
