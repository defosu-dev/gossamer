import { IIcon } from "@/types/IIcon"
import { cn } from "@/utils/cn"
import { Gem } from "lucide-react"


const LogoIcon = ({className}:IIcon) => {
    return (
        <Gem className={cn(
            "size-6 text-black",
            className
        )} />
    )
}
export default LogoIcon