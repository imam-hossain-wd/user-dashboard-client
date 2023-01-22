import React from "react";

const ConfirmationModel = ({successAction,title,modelData, closeModel,message}) => {
  return (
    <div>
      

      <input type="checkbox" id="confirmation-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
        <label htmlFor="confirmation-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 className="font-bold text-lg">
            {title}
          </h3>
          <h4>{message}</h4>
         
          <div className="modal-action">
            <label onClick={()=> successAction(modelData)} htmlFor="confirmation-modal" className="btn border-0 hover:bg-red-500">
              Delete
            </label>
            <button onClick={closeModel} className="btn btn-outline">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModel;
