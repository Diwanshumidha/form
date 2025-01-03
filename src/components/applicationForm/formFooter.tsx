import React from 'react'
import { useFormControls } from './hooks/useForm';
import { Button } from '../ui/button';

const FormFooter = () => {
   const { handleBack,handleNext, hasNextPage, hasPreviousPage, isFinalPage } = useFormControls();

    if(isFinalPage) {
      return (
         <div className='w-full flex justify-between px-7'>
            <Button onClick={handleBack} disabled={!hasPreviousPage}>Back</Button>
            <Button type='submit'>Submit</Button>
         </div>
      )
    }

   return (
     <div className='w-full flex justify-between px-7'>
        <Button onClick={handleBack} disabled={!hasPreviousPage}>Back</Button>
        <Button onClick={handleNext} disabled={!hasNextPage}>Next</Button>
     </div>
   )
 
}

export default FormFooter