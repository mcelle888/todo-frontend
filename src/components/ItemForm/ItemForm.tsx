import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./ItemForm.module.scss";

// zod schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
  dueDate: z.string().refine((val) => {
    const date = new Date(val);
    const now = new Date();
    return date >= now;
  }, "Please enter a valid future date and time"),
});

type FormData = z.infer<typeof schema>;

// props for component
interface ItemFormProps {
  mode?: "Create" | "Edit";
  defaultValues?: Partial<FormData>;
  onSubmit: SubmitHandler<FormData>;
}

const ItemForm: React.FC<ItemFormProps> = ({
  mode = "Create",
  defaultValues,
  onSubmit,
}) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return (
    <form className={styles.itemForm} onSubmit={handleSubmit(onSubmit)}>
      <h4>{mode === "Create" ? "Add an Item" : "Edit an Item"}</h4>
      <div className={styles.field}>
        <label>Name</label>
        <input
          className={errors.name ? styles.input_error : ""}
          type="text"
          {...register("name")}
        />
        <small className={styles.error_text}>
          {errors?.name?.message ?? "\u00A0"}
        </small>
      </div>
      <div className={styles.field}>
        <label>Description</label>
        <input type="text" {...register("description")} />
        <small className={styles.error_text}>
          {errors?.description?.message ?? "\u00A0"}
        </small>
      </div>
      <div className={styles.field}>
        <label>Due Date and Time</label>
        <input
          className={errors.dueDate ? styles.input_error : ""}
          type="datetime-local"
          {...register("dueDate")}
        />
        <small className={styles.error_text}>
          {errors?.dueDate?.message ?? "\u00A0"}
        </small>
      </div>
      <div className={styles.field}>
        <button className={styles.createItemButton} type="submit">
          {mode === "Create" ? "Add Item" : "Edit Item"}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
