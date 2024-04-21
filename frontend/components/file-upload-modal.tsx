"use client";

import React, { useCallback, useState, FC } from "react";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from "react-dropzone";
import { FilePlusIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { toast } from "./ui/use-toast";

const FilUploadModalSchema = z.object({
  templateName: z.string().min(2, {
    message: "Template name must be at least 2 characters.",
  }),
  templateDescription: z.string().min(2, {
    message: "Template name must be at least 2 characters.",
  }),
});

interface Props {}

export const FilUploadModal: FC<Props> = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [open, setOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  const form = useForm<z.infer<typeof FilUploadModalSchema>>({
    resolver: zodResolver(FilUploadModalSchema),
    defaultValues: {
      templateName: "",
      templateDescription: "",
    },
  });

  const files = acceptedFiles.map((file) => (
    // @ts-ignore
    <li key={file.path}>
      {/*  @ts-ignore */}
      {file.path}
      {/* {file.path} - {file.size} bytes */}
    </li>
  ));

  async function onSubmit(data: z.infer<typeof FilUploadModalSchema>) {
    try {
      setLoadingSubmit(false);
      setOpen(false);
      toast({
        title: "Successfully uploaded file! ",
      });
    } catch (err: unknown) {
      console.error(err);
      toast({
        title: "Something went wrong... ",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mt-6">Upload Template</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="templateName"
              render={({ field }) => (
                <FormItem className="my-6">
                  <FormLabel htmlFor="templateName" className="text-right">
                    File Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="templateName"
                      placeholder="Ex: Jane Doe"
                      className="col-span-3 mt-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="templateDescription"
              render={({ field }) => (
                <FormItem className="my-6">
                  <FormLabel
                    htmlFor="templateDescription"
                    className="text-right"
                  >
                    File Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="templateDescription"
                      placeholder="Ex: Jane Doe"
                      className="col-span-3 mt-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div
              {...getRootProps()}
              className="border border-gray-300 p-6 rounded-lg bg-gray-50 my-6"
            >
              {/* <PlusIcon className="mx-auto w-12 h-12 text-gray-400" /> */}
              <FilePlusIcon className="mx-auto mb-3 w-12 h-12 text-gray-400/70" />

              <input {...getInputProps()} />

              <p className="text-center text-gray-500 text-sm">
                {acceptedFiles.length
                  ? files
                  : isDragActive
                  ? "Drop the files here ..."
                  : ""}
                {!acceptedFiles.length &&
                  !isDragActive &&
                  "Drag and drop files or click to upload"}
              </p>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-center">
              <Button
                type="submit"
                disabled={
                  !!form?.formState?.errors?.templateDescription ||
                  !!form?.formState?.errors?.templateName ||
                  loadingSubmit
                }
              >
                Upload
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default FilUploadModal;
