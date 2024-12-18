import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    return (
        <>
            <Button variant="outline" className="rounded-full border-none absolute" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
                <Sun size={'20px'} className=" rotate-0 scale-105 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon size={'20px'} className="absolute  rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-105" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </>
    )
}