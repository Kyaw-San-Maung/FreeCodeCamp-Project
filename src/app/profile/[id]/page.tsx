import React from 'react'

const ProfilePage = ({params}:any) => {
    return (
      <>
            <h1>ProfilePage id is <span className='bg-yellow-300 p-2'>{ params.id}</span></h1>
            <hr />
            
        </>
  )
}

export default ProfilePage