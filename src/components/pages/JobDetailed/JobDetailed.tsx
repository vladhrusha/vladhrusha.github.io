import React, { useEffect, useState } from 'react'
import './JobDetailed.scss'
import { Job } from '../../../models/Job'
import { Link, useLocation } from 'react-router-dom'
import bookmarkImg from 'images/bookmark.png'
import shareImg from 'images/share.png'
import geoMarkerImg from 'images/geoMarker.png'
import mapImg from 'images/map.png'
import bulletImg from 'images/bullet.png'

export const JobDetailed = () => {
  const [isMobile, setIsMobile] = useState<Boolean>(true)
  const location = useLocation()
  const job = location.state?.job
  const currentDateTime = new Date()
  const date = new Date(job.createdAt)
  const diff = Math.abs(currentDateTime.getTime() - date.getTime())
  const days = Math.floor(diff / (3600 * 24) / 1000)

  const description = job.description.substring(
    0,
    job.description.indexOf('Responsopilities:'),
  )
  const responsibilities = job.description.substring(
    job.description.indexOf('Responsopilities:') + 17,
    job.description.indexOf('Compensation & Benefits:'),
  )
  let compensationAndBenefits = job.description.substring(
    job.description.indexOf('Compensation & Benefits:') + 30,
    job.description.length,
  )
  compensationAndBenefits = compensationAndBenefits.split('.')
  compensationAndBenefits.pop()
  const salary = job.salary.split('-')
  salary[0] = salary[0].substring(0, salary[0].indexOf('k')) + '000'
  salary[1] = salary[1].substring(0, salary[1].indexOf('k')) + '000'

  useEffect(() => {
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

  return (
    <div
      className={isMobile === true ? 'jobDetailsPage mobile' : 'jobDetailsPage'}
    >
      <div className="jobDetails">
        <div className="jobDetails__header">
          <h1 className="sectionTitle">Job Details</h1>
          <div className="header__actions">
            <span className="header__action">
              <img className="header__img" src={bookmarkImg} /> Save to my list
            </span>
            <span className="header__action">
              <img className="header__img" src={shareImg} />
              Share
            </span>
          </div>
        </div>
        <button className="applyBtn">APPLY NOW</button>
        <div className="heading">
          <p className="title">{job.title}</p>
          <div className="salary">
            <p className="salary__p">
              € {salary[0]}—{salary[1]}
            </p>
            <p className="salary__p">Brutto, per year</p>
          </div>
        </div>

        <span className="jobDetails__postTime">
          {days < 365
            ? `Posted ${days} days ago`
            : days < 730
            ? `Posted 1 year ago`
            : `Posted ${Math.floor(days / 365)} years ago`}
        </span>

        <article className="description">
          <p className="article__p">{description}</p>
          <h3 className="pTitle">Responsopilities</h3>
          <p className="pTitle">{responsibilities}</p>
          <h3 className="pTitle">Compensation & Benefits:</h3>
          {compensationAndBenefits.shift()}
          {compensationAndBenefits.map(
            (compensationOrBenefit: string, index: number) => (
              <p className="pTitle">
                <img src={bulletImg} />
                {compensationOrBenefit}
              </p>
            ),
          )}
        </article>
        <button className="applyBtn">APPLY NOW</button>

        <div className="additionalInfo">
          <h1 className="sectionTitle">Additional info</h1>
          <h5 className="additionalInfo__title">Employment Type</h5>
          <div className="employmentTypes">
            {job.employment_type.map((type: string) => (
              <div className="employmentType">{type}</div>
            ))}
            {job.employment_type.map((type: string) => (
              <div className="employmentType">{type}</div>
            ))}
            {job.employment_type.map((type: string) => (
              <div className="employmentType">{type}</div>
            ))}
            {job.employment_type.map((type: string) => (
              <div className="employmentType">{type}</div>
            ))}
            {job.employment_type.map((type: string) => (
              <div className="employmentType">{type}</div>
            ))}
            {job.employment_type.map((type: string) => (
              <div className="employmentType">{type}</div>
            ))}
            {job.employment_type.map((type: string) => (
              <div className="employmentType">{type}</div>
            ))}
          </div>

          <h5 className="additionalInfo__title">Benefits</h5>
          <div className="benefits">
            {job.benefits.map((benefit: string) => (
              <div className="benefit">{benefit}</div>
            ))}
            {job.benefits.map((benefit: string) => (
              <div className="benefit">{benefit}</div>
            ))}
            {job.benefits.map((benefit: string) => (
              <div className="benefit">{benefit}</div>
            ))}
          </div>
        </div>
        <h1 className="sectionTitle">Attached images</h1>
        <div className="attachedImages">
          {job.pictures.map((picture: string) => (
            <img className="attachedImg" src={picture} />
          ))}
        </div>
        <div>
          <Link to="/JobList">
            <button className="returnButton">RETURN TO JOB BOARD</button>
          </Link>
        </div>
        <h1 className="sectionTitle cardTitle">Contacts</h1>
      </div>
      <div className={isMobile === true ? 'card mobile' : 'card'}>
        <article className="card__info">
          <span className="card__span">Department name</span>
          <span className="card__span">{job.name}</span>
          <span className="card__span">
            <img src={geoMarkerImg} /> {job.address}
          </span>
          <span className="card__span">{job.phone}</span>
          <span className="card__span">{job.email}</span>
        </article>
        <img className="card__map" src={mapImg}></img>
      </div>
    </div>
  )
}
