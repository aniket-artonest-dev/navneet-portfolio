"use client";

import { projectList } from "@/lib/projectList";
import { useEffect, useRef, useState } from "react";

const TOAST_MESSAGE = "This link is not available or is not live yet.";

const Work = () => {
    const [filter, setFilter] = useState("All");
    const [toastVisible, setToastVisible] = useState(false);
    const toastTimerRef = useRef(null);
    const techStack = ["All", "Flutter", "FlutterFlow", "FlutterFlame", "Firebase", "Supabase", "GraphQL/Rest APIs", "Getx", "Bloc"];

    useEffect(() => {
        return () => {
            if (toastTimerRef.current) {
                clearTimeout(toastTimerRef.current);
            }
        };
    }, []);

    const showToast = () => {
        setToastVisible(true);
        if (toastTimerRef.current) {
            clearTimeout(toastTimerRef.current);
        }
        toastTimerRef.current = setTimeout(() => {
            setToastVisible(false);
        }, 3000);
    };

    const handleLinkClick = (url, unavailable) => {
        if (unavailable || !url) {
            showToast();
            return;
        }
        window.open(url, "_blank");
    };

    return (
        <div className="mt-[100px]">
            <div className="px-10 py-5 lg:px-20 lg:py-10">
                <div className="lg:ps-40 flex flex-wrap gap-4">
                    {techStack.map((tech) => (
                        <button
                            key={tech}
                            className={`border rounded-full py-1 px-3 transition-all ${filter === tech
                                    ? "bg-white text-black hover:bg-white"
                                    : " hover:bg-white hover:text-black"
                                }`}
                            onClick={() => setFilter(tech)}
                        >
                            {tech}
                        </button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-[50px] gap-4 lg:gap-y-5">
                {projectList.map((project, index) => {
                    const filterArray = project.filter.split(",");
                    if (filter === "All" || filterArray?.includes(filter)) {
                        return (
                            <div key={index} className="px-4 lg:px-0 overflow-hidden">
                                <div
                                    className="custom-aspect-ratio overflow-hidden z-50 relative group"
                                >
                                    <img
                                        src={project.imageUrl}
                                        alt={project.name}
                                        className="object-cover hover:opacity-80 transition-all imageani shadow-[#1e1d1d]"
                                    />
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-0 group-hover:h-full w-full hidden lg:flex justify-center items-center opacity-0 group-hover:opacity-100 bg-[#000]/50 backdrop-blur-lg transition-all">
                                        {project.name}
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {project.iosUrl && (
                                        <button
                                            data-cursor="-hidden"
                                            className="rounded-full py-1 hover:text-black hover:bg-white px-3 border flex items-center gap-x-4"
                                            onClick={() => handleLinkClick(project.iosUrl, project.iosUnavailable)}
                                        >
                                            iOS App
                                        </button>
                                    )}
                                    {project.androidUrl && (
                                        <button
                                            data-cursor="-hidden"
                                            className="rounded-full py-1 hover:text-black hover:bg-white px-3 border flex items-center gap-x-4"
                                            onClick={() => handleLinkClick(project.androidUrl, project.androidUnavailable)}
                                        >
                                            Android App
                                        </button>
                                    )}
                                    {project.webUrl && (
                                        <button
                                            data-cursor="-hidden"
                                            className="rounded-full py-1 hover:text-black hover:bg-white px-3 border flex items-center gap-x-4"
                                            onClick={() => handleLinkClick(project.webUrl, project.webUnavailable)}
                                        >
                                            Web App
                                        </button>
                                    )}
                                    {project.githubUrl && (
                                        <button
                                            data-cursor="-hidden"
                                            className="rounded-full py-1 hover:text-black hover:bg-white px-3 border flex items-center gap-x-4"
                                            onClick={() => handleLinkClick(project.githubUrl, project.githubUnavailable)}
                                        >
                                            GitHub
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>

            {toastVisible && (
                <div className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 px-4">
                    <div className="rounded-full border border-white/20 bg-[#1a1a1a] px-5 py-3 text-sm text-white shadow-lg">
                        {TOAST_MESSAGE}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Work;
