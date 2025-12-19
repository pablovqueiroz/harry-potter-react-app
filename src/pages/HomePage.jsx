import React from 'react'
import Search from '../components/Search'
import StudentsList from '../components/studentsList'

function HomePage({students}) {
  return (
    <div className='container'>
      <Search/>
      <StudentsList students={students}/>

    </div>
  )
}

export default HomePage