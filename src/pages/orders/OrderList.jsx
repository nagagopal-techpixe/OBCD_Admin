import React from "react";
import ReusableTable from "../../layouts/ReusableTable";

const OrderList = () => {
  const employees = [
    {
      id: 1,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 2,
      image: "https://picsum.photos/40/40?random=2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$75,000",
      joined: "Feb 05, 2023",
    },
    {
      id: 3,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 4,
      image: "https://picsum.photos/40/40?random=2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$75,000",
      joined: "Feb 05, 2023",
    },
    {
      id: 5,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 6,
      image: "https://picsum.photos/40/40?random=2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$75,000",
      joined: "Feb 05, 2023",
    },
    {
      id: 7,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 8,
      image: "https://picsum.photos/40/40?random=2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$75,000",
      joined: "Feb 05, 2023",
    },
    {
      id: 9,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 10,
      image: "https://picsum.photos/40/40?random=2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$75,000",
      joined: "Feb 05, 2023",
    },
    {
      id: 11,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 12,
      image: "https://picsum.photos/40/40?random=2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$75,000",
      joined: "Feb 05, 2023",
    },
    {
      id: 13,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 14,
      image: "https://picsum.photos/40/40?random=2",
      name: "Bhanu teja",
      email: "bhanuteja@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$79,000",
      joined: "Feb 05, 2023",
    },
    {
      id: 15,
      image: "https://picsum.photos/40/40?random=1",
      name: "John Doe",
      email: "john.doe@email.com",
      role: "Developer",
      department: "Engineering",
      status: "Active",
      salary: "$85,000",
      joined: "Jan 15, 2023",
    },
    {
      id: 16,
      image: "https://picsum.photos/40/40?random=2",
      name: "Jane Smith",
      email: "jane.smith@email.com",
      role: "Designer",
      department: "Design",
      status: "Inactive",
      salary: "$75,000",
      joined: "Feb 05, 2023",
    },
  ];

  const columns = [
    { key: "id", label: "S.no" },
    { key: "image", label: "Image" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "department", label: "Department" },
    { key: "status", label: "Status" },
    // { key: "salary", label: "Salary", alignRight: true },
    // { key: "joined", label: "Joined" },
  ];

  const handleView = (item) => alert(`View: ${item.name}`);
  const handleEdit = (item) => alert(`Edit: ${item.name}`);
  const handleDelete = (e) => alert(`Delete: ${e.name}`);

  return (
    <ReusableTable
      columns={columns}
      data={employees}
      onView={handleView}
      onEdit={handleEdit}
      onDelete={handleDelete}
      showActions={true}
      showView={true}
      showEdit={true}
      showDelete={true}
      showSearch={true}
      showFilter={true}
      title="Order List"
    />
  );
};

export default OrderList;
