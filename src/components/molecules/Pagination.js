import React, { useState } from 'react'
import Button from '../atoms/Button'
import Input from '../atoms/Input'

const getValidatedPage = (page, maxPage) => {
  const _page = Math.floor(page)

  if (_page > maxPage) {
    return maxPage
  }

  if (_page < 0) {
    return 0
  }

  return _page
}

export default function Pagination({ maxPage = null }) {
  const [page, setPage] = useState(0)

  return (
    <div>
      <Button
        text="◄ Previous"
        onClickHandler={() => setPage(page > 0 ? page - 1 : 0)}
      />
      <Input
        type="number"
        value={page}
        onChangeHandler={
          value => setPage(getValidatedPage(value ?? 0))
        }
      />
      <Button
        text="Next ►"
        onClickHandler={() => setPage(page < maxPage ? page + 1 : maxPage)}
      />
    </div>
  )
}
