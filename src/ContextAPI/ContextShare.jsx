import React, { createContext, useState } from 'react'
export const addRecipientResponseContext = createContext()
export const addDonorResponseContext = createContext()
export const editRecipientResponseContext = createContext()
export const editDonorResponseContext = createContext()
function ContextShare({ children }) {
    const [addRecipientResponse, setAddRecipientResponse] = useState('')
    const [editRecipientResponse, setEditRecipientResponse] = useState('')
    const [addDonorResponse, setAddDonorResponse] = useState('')
    const [editDonorResponse, setEditDonorResponse] = useState('')
    return (
        <>
            <addRecipientResponseContext.Provider value={{ addRecipientResponse, setAddRecipientResponse }}>
                <addDonorResponseContext.Provider value={{ addDonorResponse, setAddDonorResponse }}>
                    <editRecipientResponseContext.Provider value={{ editRecipientResponse, setEditRecipientResponse }}>
                        <editDonorResponseContext.Provider value={{ editDonorResponse, setEditDonorResponse }} >
                            {children}
                        </editDonorResponseContext.Provider>
                    </editRecipientResponseContext.Provider>
                </addDonorResponseContext.Provider>
            </addRecipientResponseContext.Provider>
        </>
    )
}

export default ContextShare