import React from "react";
import { Button } from "@/components/ui/button";
import FileUploadModal from "@/components/file-upload-modal";

export default function Home() {
  return (
    <main className="min-h-screen p-24 mx-auto">
      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center font-mono ">
        <p className="text-3xl font-bold">
          Marvey AI - Pitch Deck to Contract in Seconds.
        </p>
        <FileUploadModal />
      </div>
    </main>
  );
}
