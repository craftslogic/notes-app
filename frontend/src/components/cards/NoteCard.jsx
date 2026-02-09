import React from 'react'
import { MdOutlinePushPin, MdCreate, MdDelete } from "react-icons/md"

export default function NoteCard({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote, onViewNotes, formatDate }) {



  return (
    <div className='border border-slate-200 rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out drop-shadow cursor-pointer'
      onClick={onViewNotes}>
      <div className='flex items-center justify-between '>
        <div>
          <h6 className='font-medium text-sm'>{title}</h6>
          <span className='text-sm text-slate-500'>{formatDate(date)}</span>
        </div>
        <MdOutlinePushPin className={`text-xl  cursor-pointer hover:text-blue-600  ${isPinned ? 'text-blue-600' : 'text-slate-400'}`} onClick={(e) => {
          e.stopPropagation();
          onPinNote();
        }} />

      </div>

      {/* Content Section - Character limit + Line breaks fix */}
      <div className='text-xs text-slate-600 mt-2 overflow-hidden'>
        <div
          className='leading-relaxed whitespace-pre-line line-clamp-2'
          style={{
            display: '-webkit-box',
            WebkitLineClamp: '2', // Sirf 2 lines dikharhy
            WebkitBoxOrient: 'vertical',
            maxHeight: '2.8rem', // Is se zyada height nahi badhaani
          }}
          dangerouslySetInnerHTML={{
            __html: content?.length > 80 ? content.slice(0, 80) + "..." : content
          }}
        />
      </div>


      <div className='flex items-center justify-between mt-2 '>
        <div className='text-xs text-slate-500'>{
          tags.map((tag, index) => {
            return (
              <div className='inline mx-1'>{`# ${tag}`}</div>
            )
          })
        }</div>

        <div className="flex items-center gap-2 ">

          <MdCreate className='icon-btn text-slate-400 hover:text-green-600'
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }} />
          <MdDelete className='icon-btn text-slate-400 hover:text-red-500'
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          />
        </div>

      </div>
    </div>
  )
}
