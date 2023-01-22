import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const UpgradeModel = ({modelData, getAllUsers}) => {
   console.log(modelData?._id);
    const {register,handleSubmit,watch,formState: { errors }} = useForm();

      const imageHostingKey = process.env.REACT_APP_imgbb;
      const upgradeUserHandler = (data)=>{
        const name = data.name;
        const email = data.email;
        const phone = data.phone;
        const selary = data.selary;
        const age = data.age;
        const image = data.image[0];
        

     const formData = new FormData();
    formData.append("image", image);
    fetch(`https://api.imgbb.com/1/upload?key=${imageHostingKey}`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
          if(result.data.url){
              console.log(result.data.url);
              toast.success('Successfully upload')
              const upgradeUser = {
                  name,
                  email,
                  phone,
                  selary,
                  age,
                  image:result.data.url
              }
                  fetch(`http://localhost:5000/users/upgrade/${modelData?._id}`, {
                      method: 'PUT', 
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(upgradeUser),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log('Success:', data);
                        getAllUsers()
                      })
                      .catch((error) => {
                        console.error('Error:', error);
                      });
          }
          
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    

      }
    return (
        <div>
      

      <input type="checkbox" id="upgrade-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
        <label htmlFor="upgrade-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        <form onSubmit={handleSubmit(upgradeUserHandler)}>
        <input
          type="text"
          defaultValue={modelData.name}
          className="input input-bordered w-full mb-2"
          {...register("name")}
        />
        <input
          type="email"
          placeholder="Email"
          defaultValue={modelData.email}
          className="input input-bordered w-full mb-2"
          {...register("email")}
        />
        <input
          type="number"
          placeholder="Phone"
          className="input input-bordered w-full mb-2"
          {...register("phone")}
          defaultValue={modelData.phone}
        />
        <input
          type="number"
          placeholder="Age"
          className="input input-bordered w-full mb-2"
          {...register("age")}
          defaultValue={modelData.age}
        />
        <input
          type="number"
          placeholder="Selary"
          className="input input-bordered w-full mb-2"
          {...register("selary")}

          defaultValue={modelData.selary}
        />
        <input
          type="file"
          className="file-input file-input-bordered w-full mb-2"
          {...register("image")}
        />
        <div className="modal-action">
        <input
          style={{ backgroundColor: "#eb3b5a" }}
          type="submit"
          className="btn  w-full border-0 btn-outline"
        />
            
            </div>

       
      </form>
          
        </div>
      </div>
    </div>
    );
};

export default UpgradeModel;