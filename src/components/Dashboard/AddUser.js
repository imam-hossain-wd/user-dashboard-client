import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
const imageHostingKey = process.env.REACT_APP_imgbb;

  const onSubmit = (data) => {
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
            const saveUser = {
                name,
                email,
                phone,
                selary,
                age,
                image:result.data.url
            }
                fetch('http://localhost:5000/users', {
                    method: 'POST', 
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(saveUser),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      console.log(data);
                      toast.success("User Add Successfully")
                      reset();
                    })
                    .catch((error) => {
                      console.error('Error:', error);
                    });
        }
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className="w-4/5 mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Name"
          className="input input-bordered w-full mb-2"
          {...register("name")}
        />
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full mb-2"
          {...register("email")}
        />
        <input
          type="number"
          placeholder="Phone"
          className="input input-bordered w-full mb-2"
          {...register("phone")}
        />
        <input
          type="number"
          placeholder="Age"
          className="input input-bordered w-full mb-2"
          {...register("age")}
        />
        <input
          type="number"
          placeholder="Selary"
          className="input input-bordered w-full mb-2"
          {...register("selary")}
        />
        <input
          type="file"
          className="file-input file-input-bordered w-full mb-2"
          {...register("image")}
        />

        <input
          style={{ backgroundColor: "#eb3b5a" }}
          type="submit"
          className="btn  w-full border-0 btn-outline"
        />
      </form>
    </section>
  );
};

export default AddUser;
