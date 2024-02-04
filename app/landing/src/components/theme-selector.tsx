'use client'

import { useEffect, useState } from 'react'
import { LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

import { cn } from '~/lib/utils'

import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

const ThemeSelector = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  const renderThemeChanger = () => {
    if (!mounted) return null

    if (theme === 'dark') {
      return <MoonIcon className="size-6 text-primary" role="button" />
    } else if (theme === 'light') {
      return <SunIcon className="size-6 text-primary" role="button" />
    } else {
      const SystemThemeIcon = resolvedTheme === 'dark' ? MoonIcon : SunIcon
      return <SystemThemeIcon className="size-6" role="button" />
    }
  }

  if (!mounted) {
    return (
      <Button
        size="icon"
        variant="ghost"
        className="animate-pulse bg-slate-100 dark:bg-slate-900"
      >
        {renderThemeChanger()}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          {renderThemeChanger()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className={cn(theme === 'system' && 'text-primary')}
          onClick={() => setTheme('system')}
        >
          <LaptopIcon className="size-6 pr-2" />
          System
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'light' && 'text-primary')}
          onClick={() => setTheme('light')}
        >
          <SunIcon className="size-6 pr-2" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          className={cn(theme === 'dark' && 'text-primary')}
          onClick={() => setTheme('dark')}
        >
          <MoonIcon className="size-6 pr-2" />
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemeSelector
