'use client'
import { Checkbox } from "@/components/ui/checkbox"
import { submitApplication } from "@/lib/actions/onboarding"
import { Loader2, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function StartUpSubmitApplication()
{
    const router = useRouter()

    const [checked, setChecked] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async () => {
        setIsSubmitting(true)
        const { error } = await submitApplication()

        if(error) setError(error)
        setIsSubmitting(false)

        router.refresh()
    }

    return (
        <div className='flex flex-col gap-8'>
            <div className='flex gap-2 items-center justify-center'>
                <Checkbox className='rounded-[4px]' checked={checked} onCheckedChange={(value) => setChecked(value ? true : false)} id="terms" />
                <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    I agree to the <span className='underline'>Mutual Non-Disclosure Agreement</span>
                </label>
            </div>
            <button onClick={handleSubmit} disabled={!checked} className='rounded-full px-5 py-2 bg-strong-purple text-white font-semibold disabled:text-gray-400'>{isSubmitting ? <Loader2 stroke="#fff" className='animate-spin mx-auto' /> : 'Submit Application'}</button>
            {error && (
                <div className='border-2 border-[#F86C6C] gap-4 rounded-[8px] bg-[#FEF2F2] flex items-center justify-center px-12 py-6'>
                    <X size={24} className='text-[#F86C6C]' />
                    <p className='text-black font-semibold'>{error}</p>
                </div>
            )}
        </div>
    )
}