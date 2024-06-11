import { motion, AnimatePresence } from "framer-motion";
import MenuCloseBtn from "./MenuCloseBtn";
import { Dispatch, SetStateAction } from "react";
import { menuItems } from "@/utils/menuItems";
import Link from "next/link";
import MenuItem from "./MenuItem";

function Menu({
    isMenuOpen,
    setIsMenuOpen,
}: {
    isMenuOpen: boolean;
    setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}) {
    return (
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    className=" absolute top-0 left-0 w-full min-h-screen bg-gradient-to-r from-[rgb(255,255,255,0.7)] to-[rgb(0,0,0,0.7)]"
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    // transition={{
                    //     duration: "1s",
                    // }}
                >
                    <div
                        className=" w-96 min-h-screen shadow-sm shadow-primary bg-white py-[2vh] px-[4vw]
                        flex flex-col gap-[1vh]
                    "
                    >
                        <MenuCloseBtn setIsMenuOpen={setIsMenuOpen} />
                        <div
                            className=" font-bold text-2xl capitalize text-center"
                            style={{ fontVariant: "small-caps" }}
                        >
                            job portal
                        </div>
                        <ul className=" grid gap-[1vh]">
                            {menuItems.map((menuItem) => {
                                return (
                                    <>
                                        {menuItem.show && (
                                            <MenuItem
                                                menuItem={menuItem}
                                                setIsMenuOpen={setIsMenuOpen}
                                            />
                                        )}
                                    </>
                                );
                            })}
                        </ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default Menu;