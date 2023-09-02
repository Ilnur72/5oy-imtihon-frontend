import { Avatar, IconButton } from "@mui/material";
import React from "react";
import iconEdit from "../../assets/ActionIcon/edit.svg";
import { useParams } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import UpdateForm from "../../components/CostomForm/UpdateForm";

const Profile = () => {
  const [showUser, setShowUser] = React.useState({ isOpen: false });
  const { id } = useParams();
  const {
    data: { data, refetch },
  } = useAxios({ url: `/users/${id}`, method: "get" });

  return (
    <section className="" style={{ backgroundColor: "#fff" }}>
      <UpdateForm
        showUser={{ ...showUser, data: data }}
        setShowUser={setShowUser}
        refetch={refetch}
      />
      <div className="py-5 mt-5">
        <div className="flex g-4">
          <div className="w-4/12 flex flex-col items-center justify-center gap-4 text-center text-white">
            <Avatar sx={{ width: 200, height: 200 }} />
            <div>
              <strong className="text-2xl text-primary">
                {data?.first_name} {data?.last_name}
              </strong>
            </div>
            <IconButton
              onClick={() => {
                setShowUser({ isOpen: true });
              }}
              aria-label="edit"
              size="medium"
              sx={{
                mx: 1,
                width: "55px",
                height: "55px",
                border: "1px solid #EAEEF4",
                "&:hover": {
                  backgroundColor: "#514EF3",
                  "& > img": {
                    filter: "brightness(2000%)",
                  },
                },
              }}
            >
              <img src={iconEdit} alt="" />
            </IconButton>
          </div>
          <div className="flex items-center gap-10 text-2xl">
            <div className="flex flex-col gap-4 text-primary">
              <strong>First Name:</strong>
              <strong>Last Name:</strong>
              <strong>Age:</strong>
              <strong>Username:</strong>
              <strong>Role:</strong>
            </div>
            <div className="flex flex-col gap-4 text-primary">
              <strong>{data?.first_name}</strong>
              <strong>{data?.last_name}</strong>
              <strong>{data?.age}</strong>
              <strong>{data?.username}</strong>
              <strong>{data?.role}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
