import React from 'react'

async function TakeTime() {
    await new Promise((resolve, reject) => {
        setTimeout(resolve, 3000)
    })
}


const Profile = async() => {
    await TakeTime()
    return (
        <div>
            this is profile page
        </div>
    )
}

export default Profile
