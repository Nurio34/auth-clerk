import { createJob } from "@/actions/job";
import SubmitBtn from "@/app/onboard/Components/Forms/SubmitBtn";
import { UserProfileType } from "@/app/onboard/Components/Onboard";
import { isRecruiterProfile } from "@/utils/typeGuard";
import { useUser } from "@clerk/nextjs";
import { User, currentUser } from "@clerk/nextjs/server";
import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";

export type JobFormType = {
    companyName: string;
    title: string;
    type: string;
    location: string;
    experience: string;
    description: string;
    skills: string;
};

function JobCreateModal({
    isJobCreateModalOpen,
    setIsJobCreateModalOpen,
    user,
    profile,
}: {
    isJobCreateModalOpen: boolean;
    setIsJobCreateModalOpen: Dispatch<SetStateAction<boolean>>;
    user: User;
    profile: UserProfileType;
}) {
    const companyName = isRecruiterProfile(profile)
        ? profile.recruiterInfo.currentCompany
        : "";

    const initialJobForm = {
        companyName,
        title: "Full Stack Web Developer",
        type: "Fulltime",
        location: "USA",
        experience: "2 Years",
        description:
            "Full Stack Web Developer for modifying new created websites",
        skills: "Next.js",
    };

    const [jobForm, setJobForm] = useState<JobFormType>(initialJobForm);

    const isFormValid = Object.values(jobForm).every((input) => input !== "");

    function closeModal() {
        setIsJobCreateModalOpen(false);
    }

    //** --- FORM ACTION --- */
    async function createJobAction() {
        const data: JobFormType & { recruiterId: string | undefined } = {
            ...jobForm,
            recruiterId: user.id,
        };
        await createJob(data);
    }
    //** ------------------ */

    return (
        <AnimatePresence>
            {isJobCreateModalOpen && (
                <motion.dialog
                    open
                    className="py-[2vh] px-[4vw] shadow-md shadow-primary rounded-md "
                    initial={{ x: "-100%", top: "50%", y: "-50%", opacity: 0 }}
                    animate={{ x: 0, top: "50%", y: "-50%", opacity: 1 }}
                    exit={{ x: "100%", top: "50%", y: "-50%", opacity: 0 }}
                >
                    <form
                        action={createJobAction}
                        className="grid  gap-[1vh] min-w-96 mx-autogrid relative"
                    >
                        <button
                            type="button"
                            className="btn btn-error btn-sm btn-circle text-white
                            absolute top-0 right-0 translate-x-1/2
                        "
                            onClick={closeModal}
                        >
                            <IoMdClose size={24} />
                        </button>
                        <h2
                            className=" text-center font-semibold text-lg "
                            style={{ fontVariant: "small-caps" }}
                        >
                            Job Form
                        </h2>

                        <label
                            htmlFor="companyName"
                            className=" font-semibold text-sm"
                            style={{ fontVariant: "small-caps" }}
                        >
                            <p>Company Name</p>
                            <input
                                type="text"
                                name="companyName"
                                id="companyName"
                                placeholder="Enter Company Name ..."
                                className="input input-xs input-secondary w-full"
                                value={jobForm["companyName"]}
                                onChange={(e) =>
                                    setJobForm((pre: JobFormType) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                                disabled
                            />
                        </label>
                        <label
                            htmlFor="title"
                            className=" font-semibold text-sm"
                            style={{ fontVariant: "small-caps" }}
                        >
                            <p>Job Title</p>
                            <input
                                type="text"
                                name="title"
                                id="title"
                                placeholder="Enter Job Title ..."
                                className="input input-xs input-secondary w-full"
                                value={jobForm["title"]}
                                onChange={(e) =>
                                    setJobForm((pre: JobFormType) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </label>
                        <label
                            htmlFor="type"
                            className=" font-semibold text-sm"
                            style={{ fontVariant: "small-caps" }}
                        >
                            <p>Job Type</p>
                            <input
                                type="text"
                                name="type"
                                id="type"
                                placeholder="Enter Job Type ..."
                                className="input input-xs input-secondary w-full"
                                value={jobForm["type"]}
                                onChange={(e) =>
                                    setJobForm((pre: JobFormType) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </label>
                        <label
                            htmlFor="location"
                            className=" font-semibold text-sm"
                            style={{ fontVariant: "small-caps" }}
                        >
                            <p>Job Location</p>
                            <input
                                type="text"
                                name="location"
                                id="location"
                                placeholder="Enter Job Location ..."
                                className="input input-xs input-secondary w-full"
                                value={jobForm["location"]}
                                onChange={(e) =>
                                    setJobForm((pre: JobFormType) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </label>
                        <label
                            htmlFor="experience"
                            className=" font-semibold text-sm"
                            style={{ fontVariant: "small-caps" }}
                        >
                            <p>Experience</p>
                            <input
                                type="text"
                                name="experience"
                                id="experience"
                                placeholder="Enter Current Salary ..."
                                className="input input-xs input-secondary w-full"
                                value={jobForm["experience"]}
                                onChange={(e) =>
                                    setJobForm((pre: JobFormType) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </label>
                        <label
                            htmlFor="description"
                            className=" font-semibold text-sm"
                            style={{ fontVariant: "small-caps" }}
                        >
                            <p>Description</p>
                            <input
                                type="text"
                                name="description"
                                id="description"
                                placeholder="Enter Description ..."
                                className="input input-xs input-secondary w-full"
                                value={jobForm["description"]}
                                onChange={(e) =>
                                    setJobForm((pre: JobFormType) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </label>
                        <label
                            htmlFor="skils"
                            className=" font-semibold text-sm"
                            style={{ fontVariant: "small-caps" }}
                        >
                            <p>Skills</p>
                            <input
                                type="text"
                                name="skills"
                                id="skills"
                                placeholder="Enter Skills ..."
                                className="input input-xs input-secondary w-full"
                                value={jobForm["skills"]}
                                onChange={(e) =>
                                    setJobForm((pre: JobFormType) => ({
                                        ...pre,
                                        [e.target.name]: e.target.value,
                                    }))
                                }
                            />
                        </label>

                        <SubmitBtn isFormValid={isFormValid} />
                    </form>
                </motion.dialog>
            )}
        </AnimatePresence>
    );
}

export default JobCreateModal;