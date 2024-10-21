import { getTaxReturns } from "@/lib/actions/startup"
import UploadTaxReturns from "./upload-tax-returns"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import TaxReturnsActionBtns from "./tax-returns-action-btns"
import ViewBtn from "./view-btn"
import { formatDate } from "@/lib/utils"

export default async function TaxReturns()
{
    const TaxReturns = await getTaxReturns()

    return (
        <section className='flex w-full flex-col gap-4 mt-12'>
            <div className='flex items-center justify-between gap-4'>
                <p className='font-bold font-Montserrat text-white text-xl'>Tax Returns</p>
                <UploadTaxReturns />
            </div>
            <Table className='bg-white'>
                <TableHeader>
                    <TableRow className=''>
                        <TableHead className="p-6 border-2 text-center border-[#EAEAEA] font-Montserrat w-[100px]">{" "}</TableHead>
                        <TableHead className='p-6 border-2 text-center border-[#EAEAEA] font-Montserrat'>Document Name</TableHead>
                        <TableHead className='p-6 border-2 text-center border-[#EAEAEA] font-Montserrat'>First Update</TableHead>
                        <TableHead className='p-6 border-2 text-center border-[#EAEAEA] font-Montserrat'>Last modified</TableHead>
                        <TableHead className='p-6 border-2 text-center border-[#EAEAEA] font-Montserrat'>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {TaxReturns?.map((TaxReturns) => (
                    <TableRow key={TaxReturns.id}>
                        <TableCell className="p-6 border-2 text-center border-[#EAEAEA] font-Montserrat w-[100px]">
                            <ViewBtn document_link={TaxReturns?.document_link!} type='taxReturns' />
                        </TableCell>
                        <TableCell className="p-6 border-2 text-center border-[#EAEAEA] font-Montserrat">{TaxReturns.name}</TableCell>
                        <TableCell className="p-6 border-2 text-center border-[#EAEAEA] font-Montserrat">{formatDate(new Date(TaxReturns?.created_at!))}</TableCell>
                        <TableCell className="p-6 border-2 text-center border-[#EAEAEA] font-Montserrat">{formatDate(new Date(TaxReturns?.updated_at!))}</TableCell>
                        <TableCell className="flex items-center justify-center gap-3 p-6 text-center border-[#EAEAEA] font-Montserrat">
                            <TaxReturnsActionBtns document_link={TaxReturns.document_link!} taxReturnsId={TaxReturns.id!} />
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </section>
    )
}