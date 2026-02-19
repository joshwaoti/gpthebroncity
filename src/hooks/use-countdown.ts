import { useState, useEffect } from "react"

export type TimeLeft = {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export function useCountdown(targetDate: string | Date): TimeLeft {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(targetDate) - +new Date()
        let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            }
        }
        return timeLeft
    }

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft())
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    return timeLeft
}
