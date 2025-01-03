import React from 'react'
import { useFormControls } from './hooks/useForm';
import { Step } from './form';

const RenderComponent = ({steps}: {steps:Step[]}) => {
    const { currentPageIndex } = useFormControls();
    const Component = steps[currentPageIndex].component;
  return (
    <div>
        <Component />
    </div>
  )
}

export default RenderComponent