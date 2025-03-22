export default function generateRandomPostTime(startRange: number = 1, endRange: number = 10): Date {
    return new Date(Date.now() - 60 * 60 * 1000 * (Math.floor(Math.random() * (endRange - 1)) + startRange));
}
