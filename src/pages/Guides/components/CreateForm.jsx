import { Button, TextField } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openState, openStateGuide } from "../../../store/openStateSlice";
import { StyledTextarea } from "./CustomTextArea";

const CreateForm = ({ refetch }) => {
  const dispatch = useDispatch();
  const { isOpenGuide } = useSelector((state) => state.openStateGuide);

  const { register, handleSubmit, reset } = useForm();

  const submit = async (formData) => {
    try {
      await axios.post("/guides", formData);
      toast.success("Foydalanuvchi muvaffaqiyatli qo'shildi.");
      dispatch(openStateGuide(false));
      reset();
      refetch();
    } catch (error) {
    toast.error(err.response?.data.message)
      // if (error.response?.status == 502) {
      //   toast.error(error.response.data.message);
      // }
      // if (error.response.status == 400) {
      //   error.response?.data.message.map((err) => {
      //     toast.error(err);
      //   });
      // }
    }
  };

  return (
    <Modal
      hideBackdrop={false}
      open={isOpenGuide}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
      >
        <h2 className="text-2xl text-center text-primary font-bold">
          Create Guide
        </h2>

        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "#514EF3",
              },
            },
          }}
          {...register("title", { required: true })}
          InputProps={{
            style: { borderRadius: "25px" },
          }}
          variant="outlined"
          size="small"
          label="Title"
        />
        <StyledTextarea
          {...register("content", { required: true })}
          style={{ width: 304 }}
          aria-label="minimum height"
          minRows={2}
          placeholder="Content"
        />
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              dispatch(openStateGuide(false));
              reset();
            }}
            color="inherit"
            variant="contained"
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateForm;
