import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card } from "@/components/ui/card";
import DashboardCard from "./DashboardCard";
import ThreeDPieChart from "./ThreeDPieChart";
import StartUpsInvestors from "@/components/startup/StartUpsInvestors";
import { getUser } from "@/lib/actions/auth";
import { getContracts } from "@/lib/actions/startup";
import StartUpsChart from "@/components/startup/StartUpsChart";
import { SearchInput } from "@/components/lenders/SearchInput";
import { Search } from "lucide-react";
import { CustomSearch } from "@/components/lenders/CustomSearch";
import CustomStartupChart from "@/components/startup/CustomStartupChart";

interface LenderData {
  name: string;
  totalFunds: number;
  availableBalance: number;
  initiationDate: string;
  loanDuration: string;
  dueDate: string;
}

export default async function DashboardContent({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const user = await getUser();
  const startupContracts = await getContracts(user?.userStartUp?.id!);

  const totalAmountInvested = startupContracts.acceptedContracts?.reduce(
    (acc, contract) =>
      acc +
      (contract.investment_amount_paid
        ? parseFloat(contract.amount_invested)
        : 0),
    0
  );

  const totalInvestors = startupContracts.acceptedContracts?.filter(
    (contract) => contract.investment_amount_paid
  ).length;

  const lendersData: LenderData[] = [
    {
      name: "Aspen Partners",
      totalFunds: 6500000,
      availableBalance: 5000000,
      initiationDate: "04/12/2024",
      loanDuration: "36 months",
      dueDate: "09/12/2024",
    },
    {
      name: "BlackRock Capital",
      totalFunds: 8200000,
      availableBalance: 6100000,
      initiationDate: "03/15/2024",
      loanDuration: "48 months",
      dueDate: "08/15/2024",
    },
    {
      name: "Vanguard Ventures",
      totalFunds: 5500000,
      availableBalance: 3800000,
      initiationDate: "04/01/2024",
      loanDuration: "24 months",
      dueDate: "09/01/2024",
    },
    {
      name: "Fidelity Investments",
      totalFunds: 7500000,
      availableBalance: 4200000,
      initiationDate: "03/28/2024",
      loanDuration: "36 months",
      dueDate: "08/28/2024",
    },
    {
      name: "State Street Global",
      totalFunds: 9000000,
      availableBalance: 6800000,
      initiationDate: "04/05/2024",
      loanDuration: "60 months",
      dueDate: "09/05/2024",
    },
    {
      name: "Goldman Sachs Fund",
      totalFunds: 12000000,
      availableBalance: 8500000,
      initiationDate: "03/20/2024",
      loanDuration: "48 months",
      dueDate: "08/20/2024",
    },
  ];

  return (
    <div
      className="w-full mx-auto space-y-6 my-8
      max-w-[800px]                     
      lg:max-w-[850px]                 
      xl:max-w-[923px]                  
      2xl:max-w-[1200px]               
      3xl:max-w-[1700px]              
      4xl:max-w-[1800px]"
    >
      {/* Top Section */}
      <div className="flex gap-[21px]">
        {/* Left Stats */}
        <div className="flex flex-col justify-between space-y-[20px] min-w-[332px]">
          <DashboardCard
            title="Total Funds"
            value={`$6,500,000`}
            className="h-[calc(50%-12px)] text-center content-center"
          />
          <DashboardCard
            title="Available Balance"
            value={`$5,000,000`}
            className="h-[calc(50%-12px)] text-center content-center"
          />
        </div>

        {/* Pie Chart Section */}
        <div className="w-full">
          <CustomStartupChart totalAmountInvested={totalAmountInvested!} />
        </div>
      </div>

      {/* Table Section */}

      <div className="overflow-x-auto bg-[#FAFAFA] rounded-lg">
        <table className="w-full">
          <thead>
            <tr className=" text-sm">
              <th className="text-[12px] text-center p-[22px] font-medium font-Montserrat text-[#1A1A1A] leading-[14px]">
                Lender Name
              </th>
              <th className="text-[12px] text-center p-[22px] font-medium font-Montserrat text-[#1A1A1A] leading-[14px]">
                Total Funds
              </th>
              <th className="text-[12px] text-center p-[22px] font-medium font-Montserrat text-[#1A1A1A] leading-[14px]">
                Available Balance
              </th>
              <th className="text-[12px] text-center p-[22px] font-medium font-Montserrat text-[#1A1A1A] leading-[14px]">
                Initiation Date
              </th>
              <th className="text-[12px] text-center p-[22px] font-medium font-Montserrat text-[#1A1A1A] leading-[14px]">
                Loan Duration
              </th>
              <th className="text-[12px] text-center p-[22px] font-medium font-Montserrat text-[#1A1A1A] leading-[14px]">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {lendersData.map((lender, index) => (
              <tr key={index}>
                <td
                  className={`p-[22px] bg-[#EAEAEA] font-Montserrat text-[13px]`}
                >
                  {lender.name}
                </td>
                <td
                  className={`p-[22px] bg-[#FEFFFE] font-Montserrat text-[12px]`}
                >
                  ${lender.totalFunds.toLocaleString()}
                </td>
                <td
                  className={`p-[22px] bg-[#EAEAEA] font-Montserrat text-[13px]`}
                >
                  ${lender.availableBalance.toLocaleString()}
                </td>
                <td
                  className={`p-[22px] bg-[#FEFFFE] font-Montserrat text-[13px]`}
                >
                  {lender.initiationDate}
                </td>
                <td
                  className={`p-[22px] bg-[#EAEAEA] font-Montserrat text-[13px]`}
                >
                  {lender.loanDuration}
                </td>
                <td
                  className={`p-[22px] bg-[#FEFFFE] font-Montserrat text-[13px]`}
                >
                  {lender.dueDate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
