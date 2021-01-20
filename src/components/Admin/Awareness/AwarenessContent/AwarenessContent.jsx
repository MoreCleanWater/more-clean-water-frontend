import { Grid } from "@material-ui/core";
import { useState } from "react";
import css from "../../Admin.module.scss";
import EditForm from "../../EditForm";

export default function AwarenessContent() {
  const [mode, setMode] = useState("create");

  const fields = [
    { label: "Category", name: "category", type: "combobox" },
    { label: "Title", name: "title", type: "text" },
    { label: "Subtitle", name: "subtitle", type: "text" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Additional Content", name: "content", type: "textarea" },
  ];

  const handleCancel = (e) => setMode('retrieve');

  const handleSubmit = (e, data) => {
      console.log(data)
      if (mode==='create') create(data);
      if (mode==='update') update(data);
  }

  const create = (e) => console.log(e);
  const update = (e) => console.log(e);

  return (
    <Grid container justify="center">
      <Grid item xs={10} md={8} className={css.container}>
        <h2 className="center">Content</h2>
        <EditForm
          className={css.editForm}
          mode={mode}
          fields={fields}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
          style={{ display: mode !== "retrieve" ? "flex" : "none" }}
          row= ""
        />
      </Grid>
    </Grid>
  );
}
