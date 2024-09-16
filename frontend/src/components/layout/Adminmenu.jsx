import React from "react";
import { Link } from "react-router-dom";

const Adminmenu = () => {
  return (
    <div className=" ml-6">
      <div>
        <h1 className="font-bold">Admin panel</h1>
        <div className="flex text-center flex-col border-2 p-2 w-36">

        <Link className="my-2"  to="/dashboard/admin/create-category">Creat Catogory</Link>
        <Link className="my-2"  to="/dashboard/admin/create-product">Create Product</Link>
        <Link className="my-2" to="/dashboard/admin/users">Users</Link>
        </div>
      </div>
    </div>
  );
};

export default Adminmenu;
