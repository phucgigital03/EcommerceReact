import { Button } from "@mui/material";
import toast from "react-hot-toast";
import api from "../../../../api/api";

function DeleteUserForm({ user, setUsers, setOpenDeleteModal }) {

    const handleSubmitDelete = async (userId)=>{
        try {
            const { data } = await api.delete(`/users/${userId}`, {
                headers: {
                  "Content-Type": "application/json",
                },
            });

            console.log("delete the user: ", data)
            if(data){
                const { data: usersDB } = await api.get("/users");
                setUsers(usersDB.filter(user => !user.deleted));
                setOpenDeleteModal(false);
                toast.success(data);
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to delete user");
            console.log("Failed to delete user", error);
        }
    }
  return (
    <div>
      <div>
        <p className="text-red-600"> Are you sure to delete the user with </p>
        <p>userName <strong>{user?.username}</strong></p>
        <p>email <strong>{user?.email}</strong></p>
      </div>

      <div className="mt-2 flex gap-x-2 justify-end items-center">
        <Button
          className="min-w-[100px] w-[100px]"
          variant="contained"
          color="primary"
          onClick={() => {setOpenDeleteModal(false)}}
        >
          <span>Cancel</span>
        </Button>
        <Button
          className="min-w-[100px] w-[100px]"
          variant="contained"
          color="error"
          onClick={() => {handleSubmitDelete(user?.id)}}
        >
          <span>Delete</span>
        </Button>
      </div>
    </div>
  );
}

export default DeleteUserForm;
