import * as React from "react"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export function TimePicker({ onSelect }: { onSelect: (time: string) => void }) {
    const [time, setTime] = React.useState<string>()

    React.useEffect(() => {
        if (time) {
            onSelect(time)
            console.log("Selected Time:", time);
        }
    }, [time, onSelect])


    const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value);
    };

    const handleButtonClick = () => {
        const inputField = document.getElementById("time-input");
        console.log("inputField:", inputField);
        if (inputField) {
            inputField.focus();
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !time && "text-muted-foreground"
                    )}
                    onClick={handleButtonClick}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {time ? time : <span>Pick a time</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
            <input
                type="time"
                id="time-input"
                value={time}
                onChange={handleTimeChange}
            />
            </PopoverContent>
        </Popover>
    )
}
