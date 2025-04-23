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

type UserStatus = {
  [key: string]: {
    rejected: boolean;
  }
};

export default function AdminDashboardTable() {
  const [userArray, setUserArray] = useState<formSchemaType[]>([]);
  const [userStatuses, setUserStatuses] = useState<UserStatus>({});
  const [userRejectArray, setUserRejectArray] = useState<string[]>([])

  useEffect(() => {
    // eslint-disable-next-line prefer-const
    let timeout;
    async function fetchDashboardData() {
      try {
        const response = await axios.get("/api/admin_dashboard");
        setUserArray(response.data);
        // Initialize all users as not rejected
        const initialStatuses: UserStatus = {};
        response.data.forEach((user: formSchemaType) => {
          initialStatuses[user.college_roll_no] = {
            rejected: false
          };
        });
        setUserStatuses(initialStatuses);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    clearTimeout(timeout); 
    timeout = setTimeout(fetchDashboardData, 2000);
    return () => clearTimeout(timeout);
  }, [userRejectArray]);

  useEffect(()=>{
    // eslint-disable-next-line prefer-const
    let timeout;
    clearTimeout(timeout);

    async function RejectUser(){
      return setTimeout(async () => {
        await axios.post("api/accept-users" , {
            collegeRollNoArray : userRejectArray,
            accepted : false,
            status : "rejected"
        })
      }, 2000)
    }
   
    timeout = RejectUser();
  } , [userRejectArray]);



  const handleReject = (rollNo: string) => {
    setUserStatuses(prev => ({
      ...prev,
      [rollNo]: { rejected: true }
    }));
    setUserRejectArray([
      ...userRejectArray , rollNo
    ])
  };

  return (
    <div className="overflow-none">
      <div className="w-full flex justify-center m-5">
        <h1 className="text-4xl font-bold">My Friend List</h1>
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
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userArray.filter((user)=>{
            return(
              user.accepted && user.status === 'accepted'
            )
          }).map((user) => (
            <TableRow 
              key={user.college_roll_no}
              className={userStatuses[user.college_roll_no]?.rejected ? 'text-red-600' : ''}
            >
              <TableCell className="font-medium">{user.firstname}</TableCell>
              <TableCell className="font-medium">{user.lastname}</TableCell>
              <TableCell>{user.college_roll_no}</TableCell>
              <TableCell>{user.university_roll_no}</TableCell>
              <TableCell className="text-right">{user.branch}</TableCell>
              <TableCell className="text-right">{user.batch}</TableCell>
              <TableCell className="text-right">{user.semester}</TableCell>
              <TableCell className="text-right">{user.email}</TableCell>
              <TableCell className="text-right">
                <button
                  onClick={() => handleReject(user.college_roll_no)}
                  className="inline-block px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Block
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
