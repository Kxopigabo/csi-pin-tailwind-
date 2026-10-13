"use client";

import { Toggle } from "@/components/tailgrids/core/toggle";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/tailgrids/core/native-select";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "@/components/tailgrids/core/table";
import { Pagination } from "@/components/tailgrids/core/pagination";
import { Spinner } from "@/components/tailgrids/core/spinner";
import { Button } from "@/components/tailgrids/core/button";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { Backdrop } from "@/components/tailgrids/core/overlay";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { TextField } from "@/components/tailgrids/core/text-field";

import { Check, ClockThree, Plus, Trash1 } from "@tailgrids/icons";
import { Badge } from "@/components/tailgrids/core/badge";

import { fetchTodos, TodoType } from "@/app/data/todos";

//states
export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const [todosRaw, setTodosRaw] = useState<TodoType[]>([]);
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [showOnlyWaiting, setShowOnlyWaiting] = useState(false);
  const [itemsPerPage, setitemsPerPage] = useState(5);
  const [totalPages, settotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [showDialogOpen, setshowDialogOpen] = useState(false);

  // localStorage
  useEffect(() => {
    const _todoRawStr = localStorage.getItem("todosRaw");
    if (_todoRawStr === null) { 
      fetchTodos()
        .then((data) => setTodosRaw(data as TodoType[]))
        .catch((error) => setTodosRaw([]))
        .finally(() => setIsLoading(false));
    } else {
      setTodosRaw(JSON.parse(_todoRawStr));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("todosRaw", JSON.stringify(todosRaw));
  }, [todosRaw]);

  // onload
  // useEffect(() => {
  //   fetchTodos()
  //     .then((data) => setTodosRaw(data as TodoType[]))
  //     .catch((error) => setTodosRaw([]))
  //     .finally(() => setIsLoading(false));
  // }, []);

  //todosRaw => [] => todos
  useEffect(() => {
    // console.log(todosRaw);

    showOnlyWaiting
      ? setTodos(todosRaw.filter((todo) => todo.completed === false))
      : setTodos(todosRaw);
  }, [todosRaw, showOnlyWaiting]);

  // itemsPerPage => [] => totalPages
  useEffect(() => {
    // console.log(itemsPerPage);
    settotalPages(Math.ceil(todos.length / itemsPerPage));
  }, [itemsPerPage, todos]);

  //totalPages => [] => currentPage
  useEffect(() => {
    if (totalPages > 0 && currentPage === 0) {
      setCurrentPage(1);
    } else if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  //delete todo
  const deleteTodo = (id: number) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };
  //make todo done
  const makeDone = (id: number) => {
    // console.log(`make tofo done...(${id})`);
    const selected = todosRaw.find((todo) => todo.id === id);
    if (selected) {
      selected!.completed = true;
      setTodosRaw([...todosRaw]);
    }
  };
  //add todo
  const addTodo = () => {
    console.log("add todo.......");
    const titleDom = document.getElementById("title") as HTMLInputElement;
    const newId = todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1;

    // validate
    const titleStr = titleDom.value.trim();
    if (titleStr === "") return;

    const newTodo: TodoType = {
      userId: 1,
      id: newId,
      title: titleDom.value.trim(),
      completed: false,
    };
    setTodosRaw([...todosRaw, newTodo]);
  };

  return (
    <>
      {/* todos contenr */}
      <div className="mt-4 px-2 max-w-3xl  mx-auto">
        {/* controll */}
        <div className="flex justify-between mt-4">
          {/* toggle */}
          <div className="flex items-center ">
            <Toggle
              label="Show only "
              checked={showOnlyWaiting}
              onChange={(e) => setShowOnlyWaiting(e.target.checked)}
            />
            &nbsp;
            <button className="flex items-center gap-2 text-white-100 h-8 p-2 bg-yellow-500 pointer-events-none rounded-md">
              Waiting
              <ClockThree />
            </button>
          </div>
          {/* dorpdow */}
          <div className="w-2/5">
            <NativeSelect
              value={itemsPerPage}
              onChange={(e) => setitemsPerPage(Number(e.target.value))}
            >
              <NativeSelectOption value={5}>
                5 items per page
              </NativeSelectOption>
              <NativeSelectOption value={10}>
                10 items per page
              </NativeSelectOption>
              <NativeSelectOption value={50}>
                50 items per page
              </NativeSelectOption>
            </NativeSelect>
          </div>
        </div>
        {/* table */}
        <div className="mt-4">
          <TableRoot>
            <TableHeader>
              <TableRow className="bg-black text-white-100 ">
                <TableHead className="w-24 font-bold text-center">ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead></TableHead>
                <TableHead className="flex justify-end items-center gap-2 ">
                  Completed
                  <Button
                    variant="primary"
                    className="h-8 p-1"
                    onClick={() => setshowDialogOpen(true)}
                  >
                    <Plus />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* show spiner by lording */}
              {isLoading && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <Spinner className="mx-auto" />
                  </TableCell>
                </TableRow>
              )}

              {!isLoading && todos.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4}>
                    <p className="text-center text-red-500">
                      No data, may be connection refused ( reload again )
                    </p>
                  </TableCell>
                </TableRow>
              )}

              {/* render data */}
              {todos
                .filter((todo, index) => {
                  const lower = (currentPage - 1) * itemsPerPage;
                  const upper = currentPage * itemsPerPage - 1;
                  return index >= lower && index <= upper;
                })
                .map((todo) => {
                  return (
                    <TableRow key={todo.id}>
                      <TableCell>
                        <Badge
                          size={"lg"}
                          className="rounded-lg bg-gray-600 text-white font-bold"
                        >
                          {todo.id}
                        </Badge>
                      </TableCell>
                      <TableCell>{todo.title}</TableCell>
                      <TableCell></TableCell>
                      <TableCell className="flex justify-end gap-1 mt-4">
                        {todo.completed ? (
                          <button className="h-8 p-2 bg-green-700 text-white-100 flex justify-end items-center gap-2 rounded-lg">
                            Done
                            <Check />
                          </button>
                        ) : (
                          <button
                            className="h-8 p-2 bg-yellow-500 hover:bg-yellow-700 text-white-100 flex justify-end items-center gap-2 rounded-lg"
                            onClick={() => makeDone(todo.id)}
                          >
                            Waiting
                            <ClockThree />
                          </button>
                        )}

                        <button
                          className="h-8 p-2 bg-red-500 hover:bg-red-700 text-white-100 flex justify-end items-center gap-2 rounded-lg"
                          onClick={() => deleteTodo(todo.id)}
                        >
                          <Trash1 />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}

              {/* completed = false */}
              {/* <TableRow>
              <TableCell>
                <Badge
                  size="lg"
                  className="rounded-lg bg-gray-600 text-white font-bold"
                >
                  1
                </Badge>
              </TableCell>
              <TableCell>ewewewe</TableCell>
              <TableCell></TableCell>
              <TableCell className="flex justify-end gap-1">
                <button className="h-8 p-2 bg-yellow-500 hover:bg-yellow-700 text-white-100 flex justify-end items-center gap-2 rounded-lg">
                  Waiting
                  <ClockThree />
                </button>
                <button className="h-8 p-2 bg-red-500 hover:bg-red-700 text-white-100 flex justify-end items-center gap-2 rounded-lg">
                  <Trash1 />
                </button>
              </TableCell>
            </TableRow> */}

              {/* completed = true */}
              {/* <TableRow>
              <TableCell>
                <Badge
                  size="lg"
                  className="rounded-lg bg-gray-600 text-white font-bold"
                >
                  2
                </Badge>
              </TableCell>
              <TableCell>weww</TableCell>
              <TableCell></TableCell>
              <TableCell className="flex justify-end gap-1">
                <button className="h-8 p-2 bg-green-700 text-white-100 flex justify-end items-center gap-2 rounded-lg">
                  Waiting
                  <Check />
                </button>
                <button className="h-8 p-2 bg-red-500 hover:bg-red-700 text-white-100 flex justify-end items-center gap-2 rounded-lg">
                  <Trash1 />
                </button>
              </TableCell>
            </TableRow> */}
            </TableBody>
          </TableRoot>
        </div>
        {/* pagination */}
        {todos.length > 0 && (
          <div className="mt-1 w-1/3 mx-auto flex justify-center items-center gap-1">
            <Button
              size="sm"
              appearance="outline"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              First
            </Button>
            <div>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                sideLayout="icon"
              />
            </div>
            <Button
              size="sm"
              appearance="outline"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </Button>
          </div>
        )}
      </div>

      <Backdrop isOpen={showDialogOpen} onOpenChange={setshowDialogOpen}>
        <Dialog>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Plus className="bg-blue-100 rounded-md p-1" size={32} /> New todo
            </DialogTitle>
          </DialogHeader>

          <DialogBody>
            <form className="flex flex-col gap-4">
              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">ID (Auto Generated)</Label>
                <Input
                  className="w-full pointer-events-none bg-gray-200"
                  value={
                    todosRaw.reduce((p, t) => (t.id > p ? t.id : p), 0) + 1
                  }
                />
              </TextField>

              <TextField className="flex flex-col gap-1.5">
                <Label className="font-bold">Title</Label>
                <Input
                  placeholder="ใส่งานที่ต้องการเพิ่ม"
                  className="w-full"
                  autoFocus
                  id="title"
                />
              </TextField>
            </form>
          </DialogBody>

          <DialogFooter>
            <DialogClose appearance="outline">Cancel</DialogClose>
            <DialogClose onClick={() => addTodo()}>Add todo</DialogClose>
          </DialogFooter>
        </Dialog>
      </Backdrop>
    </>
  );
}
