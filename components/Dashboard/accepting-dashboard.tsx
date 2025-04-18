"use client";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { formSchemaType } from "./user-dashboard";

export default function AcceptDashboardTable() {
  const [userArray, setUserArray] = useState<formSchemaType[]>([]);
  const [collegeRollNo, setCollegeRollNo] = useState<string>("");

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        const response = await axios.get("/api/admin_dashboard");
        setUserArray(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    fetchDashboardData();
  }, [collegeRollNo]);

  console.log(userArray);

  async function AcceptTrue() {
    try {
      await axios.post("/api/accept-users", {
        college_roll_no: collegeRollNo,
        accepted : true
      });
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  }

  return (
    <div className="overflow-none">
      <div className="w-full flex justify-center m-5 ">
        <h1 className="text-4xl font-bold">Requests</h1>
      </div>
      <Table>
        <TableCaption>List of all the users in the dashboard.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Firstname</TableHead>
            <TableHead className="w-[100px]">Lastname</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>University RollNo.</TableHead>
            <TableHead className="text-right">Branch</TableHead>
            <TableHead className="text-right">Batch</TableHead>
            <TableHead className="text-right">Semester</TableHead>
            <TableHead className="text-right">Email</TableHead>
            <TableHead className="text-right">Accept</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userArray.filter(user => !(user.accepted)).map((user) => (
            <TableRow key={user.college_roll_no}>
              <TableCell className="font-medium">{user.firstname}</TableCell>
              <TableCell className="font-medium">{user.lastname}</TableCell>
              <TableCell>{user.college_roll_no}</TableCell>
              <TableCell>{user.university_roll_no}</TableCell>
              <TableCell className="text-right">{user.branch}</TableCell>
              <TableCell className="text-right">{user.batch}</TableCell>
              <TableCell className="text-right">{user.semester}</TableCell>
              <TableCell className="text-right">{user.email}</TableCell>
              <td className="text-right"><button onClick={()=>{
                  setCollegeRollNo(user.college_roll_no);
                  AcceptTrue();
              }} className="m-1 p-1 bg-green-400 hover:cursor-pointer hover:bg-green-600">Accept</button>
              </td>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
