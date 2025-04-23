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
    status: 'accepted' | 'deleted' | 'pending';
  }
};

export default function AcceptDashboardTable() {
  const [userArray, setUserArray] = useState<formSchemaType[]>([]);
  const [userStatuses, setUserStatuses] = useState<UserStatus>({});
  const [userAcceptArray , setUserAcceptArray] = useState<string[]>([]);
  const [userDeleteArray , setUserDeleteArray] = useState<string[]>([]);


  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get("/api/admin_dashboard");
        setUserArray(response.data);
        // Initialize all users with pending status
        const initialStatuses: UserStatus = {};
        response.data.forEach((user: formSchemaType) => {
          initialStatuses[user.college_roll_no] = {
            status: 'pending'
          };
        });
        setUserStatuses(initialStatuses);
        // Trigger the effect again after the initial fetch to ensure it runs after the timeout
        clearTimeout(timeout);
        timeout = setTimeout(fetchDashboardData, 2000);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }
    let timeout: NodeJS.Timeout;
    fetchDashboardData();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(()=>{
    // eslint-disable-next-line prefer-const
    let timeout;
    clearTimeout(timeout);
    async function acceptUsers(){
      return setTimeout(async ()=>{
          await axios.post("/api/accept-users" , {
            collegeRollNoArray : userAcceptArray,
            accepted : true,
            status : 'accepted'
          })
      } , 2000)
    }
    timeout = acceptUsers();
  } , [userAcceptArray])

  useEffect(()=>{
    // eslint-disable-next-line prefer-const
    let timeout;
    clearTimeout(timeout);
    async function deleteUsers(){
      return setTimeout(async ()=>{
          await axios.post("/api/accept-users" , {
            collegeRollNoArray : userDeleteArray,
            accepted : true,
            status : 'deleted'
          })
      } , 2000)
    }
    timeout = deleteUsers();
  } , [userDeleteArray])


  const handleAccept = (rollNo: string) => {
    setUserStatuses(prev => ({
      ...prev,
      [rollNo]: { status: 'accepted' }
    }));
    setUserAcceptArray([
      ...userAcceptArray , rollNo
    ]);
  };

  const handleDelete = (rollNo: string) => {
    setUserStatuses(prev => ({
      ...prev,
      [rollNo]: { status: 'deleted' }
    }));
    setUserDeleteArray([
      ...userDeleteArray , rollNo
    ]);
  };

  return (
    <div className="overflow-none">
      <div className="w-full flex justify-center m-5">
        <h1 className="text-4xl font-bold">Requests / Blocks</h1>
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userArray
            .filter(user => !user.accepted)
            .map((user) => (
              userStatuses[user.college_roll_no]?.status !== 'deleted' && (
                <TableRow 
                  key={user.college_roll_no}
                  className={
                    userStatuses[user.college_roll_no]?.status === 'accepted' ? 'text-green-600' : ''
                  }
                >
                  <TableCell className="font-medium">{user.firstname}</TableCell>
                  <TableCell className="font-medium">{user.lastname}</TableCell>
                  <TableCell>{user.college_roll_no}</TableCell>
                  <TableCell>{user.university_roll_no}</TableCell>
                  <TableCell className="text-right">{user.branch}</TableCell>
                  <TableCell className="text-right">{user.batch}</TableCell>
                  <TableCell className="text-right">{user.semester}</TableCell>
                  <TableCell className="text-right">{user.email}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <button
                      onClick={() => {
                        handleAccept(user.college_roll_no)
                      }
                      }
                      className="inline-block px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDelete(user.college_roll_no)}
                      className="inline-block px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              )
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
