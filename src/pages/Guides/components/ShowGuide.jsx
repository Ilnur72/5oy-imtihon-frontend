import { Avatar, Button, IconButton } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import iconEdit from "../../../assets/ActionIcon/edit.svg";
import iconBack from "../../../assets/back.svg";
import { useAxios } from "../../../hooks/useAxios";
import UpdateForm from "./UpdateForm";
import UsersListModal from "./UsersListModal";

const ShowGuide = () => {
  const navigate = useNavigate();
  const [usersList, setUsersList] = React.useState({ isOpen: false });
  const { guide_id } = useParams();
  const {
    data: { data },
    refetch,
  } = useAxios({ url: `/guides/${guide_id}`, method: "get" });
  return (
    <section className="" style={{ backgroundColor: "#fff" }}>
      <UsersListModal
        guideId={guide_id}
        usersList={{ ...usersList }}
        setUsersList={setUsersList}
        refetch={refetch}
      />
      <div className="py-4">
        <div className="flex justify-between items-center pb-4">
          <strong className="text-lg text-primary">
            total: {data?.revisions} ta user ga biriktirilgan
          </strong>
          <Button
            onClick={() => setUsersList({ isOpen: true })}
            sx={{
              background: "#4b48e2",
              ":hover": { background: "#514eec" },
              borderRadius: "70px",
              paddingX: "20px",
              paddingY: "10px",
            }}
            variant="contained"
          >
            Send to User
          </Button>
        </div>
        <hr />
        <div className=" flex justify-center items-start gap-10 text-center text-primary">
          {/* <div className="flex flex-col gap-4">
            <strong>title</strong>
            <strong>content</strong>
          </div> */}
          <div className="flex flex-col w-1/2 items-center gap-4">
            <h2 className="text-2xl font-extrabold text-primary">
              {data?.title}
            </h2>
            <p className="text-lg text-primary">{data?.content}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowGuide;
