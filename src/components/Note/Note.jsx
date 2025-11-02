"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Pencil, Trash } from "lucide-react";

export default function Note({ title, description, onEdit, onDelete }) {
  return (
    <Card className="w-full bg-white border border-gray-200 shadow-sm rounded-lg">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-800">{title}</CardTitle>
        <CardDescription className="text-gray-600">{description}</CardDescription>
      </CardHeader>

      <CardFooter className="flex items-center gap-4 px-6">
        <button
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700 transition"
          title="Edit"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={onDelete}
          className="text-red-500 hover:text-red-700 transition"
          title="Delete"
        >
          <Trash size={18} />
        </button>
      </CardFooter>
    </Card>
  );
}
