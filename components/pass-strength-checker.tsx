import React from 'react'
import { passwordStrength } from 'check-password-strength';
import { cn } from '@nextui-org/react';

function PasswordStrengthChecker({passwordStrength}:{passwordStrength:number}) {
  return (
    <div className='flex items-center gap-2'>
        {
            Array.from({length:passwordStrength+1}).map((data,index)=>(
                <div className={cn("h-2 w-32 rounded-md",{
                    "bg-red-500":passwordStrength === 0,
                    "bg-orange-500":passwordStrength === 1,
                    "bg-yellow-500":passwordStrength === 2,
                    "bg-green-500":passwordStrength === 3,

                })} key={index}>

                </div>
            ))
        }

    </div>
  )
}

export default PasswordStrengthChecker