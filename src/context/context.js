import React, { useState, useEffect } from 'react'
import mockUser from './mockData.js/mockUser'
import mockRepos from './mockData.js/mockRepos'
import mockFollowers from './mockData.js/mockFollowers'
import axios from 'axios'

const rootUrl = 'https://api.github.com'

const GithubContext = React.createContext()

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({ children }) => {
  const [githubUser, setGithubUser] = useState(mockUser)
  const [repos, setRepos] = useState(mockRepos)
  const [followers, setFollowers] = useState(mockFollowers)

  //requests loading
  const [requests, setRequests] = useState(0)
  const [loading, setIsLoading] = useState(false)

  const [errors, setErrors] = useState({ show: false, msg: '' })

  const searchGithubUser = async (user) => {
    toggleError()
    //setLoading(true)
    const response = await axios(`${rootUrl}/users/${user}`).catch((err) =>
      console.log(err)
    )

    if (response) {
      setGithubUser(response.data)
      //more logic here
    } else {
      toggleError(true, 'there is no user with that username')
    }
  }

  //check rate
  const checkRequests = () => {
    axios(`${rootUrl}/rate_limit`)
      .then(({ data }) => {
        let {
          rate: { remaining },
        } = data
        setRequests(remaining)
        if (remaining === 0) {
          toggleError(
            true,
            'sorry, you have exceeded your houtly rate limits! '
          )
        }
      })
      .catch((err) => console.log(err))
  }

  function toggleError(show = false, msg = '') {
    setErrors({ show, msg })
  }
  //error
  useEffect(checkRequests, [])

  return (
    <GithubContext.Provider
      value={{
        githubUser,
        repos,
        followers,
        requests,
        errors,
        searchGithubUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export { GithubProvider, GithubContext }
