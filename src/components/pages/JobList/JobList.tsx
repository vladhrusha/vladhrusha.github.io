import React, { useState, useEffect, MouseEventHandler } from 'react'
import { Job } from '../../../models/Job'
import { JobComponent } from './JobComponent'
import Pagination from './Pagination'
import './JobList.scss'
// import jobsData from 'models/data.json'

export const JobList = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1)
  const itemsPerPage = 7
  const [isMobile, setIsMobile] = useState<Boolean>(true)

  const API = 'https://api.json-generator.com/templates/ZM1r0eic3XEy/data'
  const token = 'wm3gg940gy0xek1ld98uaizhz83c6rh2sir9f9fu'

  useEffect(() => {
    const fetchData = async () => {
      const requestURL = `${API}?access_token=${token}`
      try {
        const res = await fetch(requestURL)
        const data: Job[] = await res.json()

        if (!res.ok || !data) {
          throw res.status
        }
        setJobs(data)
      } catch (err) {
        switch (err) {
          case 401:
            setErrorMessage('Invalid API Request Credentials')
            break
          case 429:
            setErrorMessage('Server Overloaded')
            break
        }
      }
    }
    fetchData()
    // setJobs(jobsData)
    function handleWindowSizeChange() {
      if (window.innerWidth < 821) {
        setIsMobile(true)
      } else setIsMobile(false)
    }
    if (window.matchMedia('(max-width: 821px)').matches) {
      setIsMobile(true)
    } else setIsMobile(false)
    window.addEventListener('resize', handleWindowSizeChange)
  }, [])

  if (errorMessage != undefined) {
    return <h1>{errorMessage}</h1>
  }

  let displayList = []

  for (
    let i = currentPageNumber * itemsPerPage - 7;
    i < currentPageNumber * itemsPerPage;
    i++
  ) {
    if (jobs[i]) {
      displayList.push(jobs[i])
    }
  }

  return (
    <div className={isMobile === true ? 'jobListPage mobile' : 'jobListPage'}>
      <div className="jobList">
        {displayList.map((job) => (
          <JobComponent key={job.id} job={job}></JobComponent>
        ))}
      </div>
      <div>
        <Pagination
          nPages={Math.ceil(jobs.length / itemsPerPage)}
          currentPage={currentPageNumber}
          setCurrentPage={setCurrentPageNumber}
        ></Pagination>
      </div>
    </div>
  )
}
