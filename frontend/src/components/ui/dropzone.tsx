"use client";

import * as React from "react";
import { UploadCloud, File, X, CheckCircle2, AlertCircle } from "lucide-react";

interface DropzoneProps {
  onFilesSelected?: (files: File[]) => void;
  maxFiles?: number;
  accept?: string; // e.g. "image/*,.pdf"
}

export function Dropzone({
  onFilesSelected,
  maxFiles = 3,
  accept = "*",
}: DropzoneProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleFiles = (incomingFiles: FileList | null) => {
    if (!incomingFiles) return;
    setError(null);

    const newFiles = Array.from(incomingFiles);

    if (files.length + newFiles.length > maxFiles) {
      setError(`You can only upload up to ${maxFiles} file${maxFiles > 1 ? "s" : ""}.`);
      return;
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    if (onFilesSelected) onFilesSelected(updatedFiles);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    const updated = files.filter((_, i) => i !== index);
    setFiles(updated);
    if (onFilesSelected) onFilesSelected(updated);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      {/* Drop Zone Box */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-accent-primary bg-accent-primary/10 shadow-lg scale-[1.01]"
            : "border-subtle bg-surface hover:border-accent-primary/50 hover:bg-page hover:shadow-xs"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple={maxFiles > 1}
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />

        {/* Floating Animated Icon Badge */}
        <div
          className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${
            isDragging
              ? "bg-accent-primary text-white shadow-md shadow-accent-primary/30"
              : "bg-page text-accent-primary border border-subtle group-hover:border-accent-primary/30"
          }`}
        >
          <UploadCloud className="h-6 w-6" />
        </div>

        {/* Main Text */}
        <div className="space-y-1">
          <p className="text-sm font-semibold text-text-primary">
            <span className="text-accent-primary hover:underline">
              Click to upload
            </span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-text-secondary">
            SVG, PNG, JPG, PDF or GIF (max {maxFiles} files)
          </p>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 rounded-lg bg-accent-error/10 p-3 text-xs font-semibold text-accent-error border border-accent-error/20">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Uploaded File Items List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              Attached Files ({files.length}/{maxFiles})
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="group flex items-center justify-between gap-3 rounded-lg border border-subtle bg-page p-3 transition-all hover:border-accent-primary/30 hover:bg-surface hover:shadow-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
                    <File className="h-4.5 w-4.5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-text-primary">
                      {file.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-accent-secondary" />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-text-secondary transition-colors hover:bg-page hover:text-accent-error cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}