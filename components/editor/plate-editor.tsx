'use client'

import {
  BlockquotePlugin,
  BoldPlugin,
  H1Plugin,
  H2Plugin,
  H3Plugin,
  ItalicPlugin,
  UnderlinePlugin,
} from '@platejs/basic-nodes/react'
import type { Value } from 'platejs'
import { Plate, PlateContent, usePlateEditor } from 'platejs/react'
import React from 'react'

// Initial value for the editor
const initialValue: Value = [
  {
    type: 'p',
    children: [{ text: 'Start typing your content here...' }],
  },
]

interface PlateEditorProps {
  value?: Value
  onChange?: (value: Value) => void
  placeholder?: string
  readOnly?: boolean
  className?: string
}

export function PlateEditor({
  value = initialValue,
  onChange,
  placeholder = 'Start typing...',
  readOnly = false,
  className = '',
}: PlateEditorProps) {
  const editor = usePlateEditor({
    plugins: [
      BoldPlugin,
      ItalicPlugin,
      UnderlinePlugin,
      H1Plugin,
      H2Plugin,
      H3Plugin,
      BlockquotePlugin,
    ],
    value,
  })

  return (
    <div className={`w-full border rounded-lg ${className}`}>
      <Plate
        editor={editor}
        onChange={onChange ? ({ value }) => onChange(value) : undefined}
        readOnly={readOnly}
      >
        <PlateContent className="min-h-[200px] p-4 outline-none" placeholder={placeholder} />
      </Plate>
    </div>
  )
}

// Example usage for different codac contexts
export function CourseContentEditor({
  value,
  onChange,
}: {
  value?: Value
  onChange?: (value: Value) => void
}) {
  return (
    <PlateEditor
      value={value}
      onChange={onChange}
      placeholder="Enter course content... Use **bold**, *italic*, # headings, and > blockquotes"
      className="bg-white"
    />
  )
}

export function AssignmentEditor({
  value,
  onChange,
}: {
  value?: Value
  onChange?: (value: Value) => void
}) {
  return (
    <PlateEditor
      value={value}
      onChange={onChange}
      placeholder="Enter assignment description and requirements..."
      className="bg-white"
    />
  )
}

export function PostEditor({
  value,
  onChange,
}: {
  value?: Value
  onChange?: (value: Value) => void
}) {
  return (
    <PlateEditor
      value={value}
      onChange={onChange}
      placeholder="Share your thoughts with the codac community..."
      className="bg-white"
    />
  )
}

export function CommentEditor({
  value,
  onChange,
}: {
  value?: Value
  onChange?: (value: Value) => void
}) {
  const simpleInitialValue: Value = [
    {
      type: 'p',
      children: [{ text: '' }],
    },
  ]

  const editor = usePlateEditor({
    plugins: [BoldPlugin, ItalicPlugin], // Simplified for comments
    value: value || simpleInitialValue,
  })

  return (
    <div className="w-full border rounded-lg bg-white">
      <Plate editor={editor} onChange={onChange ? ({ value }) => onChange(value) : undefined}>
        <PlateContent
          className="min-h-[80px] p-3 outline-none text-sm"
          placeholder="Write a comment..."
        />
      </Plate>
    </div>
  )
}
