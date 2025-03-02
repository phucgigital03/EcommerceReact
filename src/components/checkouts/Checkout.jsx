import { Step, StepLabel, Stepper } from "@mui/material"
import { useState } from "react"
import AddressInfo from "./AddressInfo"


function Checkout() {
    const [activeStep,setActiveStep] = useState(0)
    const steps = [
        "Address",
        "Payment method",
        "Order summary",
        "Payment",
    ]

  return (
    <div className="py-14 min-h-[calc(100vh-100px)]">
        <Stepper activeStep={activeStep} alternativeLabel>
            {
                steps.map(item => (
                    <Step key={item}>
                        <StepLabel>{item}</StepLabel>
                    </Step>
                ))
            }
        </Stepper>

        <div className="mt-5">
            {activeStep === 0 && (
                <AddressInfo/>
            )}
        </div>
    </div>
  )
}

export default Checkout


