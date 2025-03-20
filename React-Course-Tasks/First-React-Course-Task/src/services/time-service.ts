import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from "date-fns";

export default function getRelativeTime(date: Date, message?: string): string {
    const now = new Date();
    let elapsedTime: string;
    
    do {
        const seconds = differenceInSeconds(now, date);
        if (seconds < 60) {
            elapsedTime = `${seconds}s`;
            break;
        };
    
        const minutes = differenceInMinutes(now, date);
        if (minutes < 60) {
            elapsedTime = `${minutes}m`;
            break;
        };
    
        const hours = differenceInHours(now, date);
        if (hours < 24) {
            elapsedTime = `${hours}h`;
            break;
        };
    
        const days = differenceInDays(now, date);
        elapsedTime = `${days}d`;
    } while (false);

    return `${message ?? ''}${elapsedTime}`;
}
