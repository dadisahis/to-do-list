import { addNewTask, updateTask } from "./server";

(async function test() {
  await addNewTask({
    id: 12346,
    name: "My new Task",
  });
  await updateTask({
    id: 12346,
    name: "My new Task -updateds",
  });
})();
