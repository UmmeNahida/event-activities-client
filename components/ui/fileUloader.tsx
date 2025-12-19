"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
  };

  const openPicker = () => {
    inputRef.current?.click();
  };

  const removeImage = () => {
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="flex items-center space-x-5 p-3">
      {/* IMAGE PREVIEW */}
      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
        {file ? (
          <Image
            src={URL.createObjectURL(file)}
            width={48}
            height={48}
            alt="preview"
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-gray-400 text-xs">No img</span>
        )}
      </div>

      {/* BUTTON + FILE INFO */}
      <div className="flex flex-col">
        <Button
          variant="secondary"
          className="rounded-full text-black"
          onClick={openPicker}
        >
          Upload image
        </Button>

        <input
          ref={inputRef}
          type="file"
          onChange={handleChange}
          accept="image/*"
          className="hidden"
        />

        {file && (
          <div className="text-sm mt-1 flex gap-2 items-center">
            <span className="text-gray-300">{file.name}</span>
            <button
              onClick={removeImage}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
