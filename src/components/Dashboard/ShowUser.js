import React, { useEffect, useState } from "react";
import ConfirmationModel from "../Shared/ConfirmationModel";
import UpgradeModel from "../Shared/UpgradeModel";

const ShowUser = () => {
  const [usersData, setUsersData] = useState([]);
  const [deletingUser, setDeletingUser] = useState(null)
  const [upgradeUser, setUpgradeUser] = useState(null)


const getAllUsers = ()=>{

    fetch(`http://localhost:5000/users`)
    .then((res) => res.json())
    .then((data) => setUsersData(data));
}


  useEffect(() => {
    getAllUsers()
  }, []);

  const deleteUserHandler = user =>{
    fetch(`http://localhost:5000/users/${user._id}`,{
        method: 'DELETE',  
    })
    .then(res => res.json())
    .then(data => {
        getAllUsers()
        console.log(data)
    })
  }

  const closeModel = ()=>{
    setDeletingUser(null)
  }
  return (
    <div>
      <h1 className="text-center font-bold text-3xl my-5">
        This category has {usersData.length} users
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Job</th>
              <th>Upgrade</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {usersData.map((userData, i) => (
              <tr key={userData._id}>
                <th>{i + 1}</th>
                <td>{userData.name}</td>
                <td>
                  <img
                    src={userData.image}
                    className="w-14 h-14 rounded-full"
                    alt=""
                  />
                </td>
                <td>
                  <label htmlFor="upgrade-modal"
                  onClick={()=> setUpgradeUser(userData)}
                  className="btn bg-green-500 border-0 w-20 btn-sm">
                    Edit
                  </label>
                </td>
                <td>
                  <label
                    htmlFor="confirmation-modal"
                    onClick={()=> setDeletingUser(userData)}
                    className="btn btn bg-red-500 border-0 w-20 btn-sm"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        deletingUser && <ConfirmationModel 
        title={`Are you want to sure delete ?`}
        message={`If you want to delete ${deletingUser.name} It can't be undone`}
        successAction={deleteUserHandler}
        modelData={deletingUser}
        closeModel={closeModel}
        />
      }
      {upgradeUser &&
        <UpgradeModel
        modelData={upgradeUser}
        getAllUsers={getAllUsers}
        
        />
      }
    </div>
  );
};

export default ShowUser;
