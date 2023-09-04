import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { useAxios } from "../../../hooks/useAxios";
import CheckBox from "./Checkbox";
let notifyUser = [];

const UsersListModal = ({ guideId, usersList, setUsersList, refetch }) => {
  const { data } = useAxios({ url: "/users", method: "get" });
  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/user-guides/bulk`, {
        guide_id: guideId,
        user_id: notifyUser,
      });
      toast.success("Ushbu Guide belgilangan foydalanuvchilarga yuborildi.");
      setUsersList({ isOpen: false });
      notifyUser = [];
      refetch();
    } catch (error) {
      console.log(error);
      if (error.response?.status == 400) {
        error.response?.data.message.map((err) => {
          toast.error(err);
        });
      }
    }
  };

  const handleCheck = (valueCheckBox) => {
    const value = valueCheckBox.target.name;
    notifyUser.includes(value)
      ? (notifyUser = notifyUser.filter((item) => item !== value))
      : notifyUser.push(value);
  };
  return (
    <Modal
      hideBackdrop={false}
      open={usersList.isOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form
        onSubmit={submit}
        className="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 w-96 p-10 rounded-xl "
      >
        <h2 className="text-2xl text-center text-primary font-bold">
          Update Guide
        </h2>
        {data.data?.map((user) => {
          return (
            <div key={user.id} className="flex items-center justify-between">
              <strong className="text-primary">{user.username}</strong>
              <CheckBox username={user.id} handleCheck={handleCheck} />
            </div>
          );
        })}
        <div className="flex justify-end gap-3">
          <Button
            onClick={() => {
              setUsersList({ isOpen: false });
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

export default UsersListModal;
