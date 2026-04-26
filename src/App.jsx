import './App.css';
import React, {useState, useEffect, useMemo} from "react";
import {Edit, MyButton} from "./components/button"
import ProfileCard from './components/profileCard';
import Navbar from './components/ui/navbar';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('name');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
 
  const [theme, setTheme] = useState(false);
  const [score, setScore] = useState(0);
  const [liked, setLiked] = useState(true);

  useEffect(()=>{
      const fetchUsers = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users?sortBy?=firstName&order=asc');
      const data =  await response.json();
      setUsers(data.users);
    } catch(error){
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false)
    }
  };
  fetchUsers()
  },[])

  const filteredUser = useMemo(()=>{
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();
        return(
          user.firstName.toLowerCase().includes(search) ||
          user.address.city.toLowerCase().includes(search)
        );
         });

  },[searchTerm, users, filterType]);
  // const filteredUser = useMemo(()=>{
  //   return users.filter((user) => {
  //     const searchLower = searchTerm.toLowerCase();
  //     if(filterType === 'name') {
  //       const fullName =`${user.firstName} ${user.lastName}`.toLowerCase();
  //       return fullName.includes(searchLower);
  //     } else if (filterType === 'city') {
  //       return user.address.city.toLowerCase().includes(searchLower);
  //     }
  //     return true;
  //   });

  // },[searchTerm, users, filterType])

  //Pagination Feature
  const totalPages = Math.ceil(filteredUser.length / itemsPerPage);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage;
    const lastPageIndex = firstPageIndex + itemsPerPage;
    return filteredUser.slice(firstPageIndex, lastPageIndex)
  }, [currentPage, filteredUser]);


  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1)
  }
  
  
  const toggleTheme = () => {
    setTheme((prevTheme) => !prevTheme)
  }

  const increament = () => {setScore(prev => prev + 1)};
  const decreament = () => {setScore(prev => prev - 1)};
  const reset = () => {setScore(0)};
if (loading) return <div>Loading users...</div>
  return (
    <>
    <Navbar/>
     <h1>Welcome to Local React</h1>
     <MyButton title={"Login"} color={"blue"} text={"white"}/>
      <br/>
      <Edit/>

      <div>
        {theme?<p>on</p>:
        <p>off</p>}
        <MyButton click = {toggleTheme} />
      </div>

      <div style={{textAlign: "center", marginTop: "50px"}}>
        <h1>Score: {score} </h1>
        <MyButton click={decreament} color={"red"} text={"white"} title={"-"}/>
        <MyButton click={reset} color={"black"} text={"white"} title={"reset"}/>
        <MyButton click={increament} color={"green"} text={"white"} title={"+"}/>
      </div>
      <div className='mb-8'>
        <select value={filterType} onChange={(e)=> setFilterType(e.target.value)}>
          <option value='name'>Filter by Name</option>
          <option value='city'>Filter by City</option>
        </select>
        <input
          type='text'
          placeholder={`search by ${filterType}...`}
          value = {searchTerm}
          // onChange={(e) => setSearchTerm(e.target.value)}
          onChange={handleSearch}
          className='w-full md:w-1/3 p-3 rounded-lg border border-slate-300 shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none'
        />
      </div>

      <div>
        {currentTableData.map(user => (
          <ProfileCard key={user.id} user={user} />
        ))}
        {/* {users.map(user => (
          <ProfileCard key={user.id} user={user} />
        ))} */}

        {filteredUser.length === 0 && (
          <div>
            No users found for your search 🙃
          </div>
        ) }
       
      </div>

      {/* {pages} */}
  
      <div>
        <button onClick={() => setCurrentPage(prev => Math.max(prev -1, 1))} disabled={currentPage ===1}>Previous</button>
        <div>

        {[...Array(totalPages)].map((_, index) => (
          <button
          key = {index + 1}
          onClick={()=> setCurrentPage(index + 1)}
          >{index + 1}</button>
        ))}
        </div>
        <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled= {currentPage === totalPages}>Next</button>
      </div>
    </>
  )
}

export default App
