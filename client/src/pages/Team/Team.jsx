import React, { useState } from "react";
import { FaPenNib } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import Modal from "../../components/Modal/Modal.jsx";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_TEAMS } from "../../graphql/query.js";
import { CREATE_TEAM, DELATE_TEAM } from "../../graphql/mutation.js";
import Swal from "sweetalert2";
import CloudinaryImageUpload from "haq-cloudinary";
function Team() {
  const [modal, setModal] = useState(false);
  const { data } = useQuery(GET_ALL_TEAMS);
  const [createTeams, error] = useMutation(CREATE_TEAM, {
    refetchQueries: ["getAllTeamMembers"],
  });
  const [deleteATeam] = useMutation(DELATE_TEAM, {
    refetchQueries: ["getAllTeamMembers"],
  });

  const [file, setFile] = useState(null);

  const [input, setInput] = useState({
    name: "",
    email: "",
    age: "",
    skill: "",
    location: "",
  });

  const onChangeHandler = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const fileData = await CloudinaryImageUpload({
      file: file,
      preset: "serveraction",
      cloudName: "dj8foozva",
    });

    const res = await createTeams({
      variables: {
        ...input,
        age: Number(input.age),
        photo: fileData ? fileData.secure_url : "",
      },
    });

    if (res.data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Team created successfully",
        showConfirmButton: false,
        timer: 2000,
      });

      setInput({
        name: "",
        email: "",
        age: "",
        skill: "",
        location: "",
      });

      setModal(false);
    }
  };

  const handleDeleteTeam = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await deleteATeam({
          variables: {
            deleteATeamId: id,
          },
        });

        if (res.data) {
          await Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error("Error deleting the team:", error);
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <Modal open={modal} onHide={setModal}>
        <form onSubmit={handleOnSubmit}>
          <div className="flex flex-col mb-2">
            <label htmlFor="">Name</label>
            <input
              className="border px-2 py-1 rounded-md mt-1"
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={input.name}
              placeholder="JIbon roy"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="">Email</label>
            <input
              className="border px-2 py-1 rounded-md mt-1"
              type="email"
              name="email"
              onChange={onChangeHandler}
              value={input.email}
              placeholder="info@example.com"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="">AGE</label>
            <input
              className="border px-2 py-1 rounded-md mt-1"
              type="number"
              name="age"
              onChange={onChangeHandler}
              value={input.age}
              placeholder="28"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="">Skill</label>
            <input
              className="border px-2 py-1 rounded-md mt-1"
              type="text"
              name="skill"
              onChange={onChangeHandler}
              value={input.skill}
              placeholder="Wordpress"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="">Location</label>
            <input
              className="border px-2 py-1 rounded-md mt-1"
              type="text"
              name="location"
              onChange={onChangeHandler}
              value={input.location}
              placeholder="Dhaka"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="">Photo</label>
            <input
              className="border px-2 py-1 rounded-md mt-1"
              type="file"
              name="photo"
              onChange={(e) => setFile(e.target.files[0])}
              placeholder="Avater.jpg"
            />
          </div>
          <button className="w-full font-semibold bg-green-500 px-5 py-2 mt-3 rounded-md text-white">
            Create
          </button>
        </form>
      </Modal>
      <div className="container mx-auto mt-5">
        <div className="flex justify-between mb-2 items-center">
          <h1 className="text-xl text-blue-400">All Team Member</h1>
          <button
            onClick={() => setModal(true)}
            className="py-2 px-4 bg-fuchsia-400 rounded-md text-white font-semibold"
          >
            Create A Team
          </button>
        </div>
        <hr />
        <div className="mt-5">
          <table className="w-full border-collapse  ">
            <thead>
              <tr className="bg-slate-500 text-white">
                <th className="border border-slate-600 ">SL</th>
                <th className="border border-slate-600 ">Photo</th>
                <th className="border border-slate-600 ">Name</th>
                <th className="border border-slate-600 ">Email</th>
                <th className="border border-slate-600 ">Age</th>
                <th className="border border-slate-600 ">Skill</th>
                <th className="border border-slate-600 ">Location</th>
                <th className="border border-slate-600 ">State</th>
                <th className="border border-slate-600 ">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.getAllTeams
                ?.slice()
                ?.reverse()
                ?.map((team, index) => (
                  <tr
                    key={team.id}
                    className="bg-slate-50 text-center justify-center "
                  >
                    <td className="border border-slate-700 p-2 ">
                      {index + 1}
                    </td>
                    <td className="border border-slate-700 p-2 ">
                      <img
                        className="w-10 h-10 mx-auto rounded-full"
                        src={
                          team.photo
                            ? team.photo
                            : "https://i.ibb.co.com/Lvd1G5h/user.jpg"
                        }
                        alt=""
                      />
                    </td>
                    <td className="border border-slate-700 p-2">{team.name}</td>
                    <td className="border border-slate-700 p-2">
                      {team.email}
                    </td>
                    <td className="border border-slate-700 p-2">{team.age}</td>
                    <td className="border border-slate-700 p-2">
                      {team.skill}
                    </td>
                    <td className="border border-slate-700 p-2">
                      {team.location}
                    </td>
                    <td className="border border-slate-700 p-2">
                      <label className="switch">
                        <input type="checkbox" defaultChecked={team.status} />
                        <span className="slider round"></span>
                      </label>
                    </td>
                    <td className="border border-slate-700 p-2">
                      <div className="flex justify-around">
                        <button className="text-2xl text-blue-500">
                          <FaEye />
                        </button>
                        <button className="text-2xl text-green-500">
                          <FaPenNib />
                        </button>
                        <button
                          onClick={() => handleDeleteTeam(team.id)}
                          className="text-2xl text-red-500"
                        >
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Team;
