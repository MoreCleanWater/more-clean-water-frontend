import React from "react";
import ViewContent from "../../../Awareness/ViewContent";
import { useState } from "react";

export default function ContentList() {
  const [mode, setMode] = useState("list");

  const handleEdit = () => {
    alert("test");
    setMode("edit");
  };

  return (
    <div>
      {mode === "edit" && <UploadContent />}
      {mode === "list" && <ViewContent handleEdit={handleEdit} />}
    </div>
  );
}
