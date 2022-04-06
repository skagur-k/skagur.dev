import { Dialog, Transition } from "@headlessui/react"
import { useFloating, shift } from "@floating-ui/react-dom"
import { Fragment, useState } from "react"

function ContactMenu() {
    let [isOpen, setIsOpen] = useState(true)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <div className="inset-0 flex items-center justify-center">
                <button
                    type="button"
                    onClick={openModal}
                    className="text-base font-bold rounded-md hover:text-amber-500"
                >
                    Contacts
                </button>
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-center transition-all transform bg-white dark:bg-gray-700 shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h1"
                                    className="text-xl font-bold leading-6"
                                >
                                    Contacts
                                </Dialog.Title>
                                <div className="flex justify-evenly">
                                    <div className="mt-2">
                                        <h1>Github</h1>
                                    </div>
                                    <div className="mt-2">
                                        <h1>LinkedIn</h1>
                                    </div>
                                    <div className="mt-2">
                                        <h1>Email</h1>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button
                                        type="button"
                                        className="justify-center text-black px-4 py-2 text-md font-bold bg-blue-300 rounded-md hover:bg-blue-200"
                                        onClick={closeModal}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default ContactMenu
