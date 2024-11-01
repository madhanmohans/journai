'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Tags, LayoutList, Menu, Plus, X, Check } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Mock data for existing files and status options
const existingFiles = ["2024-10-30", "2024-10-29", "2024-10-31", "2024-11-01"]
const statusOptions = ["Empty", "In Progress", "Completed"]

export default function JournalEntry() {
  const [createdTime, setCreatedTime] = useState("2024-11-01T18:37")
  const [tags, setTags] = useState<string[]>(["astrology", "beauty"])
  const [status, setStatus] = useState("Empty")
  const [entries, setEntries] = useState<string[]>(["2024-10-30", "2024-10-29", "2024-10-31"])
  const [markdownContent, setMarkdownContent] = useState("")

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6 font-mono">
      <h1 className="text-4xl text-red-500 mb-8">2024-11-01 - Journal</h1>
      
      <div className="space-y-6">
        <h2 className="text-2xl mb-6">Properties</h2>
        
        <div className="flex items-center gap-2 text-zinc-300">
          <Clock className="w-5 h-5" />
          <span>Created Time</span>
          <Input
            type="datetime-local"
            value={createdTime}
            onChange={(e) => setCreatedTime(e.target.value)}
            className="ml-4 bg-transparent border-zinc-700 text-zinc-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <Tags className="w-5 h-5 text-zinc-300" />
          <span className="text-zinc-300">tags</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-4 bg-transparent border-zinc-700 text-zinc-100">
                {tags?.length > 0 ? `${tags.length} selected` : "Select tags"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-zinc-800 border-zinc-700">
              <Command>
                <CommandInput placeholder="Search tags..." className="h-9 bg-zinc-800 text-zinc-100" />
                <CommandEmpty>No tags found.</CommandEmpty>
                <CommandGroup>
                  {["astrology", "beauty", "journal", "reflection"].map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() => {
                        setTags(tags.includes(tag) ? tags.filter(t => t !== tag) : [...tags, tag])
                      }}
                      className="text-zinc-100 hover:bg-zinc-700"
                    >
                      {tag}
                      {tags.includes(tag) && <Check className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex gap-2 ml-2">
            {tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-transparent text-red-500 hover:bg-zinc-800">
                {tag}
                <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => setTags(tags.filter(t => t !== tag))} />
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Menu className="w-5 h-5 text-zinc-300" />
          <span className="text-zinc-300">Status</span>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px] ml-4 bg-transparent border-zinc-700 text-zinc-100">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700">
              {statusOptions.map((option) => (
                <SelectItem key={option} value={option} className="text-zinc-100 hover:bg-zinc-700">
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <LayoutList className="w-5 h-5 text-zinc-300" />
          <span className="text-zinc-300">entries</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-4 bg-transparent border-zinc-700 text-zinc-100">
                {entries?.length > 0 ? `${entries.length} selected` : "Select entries"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-zinc-800 border-zinc-700">
              <Command>
                <CommandInput placeholder="Search entries..." className="h-9 bg-zinc-800 text-zinc-100" />
                <CommandEmpty>No entries found.</CommandEmpty>
                <CommandGroup>
                  {existingFiles.map((file) => (
                    <CommandItem
                      key={file}
                      onSelect={() => {
                        setEntries(entries.includes(file) ? entries.filter(e => e !== file) : [...entries, file])
                      }}
                      className="text-zinc-100 hover:bg-zinc-700"
                    >
                      {file}
                      {entries.includes(file) && <Check className="ml-auto h-4 w-4" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex gap-2 ml-2">
            {entries?.map((entry) => (
              <Badge key={entry} variant="outline" className="bg-transparent hover:bg-zinc-800">
                {entry}
                <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => setEntries(entries.filter(e => e !== entry))} />
              </Badge>
            ))}
          </div>
        </div>

        <Button variant="ghost" className="text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 pl-0">
          <Plus className="w-5 h-5 mr-2" />
          Add property
        </Button>
      </div>

      <div className="mt-12">
        <Textarea
          placeholder="Write your journal entry here (Markdown supported)..."
          value={markdownContent}
          onChange={(e) => setMarkdownContent(e.target.value)}
          className="w-full h-64 bg-transparent border-zinc-700 text-zinc-100 resize-none"
        />
      </div>
    </div>
  )
}