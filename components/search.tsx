'use client'

import { Search as SearchIcon } from 'lucide-react'
import { Input } from './ui/input'

export function Search() {
  return (
    <div className="relative max-w-sm">
      <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search courses, assignments..."
        className="pl-8 pr-4 bg-background"
      />
    </div>
  )
}
