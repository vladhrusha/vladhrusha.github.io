import React from 'react'
import { Job } from 'models/Job'
import './JobComponent.scss'
import { Link } from 'react-router-dom'
import bookmarkImg from 'images/bookmark.png'
import geoMarkerImg from 'images/geoMarker.png'

interface Props {
  job: Job
}

export const JobComponent = ({ job }: Props) => {
  const currentDateTime = new Date()
  const date = new Date(job.createdAt)
  var diff = Math.abs(currentDateTime.getTime() - date.getTime())
  var days = Math.floor(diff / (3600 * 24) / 1000)

  return (
    <article className="jobComponent">
      <div className="nav__genericData">
        <p className="postTime">
          {days < 365
            ? `Posted ${days} days ago`
            : days < 730
            ? `Posted 1 year ago`
            : `Posted ${Math.floor(days / 365)} years ago`}
        </p>
      </div>
      <div className="job__uniqueData">
        <img className="job__image" src={job.pictures[0]} alt="ph"></img>
        <div className="jobInfo">
          <Link className="job__title" to={'/JobDetailed'} state={{ job }}>
            <p>{job.title}</p>
          </Link>
          <span className="job__department">Department Name * {job.name}</span>
          <p className="job__address">
            <img className="geomarkerImg" src={geoMarkerImg} />
            {job.address}
          </p>
        </div>
      </div>
      <div className="job__genericData">
        <img src={bookmarkImg} className="bookmarkImg"></img>
        <p className="postTime">
          {days < 365
            ? `Posted ${days} days ago`
            : days < 730
            ? `Posted 1 year ago`
            : `Posted ${Math.floor(days / 365)} years ago`}
        </p>
      </div>
    </article>
  )
}
