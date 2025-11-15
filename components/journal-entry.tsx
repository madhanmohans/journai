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
import { format } from 'date-fns';

// Mock data for existing files and status options
const existingFiles = ["29-10-2024", "30-10-2024", "31-10-2024", "01-11-2024"]
const statusOptions = ["Empty", "In Progress", "Completed"]
const existingTags = ["astrology", "beauty", "journal", "reflection"]
const currentDate: Date = new Date();
const formattedDate: string = format(currentDate, 'dd-MM-yyyy');

export default function Component() {
  const [date, setDate] = useState(formattedDate)
  const journalTitle = date + " - Journal Entry"
  const [createdTime, setCreatedTime] = useState("2024-11-01T18:37")
  const [tags, setTags] = useState<string[]>(["astrology", "beauty"])
  const [status, setStatus] = useState("Empty")
  const [references, setReferences] = useState<string[]>(["30-10-2024", "31-10-2024"])
  const [markdownContent, setMarkdownContent] = useState("")

  const reset = () => {
      setDate(formattedDate)
      setCreatedTime("")
      setTags([])
      setStatus("Empty")
      setReferences([])
      setMarkdownContent("")
  }
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 p-6 font-mono">
      <h1 className="text-4xl text-red-500 mb-8 text-center">{journalTitle}</h1>
      
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
          <span className="text-zinc-300">Tags</span>
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
                  {existingTags.map((tag) => (
                    <CommandItem
                      key={tag}
                      onSelect={() => {
                        setTags(tags?.includes(tag) ? tags.filter(t => t !== tag) : [...(tags || []), tag])
                      }}
                      className="bg-transparent text-red-500"
                    >
                      {tag}
                      {tags?.includes(tag) && <Check className="ml-auto h-4 w-4" />}
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
          <span className="text-zinc-300">References</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="ml-4 bg-transparent border-zinc-700 text-zinc-100">
                {references?.length > 0 ? `${references.length} selected` : "Select references"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-zinc-800 border-zinc-700">
              <Command>
                <CommandInput placeholder="Search references..." className="h-9 bg-zinc-800 text-zinc-100" />
                <CommandEmpty>No references found.</CommandEmpty>
                <CommandGroup>
                  {existingFiles.map((file) => (
                    <CommandItem
                      key={file}
                      onSelect={() => {
                        setReferences(references?.includes(file) ? references.filter(e => e !== file) : [...(references || []), file])
                      }}
                      className="bg-transparent text-red-500"
                    >
                      {file}
                      {references?.includes(file) && <Check className="ml-auto h-4 w-4 text-zinc-100" />}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <div className="flex gap-2 ml-2">
            {references?.map((reference) => (
              <Badge key={reference} variant="outline" className="bg-transparent text-red-500 hover:bg-zinc-800">
                {reference}
                <X className="w-4 h-4 ml-1 cursor-pointer" onClick={() => setReferences(references.filter(r => r !== reference))} />
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
      <div className="flex flex-row-reverse">
        <Button onClick={reset} variant="ghost" className="text-zinc-300 hover:text-zinc-100 hover:bg-green-600 mt-5">
            Submit
        </Button>
      </div>
    </div>
  )
}