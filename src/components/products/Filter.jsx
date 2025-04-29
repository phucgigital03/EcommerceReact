import { FormControl } from "@mui/material";
import { useEffect, useState } from "react";
import { FiArrowDown, FiArrowUp, FiRefreshCw, FiSearch } from "react-icons/fi";
import { InputLabel, MenuItem, Select } from "@mui/material";
import {Tooltip, Button} from '@mui/material'
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Filter({ categories }) {
  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    const currentCategory = searchParams.get('category') || 'All';
    const currentSortOrder = searchParams.get('sortby') || 'asc';
    const currentSearchTerm = searchParams.get('keyword') || '';

    setCategory(currentCategory)
    setSortOrder(currentSortOrder)
    setSearchTerm(currentSearchTerm)
  },[searchParams])

  useEffect(()=>{
    const handler = setTimeout(()=>{
      if(searchTerm){
        searchParams.set("keyword",searchTerm);
      }else{
        searchParams.delete("keyword")
      }
      navigate(`${pathname}?${searchParams.toString()}`)
      console.log(searchParams.toString())
    },800)

    return ()=>{
      clearTimeout(handler)
    }
  },[searchParams,searchTerm,navigate,pathname])

  const handleChangeCategory = (e) => {
    const selectedCategory = e.target.value;
    if(selectedCategory === 'All'){
      params.delete('category');
    }else{
      params.set("category",selectedCategory);
    }
    navigate(`${pathname}?${params}`)
    setCategory(e.target.value);
  };
  
  const toggleSortOrder = ()=>{
    setSortOrder((prevOrder)=>{
      const newOrder = prevOrder === "asc" ? "desc" : "asc";
      params.set("sortOrder",newOrder)
      navigate(`${pathname}?${params}`)
      return newOrder
    })
  }

  const handleClearFilters = ()=>{
    navigate({pathname : window.location.pathname})
  }

  return (
    <div className="flex lg:flex-row flex-col-reverse lg:justify-between justify-center items-center gap-4">
      {/* Search Bar */}
      <div className="relative flex items-center 2xl:w-[450px] sm:w-[420px] w-full">
        <input
          value={searchTerm}
          onChange={(e)=>{ setSearchTerm(e.target.value) }}
          className="border border-gray-400 text-slate-600 rounded-md py-2 pl-10 pr-6 w-full focus:outline focus:ring-2"
          type="text"
          placeholder="Search Products"
        />
        <FiSearch className="absolute left-3 text-slate-800 size={30}" />
      </div>

      {/* Category Section */}
      <div className="flex sm:flex-row flex-col gap-4 items-center">
        <FormControl className="w-[120px]">
          <InputLabel id="category-select-label">Categories</InputLabel>
          <Select
            className="h-[40px]"
            labelId="category-select-label"
            id="category-select"
            value={category}
            label={category}
            onChange={handleChangeCategory}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {categories.map((item) => {
              return (
                <MenuItem key={item.categoryId} value={item.categoryName}>
                  {item.categoryName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* Sort Button and Clear Button */}
        <div className="flex items-center">
            <Tooltip title="sort by price: asc" arrow>
                <Button 
                    onClick={toggleSortOrder}
                    variant="contained"
                    className="flex items-center gap-2 h-10"
                >
                    <span>Sort by</span>
                    {sortOrder === "asc" ? (
                      <FiArrowUp size={20}/>
                    ): (
                      <FiArrowDown size={20}/>
                    )}
                </Button>
            </Tooltip>
            <button
                onClick={handleClearFilters} 
                className="
                    flex items-center gap-2
                    text-white bg-red-600 
                    py-2 px-4 ml-4 rounded-md 
                    transition duration-300 ease-in 
                    shadow-md focus:outline-none"
            >
                <FiRefreshCw size={16}/>
                <span>Clear filter</span>
            </button>
        </div>
      </div>
    </div>
  );
}

export default Filter;
