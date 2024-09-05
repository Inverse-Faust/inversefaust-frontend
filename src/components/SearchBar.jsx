import React from 'react';
import SearchIcon from '../Icons/SearchIcon';

export default function SearchBar({ searchTerm, handleSearch }) {
  return (
    <div className="StateDefaultTopbarFalseMicFalseClearIconFalse h-9 flex-col justify-start items-start gap-2.5 inline-flex w-full max-w-xl">
      <div className="Content self-stretch h-9 p-2 bg-neutral-50/95 rounded-lg justify-start items-center inline-flex">
        <div className="Magnifyingglass w-7 h-7 justify-center items-center flex">
          <SearchIcon />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="오늘은 무슨 활동을 하셨나요?"
          className="PlaceholderLabel grow shrink basis-0 text-zinc-700/60 text-base font-normal font-['SF Pro Text'] leading-snug bg-transparent outline-none"
        />
      </div>
    </div>
  );
}
