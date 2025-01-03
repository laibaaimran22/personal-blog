'use client'
import { usePathname } from "next/navigation";
export default function useInvalidPaths() {
    const Pathname = usePathname();

    const invalidPaths = ['studio', 'admin', ];

    const isInvalid = invalidPaths.some((path) => Pathname.includes(path));
    return isInvalid;
}