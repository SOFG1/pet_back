



const formatUserData = (user) => {
    const userData = {...user}
    delete userData.passwordHash
    delete userData.__v
    delete userData._id
    return userData
}

module.exports = {
    formatUserData
}