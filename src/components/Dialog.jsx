import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import img from "../assets/img.jpg"
import { AnimatePresence, motion } from "framer-motion"

const DialogDemo = () => (
    <Dialog.Root>

        <Dialog.Trigger asChild>
            <i className="fa-solid fa-circle-info text-xl cursor-pointer hover:text-white/50 transition-all"></i>
        </Dialog.Trigger>

        <Dialog.Portal>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Dialog.Overlay className="absolute inset-0" />
                <Dialog.Content className="p-4 rounded-md border border-white/30 absolute top-8 left-1/2 -translate-x-1/2 bg-white text-black">
                    <Dialog.Title className="text-sky-500 font-semibold text-lg mb-2">Usage:</Dialog.Title>
                    <Dialog.Description className="DialogDescription">
                        <span className='text-sm block'>- before imorting XLSX(.csv not compatible) file make sure that Date field is formatted and sorted as in image</span>
                        <span className='text-sm block'>- after finishing step 1, make sure that Date field's data type is Text(string)</span>
                        <span className='text-sm block'>- import files one by one according to order, app will add data to table automatically</span>
                        <span className='text-sm block'>- final step, just click to export button</span>
                        <img src={img} alt="img" className='mt-12' />
                    </Dialog.Description>
                </Dialog.Content>
            </motion.div>
        </Dialog.Portal>
    </Dialog.Root>
);

export default DialogDemo;