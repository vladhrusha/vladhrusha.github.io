import React from 'react'
import './Pagination.scss'

interface PaginationProps {
  nPages: number
  currentPage: number
  setCurrentPage: (pgNumber: number) => void
}
const Pagination = ({
  nPages,
  currentPage,
  setCurrentPage,
}: PaginationProps) => {
  const pageNumbers = []

  for (let i = 1; i <= nPages; i++) {
    pageNumbers.push(i)
  }

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const nextPage = () => {
    if (currentPage !== nPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <nav>
      <ul className="pageList">
        <li>
          <span onClick={previousPage} className="pageLink">
            Previous
          </span>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <span onClick={() => setCurrentPage(pgNumber)}>{pgNumber}</span>
          </li>
        ))}
        <li>
          <span onClick={nextPage} className="pageLink">
            Next
          </span>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
