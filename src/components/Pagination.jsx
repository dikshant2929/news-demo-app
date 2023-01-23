import { useState } from "react";

export default function Pagination(props) {

    const selectedValue = props.selectedValue;
    const [showPopOver, setPopOverVisibility] = useState(false);

    const onValueSelection = (value) => {
        props.setSelectedValue(value);
        setPopOverVisibility(false);
    }

    const isPreviousButtonDisabled = props.currentPageNumber === 0;

    return (
        <div className="flex justify-between items-center">
            
            <div class="relative inline-block text-right">
                <div>
                    <button onClick={() => setPopOverVisibility(prev => !prev)} type="button" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
                        {selectedValue}
                        <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>

                {showPopOver && <div class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                    <div class="py-1" role="none">
                        <a href="#" onClick={() => onValueSelection(5)} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">5</a>
                        <a href="#" onClick={() => onValueSelection(10)} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">10</a>
                        <a href="#" onClick={() => onValueSelection(25)} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">25</a>
                        <a href="#" onClick={() => onValueSelection(50)} class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-2">50</a>
                    </div>
                </div>}
            </div>
            <div>
                <span onClick={() => !isPreviousButtonDisabled && props.onNextPreviousClicked(props.currentPageNumber - 1)} disabled={isPreviousButtonDisabled} className={`cursor-pointer w-40 bg-white text-orange-700 font-bold ${isPreviousButtonDisabled ? 'opacity-50' : ''}`}>Previous</span> 
                <span className="bg-white text-orange-500 mx-2"> | </span>
                <span className="cursor-pointer w-40 bg-white text-orange-700 font-bold" onClick={() => props.onNextPreviousClicked(props.currentPageNumber + 1)}>Next</span>
            </div>
        </div>

    )
}